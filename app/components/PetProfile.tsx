import React, { useEffect, useState } from 'react';
import { Pet } from '../data/types';
import './PetProfile.css';
import axios from 'axios'; 

interface PetProfileProps {
    pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
    const firstLetter = pet.contactName?.slice(0, 1) || '';
    const [location, setLocation] = useState<{ city: string; street: string }>({ city: '', street: '' });
    
    useEffect(() => {
        const fetchLocation = async () => {
            const { lat, lng } = pet.position; // Assuming pet.position contains lat and lng
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const city = data.address.city || data.address.town || data.address.village || '';
                const street = data.address.road || '';
                setLocation({ city, street });
            } catch (error) {
                console.error('Error fetching geocoding data:', error);
            }
        };

        fetchLocation();
    }, [pet.position]);

    return (
        <div className="pet-profile">
            <div className="pet-profile-header">
                <p><span className="text-32 bold">{pet.type}</span> <span className='text-16'>Pet’s Profile</span></p>
            </div>
            <div className="pet-profile-image">
                <img src={pet.petPictureUrl || 'default-image-url'} alt={pet.name} />
            </div>
            <div className="pet-profile-details">
                <p><span className='text-24 pet-name bold'>{pet.name}</span><span className='text-16 pet-type'>{pet.type}</span></p>
                <p className='pet-location'>
                    <svg height="23px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                    </svg>
                    <span className='pet-location-lost-at-title text-14'>Lost At</span>
                    <span className='pet-location-lost-at-text text-16'>{location.city}, {location.street}</span>
                </p>
                <div className="pet-description">
                    <div className='flex-line'>
                        <div className='flex-item'>
                            <p className='flex-item-sub'>{pet.breed}</p>
                            <p className='flex-item-title'>Breed:</p>
                        </div>
                        <div className='flex-item'>
                            <p className='flex-item-sub'>{pet.sex}</p>
                            <p className='flex-item-title'>Sex:</p>
                        </div>
                    </div>
                    <div className='flex-line'>
                        <div className='flex-item'>
                            <p className='flex-item-sub'>{pet.color}</p>
                            <p className='flex-item-title'>Color:</p>
                        </div>
                        <div className='flex-item'>
                            <p className='flex-item-sub'>{pet.chipNumber}</p>
                            <p className='flex-item-title'>Chip Number:</p>
                        </div>
                    </div>
                    <div className='flex-line'>
                        <div className='flex-item'>
                            <p className='flex-item-sub'>{pet.size}</p>
                            <p className='flex-item-title'>Size:</p>
                        </div>
                        <div className='flex-item'>
                            {/* <p className='flex-item-sub'>{pet.collarcolor}</p> */}
                            <p className='flex-item-title'>Collar:</p>
                        </div>
                    </div>
                </div>
                <div className="pet-additional-info">
                    <p className='text-16'>{pet.extraDetails}</p>
                </div>
                <div className="pet-contact">
                    <p><span className='first-letter'>{firstLetter}</span><span className='contact text-24 bold'>{pet.contactName}</span><span className='contact-number'>{pet.contactPhone}</span></p>
                </div>
            </div>
        </div>
    );
};

export default PetProfile;
