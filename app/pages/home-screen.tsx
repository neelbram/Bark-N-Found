<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/top-bar'; // Adjust the path as per your project structure
import BottomPanel from '../components/bottom-panel'; // Adjust the path as per your project structure
import petsData from '../data/profile.json';

// Define the structure of the pet data
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

// Define the structure of the entire JSON data
interface PetsData {
    pets: Pet[];
}

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState<Pet[]>([]);
    const [foundPets, setFoundPets] = useState<Pet[]>([]);

    useEffect(() => {
        const data = petsData as PetsData;
        const lost = data.pets.filter((pet: Pet) => pet.status === 'Lost');
        const found = data.pets.filter((pet: Pet) => pet.status === 'Found');

        // Limit to 3 pets per section
        setLostPets(lost.slice(0, 3));
        setFoundPets(found.slice(0, 3));
    }, []);

    const handleCardClick = (petId: string) => {
        navigate(`/pet-details/${petId}`);
    };

=======
import BottomPanel from '../components/bottom-panel';
import React from 'react';
import TopBar from '../components/top-bar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    // Use useEffect for any DOM interactions or side effects
    useEffect(() => {
        // Example event listener or other side effects
    }, []);

>>>>>>> main
    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
<<<<<<< HEAD
            <div className='home-container background_color'>
                <h1 className='home-center'>Bark N Found</h1>

                {/* Lost section */}
                <div className='home-section'>
                    <h2 className='lost-title'>Lost</h2>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {/* Yossi's card */}
                                {lostPets.map((pet) => (
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

                {/* Found section */}
                <div className='home-section'>
                    <h2 className='found-title'>Found</h2>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {/* Found pets */}
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
=======
            <div className='container background_color'>
                <h1 className='center'>Bark N Found</h1>
                <div className='scrollable-container'>
                    <h2 className='center'>Lost</h2>
                    <div className='scrollable-content'>
                        <div className='card'>
                            <img src='./images' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                    </div>
                </div>
                <div className='scrollable-container'>
                    <h2 className='center'>Found</h2>
                    <div className='scrollable-content'>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                    </div>
                </div>
>>>>>>> main
            </div>
        </div>
    );
};

export default HomeScreen;
<<<<<<< HEAD
=======


>>>>>>> main
