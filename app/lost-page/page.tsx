'use client';

import React, { useEffect, useState, useContext } from 'react';
import TopBar from '../components/top-bar';
import BottomPanel from '../components/bottom-panel';
import { db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LocationContext } from '../data/locationcontext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FilterButton from '../components/filter-button';
import Link from 'next/link';
import Image from 'next/image'; // Ensure to use Next.js's Image component

interface Pet {
    id: string;
    name: string;
    petPictureUrl: string;
    date: { seconds: number; nanoseconds: number };
    position: { lat: number; lng: number };
    kind?: string;
    sex?: string;
    color?: string;
    size?: string;
}

interface Filters {
    kind: string;
    sex: string;
    color: string;
    size: string;
}

function getDistance(location1: { lat: number; lng: number; }, location2: { lat: number; lng: number; }) {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(location2.lat - location1.lat);
    const dLng = toRad(location2.lng - location1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(location1.lat)) * Math.cos(toRad(location2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function formatDate(timestamp: { seconds: number }) {
    if (timestamp && timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("en-US");
    }
    return "";
}

function LostPetsPage() {
    const { userLocation } = useContext(LocationContext);
    const [lostPetsList, setLostPetsList] = useState<Pet[]>([]);
    const [filters, setFilters] = useState<Filters>({
        kind: '',
        sex: '',
        color: '',
        size: ''
    });

    useEffect(() => {
        const getLostPetsList = async () => {
            try {
                const lostPetsQuery = query(collection(db, 'profiles'), where('type', '==', 'Lost Pet'));
                const data = await getDocs(lostPetsQuery);
                let lostPetsList = data.docs.map(doc => {
                    const petData = doc.data();
                    return {
                        id: doc.id,  // Set the id explicitly
                        ...(petData as Omit<Pet, 'id'>)  // Spread the rest of the petData, excluding id
                    };
                });

                if (userLocation) {
                    const radius = 5000; // 5 kilometers in meters
                    lostPetsList = lostPetsList.filter(pet => pet.position && getDistance(userLocation, pet.position) <= radius);
                }

                lostPetsList = lostPetsList.filter(pet => (
                    (filters.kind ? pet.kind === filters.kind : true) &&
                    (filters.sex ? pet.sex === filters.sex : true) &&
                    (filters.color ? pet.color === filters.color : true) &&
                    (filters.size ? pet.size === filters.size : true)
                ));

                lostPetsList.sort((a, b) => (b.date.seconds || 0) - (a.date.seconds || 0));

                setLostPetsList(lostPetsList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getLostPetsList();
    }, [userLocation, filters]);

    // const handleCardClick = (id: string) => {
    //     router.push(`/profile-lost/${id}`); 
    // };

    return (
        <div className='screen lost-pets-page'>
            <TopBar />
            <div className="header-container">
                <h1 className='home-center lost-title'>Lost</h1>
                <FilterButton filters={filters} setFilters={setFilters} />
            </div>
            <div className='home-container background_color'>
                <div className='home-section'>
                    {lostPetsList.length > 0 ? (
                        lostPetsList.map((pet) => (
                            <Link key={pet.id} href={`./profile-lost/${pet.id}`}>
                                <button className='home-card'>
                                    {/* <Image src={pet.petPictureUrl} alt={pet.name} width={100} height={100} /> Adjust size as needed */}
                                    <img src={pet.petPictureUrl} alt={pet.name}/>
                                    <div className='card-content'>
                                        <div className='pet-details'>
                                            <p className='pet-name'>{pet.name}</p>
                                            <p className='pet-date'>{formatDate(pet.date)}</p>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        ))
                    ) : (
                        <p>No lost pets found.</p>
                    )}
                </div>
            </div>
            <BottomPanel currentPage="lost-page" />
        </div>
    );
}

export default LostPetsPage;