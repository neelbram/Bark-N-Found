import BottomPanel from '../components/bottom-panel';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/top-bar';
import { useNavigate } from 'react-router-dom';
import petsData from '../data/pets.json'; // Import your JSON data

interface Pet {
    id: number;
    name: string;
    image: string;
    details: string;
}

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState<Pet[]>([]);
    const [foundPets, setFoundPets] = useState<Pet[]>([]);

    useEffect(() => {
        // Simulating fetching data from JSON (replace with actual fetch or data loading)
        setLostPets(petsData.lost);
        setFoundPets(petsData.found);
    }, []);

    const handleCardClick = (petId: number) => {
        navigate(`/pet-details/${petId}`); // Example navigation to pet details page
    };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className='container background_color'>
                <h1 className='center'>Bark N Found</h1>
                <div className='scrollable-container'>
                    <h2 className='lost-title'>Lost</h2>
                    <div className='scrollable-content'>
                        <div className='scrollable-bar'>
                            {lostPets.map((pet) => (
                                <div key={pet.id} className='card' onClick={() => handleCardClick(pet.id)}>
                                    <img src={pet.image} alt={pet.name} />
                                    <p>{pet.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='scrollable-container'>
                    <h2 className='found-title'>Found</h2>
                    <div className='scrollable-content'>
                        <div className='scrollable-bar'>
                            {foundPets.map((pet) => (
                                <div key={pet.id} className='card' onClick={() => handleCardClick(pet.id)}>
                                    <img src={pet.image} alt={pet.name} />
                                    <p>{pet.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <BottomPanel />
        </div>
    );
};

export default HomeScreen;
