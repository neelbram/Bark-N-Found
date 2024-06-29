import React from 'react';
import { Pet } from '../data/types';
import './PetProfile.css'; // Make sure to create this CSS file

interface PetProfileProps {
    pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
    return (
        <div className="pet-profile">
            <div className="pet-profile-header">
                <h2>Lost Pet’s Profile</h2>
            </div>
            <div className="pet-profile-image">
                {/* <img src={pet.img} alt={pet.name} /> */}
            </div>
            <div className="pet-profile-details">
                <h3>{pet.name}</h3>
                <p className="pet-type">{pet.type}</p>
                <div className="pet-description">
                    <p><strong>Breed:</strong> {pet.description.breed}</p>
                    <p><strong>Color:</strong> {pet.description.color}</p>
                    <p><strong>Size:</strong> {pet.description.size}</p>
                    <p><strong>Sex:</strong> {pet.description.sex}</p>
                </div>
                <div className="pet-location">
                    <p><strong>Lost At:</strong> {pet.location.lost_at} ({pet.location.distance})</p>
                </div>
                <div className="pet-contact">
                    <p><strong>Contact:</strong> {pet.contact.name}, {pet.contact.phone_number}</p>
                </div>
                <div className="pet-additional-info">
                    <p><strong>Additional Info:</strong> {pet.description.additional_info}</p>
                </div>
            </div>
        </div>
    );
};

export default PetProfile;
