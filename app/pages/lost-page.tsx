import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/top-bar';
import BottomPanel from '../components/bottom-panel';
import { db } from '../firebase-config.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

function LostPetsPage() {
    const [lostPetsList, setLostPetsList] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getLostPetsList = async () => {
            try {
                const lostPetsQuery = query(collection(db, 'profiles'), where('type', '==', 'Lost Pet'));
                const data = await getDocs(lostPetsQuery);
                const lostPetsList = data.docs.map(doc => ({
                    id: doc.id, // Include the document ID
                    ...doc.data() // Spread the document data
                }));
                setLostPetsList(lostPetsList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getLostPetsList();
    }, []);

    const formatDate = (timestamp: any) => {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            return date.toLocaleDateString("en-US");
        }
        return "";
    };

    const handleCardClick = (id: string) => {
        navigate(`/profile-lost/${id}`);
    };

    return (
        <div className='screen lost-pets-page'>
            <div className='top'>
                <TopBar />
                <h1 className='home-center lost-title'>Lost</h1>
            </div>
            <div className='home-container background_color'>
                <div className='home-section'>
                    {lostPetsList.length > 0 ? (
                        lostPetsList.map((pet) => (
                            <button key={pet.id} className='home-card' onClick={() => handleCardClick(pet.id)}>
                                <img src={pet.petPictureUrl} alt={pet.name} />
                                <div className='card-content'>
                                    <div className='pet-details'>
                                        <p className='pet-name'>{pet.name}</p>
                                        <p className='pet-date'>{formatDate(pet.date)}</p>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <p>No lost pets found.</p>
                    )}
                </div>
                <BottomPanel currentPage="lost-page" />
            </div>
        </div>
    );
}

export default LostPetsPage;
