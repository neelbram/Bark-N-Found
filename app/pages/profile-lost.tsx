import React, { useState, useEffect } from 'react';
import PetProfile from '../components/PetProfile';
import { Pet, PetsData } from '../data/types';
import axios from "axios";


const LostProfile = () => {
    const [data, setData] = useState<PetsData | null>(null);

    useEffect(() => {
        fetch('/profile.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Pets</h1>
            {data.pets.map((pet: Pet) => (
                <PetProfile key={pet.key} pet={pet} />
            ))}
        </div>
    );
};
export default LostProfile;
