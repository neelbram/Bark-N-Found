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
        fetch('/profile.json')
            .then(response => response.json())
            .then((data: PetsData) => {
                console.log('Fetched data:', data); // Log fetched data for debugging
                const lost = data.pets.filter((pet: Pet) => pet.status === 'Lost');
                console.log('Filtered lost pets:', lost); // Log filtered lost pets for debugging
                setLostPets(lost.slice(0, 9)); // Limit to 9 pets per section
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log any fetch errors
            });
    }, []);

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

                {/* Lost pets section */}
                <div className='home-section'>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {lostPets.length > 0 ? (
                                    lostPets.map((pet) => (
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

                <BottomPanel />
            </div>
        </div>
    );
};

export default LostPetsPage;
