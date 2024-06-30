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
    const [currentPage, setCurrentPage] = useState('home-screen');

    useEffect(() => {
        // Simulating fetching data from JSON (replace with actual fetch or data loading)
        setLostPets(petsData.lost);
        setFoundPets(petsData.found);
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
                <h1 className='home-center'>Bark N Found</h1>
                {/* Lost section */}
                <div className='home-section'>
                    <h2 className='lost-title'>Lost</h2>
                    <div className='home-scrollable-container'>
                        <div className='home-scrollable-content'>
                            <div className='home-scrollable-bar'>
                                {/* Yossi's card */}
                                {lostPets.map((pet) => (
                                    <button key={pet.key} className='home-card' onClick={() => navigate('/profile-lost')}>
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
                <BottomPanel currentPage={currentPage}></BottomPanel>
            </div>
            <BottomPanel />
        </div>
    );
};

export default HomeScreen;
