'use client';

import React, { useEffect, useState, useContext } from 'react';

import TopBar from '../components/top-bar';
import BottomPanel from '../components/bottom-panel';
import { db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LocationContext } from '../data/locationcontext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

interface Pet {
    id: string;
    name: string;
    petPictureUrl: string;
    date: { seconds: number; nanoseconds: number };
    position: { lat: number; lng: number };
    animalKind?: string;
    sex?: string;
    color?: string;
    size?: string;
}

interface Filters {
    animalKind: string;
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

function FoundPetsPage() {
    const { userLocation } = useContext(LocationContext);
    const [lostPetsList, setLostPetsList] = useState<Pet[]>([]);
    const [filters, setFilters] = useState<Filters>({
        animalKind: '',
        sex: '',
        color: '',
        size: ''
    });

    useEffect(() => {
        const getLostPetsList = async () => {
            try {
                const lostPetsQuery = query(collection(db, 'profiles'), where('type', '==', 'Found Pet'));
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
                    (filters.animalKind ? pet.animalKind === filters.animalKind : true) &&
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
    

    return (
        <div className='screen lost-pets-page'>
            <div className="header-container top background_color">
                <TopBar title="Found" filters={filters} setFilters={setFilters} />
            </div>
            <div className='home-container background_color'>
                <div className='home-section'>
                    {lostPetsList.length > 0 ? (
                        lostPetsList.map((pet) => (
                            <Link key={pet.id} href={`./profile-lost/${pet.id}`}>
                                <button key={pet.id} className='home-card'>
                                    <img src={pet.petPictureUrl} alt={pet.name} />
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
                        <p>No found pets available.</p>
                    )}
                </div>
                <BottomPanel currentPage="found-page" />
            </div>
        </div>
    );
}

export default FoundPetsPage;
