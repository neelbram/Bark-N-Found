import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/top-bar';
import BottomPanel from '../components/bottom-panel';

interface Pet {
    key: string;
    name: string;
    img: string;
    date: string;
    location: {
        lost_at?: string;
        found_at?: string;
    };
    status: string;
}

interface PetsData {
    pets: Pet[];
}

const LostPetsPage: React.FC = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState<Pet[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetch('/profile.json')
                .then(response => response.json())
                .then((data: PetsData) => {
                    console.log('Fetched data:', data); // Log fetched data for debugging
                    const lost = data.pets.filter((pet: Pet) => pet.status === 'Lost');
                    console.log('Lost pets:', lost); // Log filtered lost pets for debugging

                    // Sort the lost pets by date in descending order
                    const sortedLostPets = lost.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    // Set the sorted lost pets
                    setLostPets(sortedLostPets);
                })
                .catch(error => {
                    console.error('Error fetching data:', error); // Log any fetch errors
                });
        }
    }, []); // Ensure the dependency array is empty to fetch data only once

    const handleCardClick = (petKey: string) => {
        navigate(`/profile-lost/${petKey}`);
    };

    return (
        <div className='screen lost-pets-page'>
            <div className='top'>
                <TopBar />
            </div>
            <div className='home-container background_color'>
                <h1 className='home-center'>Lost</h1>

                <div className='home-section'>
                    {lostPets.length > 0 ? (
                        lostPets.map((pet) => (
                            <button key={pet.key} className='home-card' onClick={() => handleCardClick(pet.key)}>
                                <img src={pet.img} alt={pet.name} />
                                <div className='card-content'>
                                    <div className='pet-details'>
                                        <p className='pet-name'>{pet.name}</p>
                                        <p className='pet-date'>{pet.date}</p>
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
};

export default LostPetsPage;
