import React, { useState, useEffect } from 'react';
import PetProfile from '../components/PetProfile';
import { Pet, PetsData } from '../data/types';
import axios from "axios";
import BottomPanel from '../components/bottom-panel';


const LostProfile = () => {
    const [data, setData] = useState<PetsData | null>(null);
    // TODO: get id from location click.
    const key = "1";
    const pet: Pet|null = data?.pets.find((obj => obj.key === key)) || null;

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
            <div className='pet-profile'>
            {pet&&<PetProfile pet={pet} />}
            </div>
            <BottomPanel />
        </div>
    );
};
export default LostProfile;
