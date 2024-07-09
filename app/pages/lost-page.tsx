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
                    setLostPets(lost.slice(0, 6)); // Limit to 6 pets per section
                })
                .catch(error => {
                    console.error('Error fetching data:', error); // Log any fetch errors
                });
        }
    }, []); // Ensure the dependency array is empty to fetch data only once

    const handleCardClick = (petId: string) => {
        navigate(`/pet-details/${petId}`);
    };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className='home-container background_color'>
                <h1 className='home-center'>Lost</h1>

                {/* First row of pet cards */}
                <div className='home-section'>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {lostPets.length > 0 ? (
                                    lostPets.slice(0, 3).map((pet) => (
                                        <button key={pet.key} className='home-card' onClick={() => handleCardClick(pet.key)}>
                                            <img src={pet.img} alt={pet.name} />
                                            <div className='card-content'>
                                                <p className='pet-name'>{pet.name}</p>
                                                <p className='pet-date'>{pet.date}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p>No lost pets found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second row of pet cards */}
                <div className='home-section'>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {lostPets.length > 3 ? (
                                    lostPets.slice(3, 6).map((pet) => (
                                        <button key={pet.key} className='home-card' onClick={() => handleCardClick(pet.key)}>
                                            <img src={pet.img} alt={pet.name} />
                                            <div className='card-content'>
                                                <p className='pet-name'>{pet.name}</p>
                                                <p className='pet-date'>{pet.date}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <BottomPanel currentPage="lost-page" />
            </div>
        </div>
    );
};

export default LostPetsPage;
