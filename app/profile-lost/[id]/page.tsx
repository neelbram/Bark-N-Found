'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use Next.js useParams
import PetProfile from '../../components/PetProfile';
import BottomPanel from '../../components/bottom-panel';
import { db } from '../../firebase-config';
import { doc, getDoc, collection } from 'firebase/firestore';
import { Pet as PetType } from '../../data/types'; // Import PetType from types.ts

const LostProfile = () => {
    const params = useParams();
    const id = params.id as string; // Get the pet ID from the URL
    const [pet, setPet] = useState<PetType | null>(null); // Use PetType from types.ts
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const petDoc = await getDoc(doc(collection(db, 'profiles'), id));
                if (petDoc.exists()) {
                    const petData = {
                        id: petDoc.id,
                        ...petDoc.data()
                    } as PetType;
                    setPet(petData);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='pet-profile'>
                {pet ? <PetProfile pet={pet} /> : <div>Pet not found</div>}
            </div>
            <BottomPanel currentPage="profile-lost" />
        </div>
    );
};

export default LostProfile;
