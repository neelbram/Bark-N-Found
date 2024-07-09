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
        lost_at?: string; // Update to allow for both lost_at and found_at
        found_at?: string;
    };
    status: string;
}

interface PetsData {
    pets: Pet[];
}

const FoundPetsPage: React.FC = () => {
    const navigate = useNavigate();
    const [foundPets, setFoundPets] = useState<Pet[]>([]);

    useEffect(() => {
        fetch('/profile.json')
            .then(response => response.json())
            .then((data: PetsData) => {
                console.log('Fetched data:', data); // Log fetched data for debugging
                const found = data.pets.filter((pet: Pet) => pet.status === 'Found');
                console.log('Found pets:', found); // Log filtered found pets for debugging
                setFoundPets(found.slice(0, 6)); // Limit to 6 pets per section
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log any fetch errors
            });
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
                <h1 className='home-center'>Found</h1>

                {/* Found pets section */}
                <div className='home-section'>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {foundPets.map((pet) => (
                                    <button key={pet.key} className='home-card' onClick={() => handleCardClick(pet.key)}>
                                        <img src={pet.img} alt={pet.name} />
                                        <div className='card-content'>
                                            <p className='pet-name'>{pet.name}</p>
                                            <p className='pet-date'>{pet.date}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <BottomPanel />
            </div>
        </div>
    );
};

export default FoundPetsPage;
