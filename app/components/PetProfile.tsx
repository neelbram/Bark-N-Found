import React, { useEffect, useState } from 'react';
import { Pet } from '../data/types';
import { db, storage } from '../firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { updatePetInDatabase, deletePetFromDatabase } from '../data/firestore-service'; // Adjust the path as needed


interface PetProfileProps {
    pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
    const firstLetter = pet.contactName?.slice(0, 1) || '';
    const [location, setLocation] = useState<{ city: string; street: string }>({ city: '', street: '' });
    const [editMode, setEditMode] = useState(false);
    const [breed, setBreed] = useState(pet.breed); // Add state for breed
    const [sex, setSex] = useState(pet.sex); // Add state for sex
    const [color, setColor] = useState(pet.color); // Add state for color
    const [chipNumber, setChipNumber] = useState<number>(Number(pet.chipNumber));
    const [size, setSize] = useState(pet.size); // Add state for size
    const [lastUpdate, setLastUpdate] = useState<Date | null>(pet.lastUpdate ? new Date(pet.lastUpdate) : new Date());

    // Function to toggle edit mode
    const toggleEditMode = async () => {
        if (editMode) {  // We're exiting edit mode, so save changes
            try {
                console.log('Saving updated breed to database:', breed);
                await updatePetInDatabase({ ...pet, breed, sex, color, chipNumber, size, lastUpdate });  // Update the breed in the database
            } catch (error) {
                console.error('Error updating pet:', error);
            }
        }
        setEditMode(!editMode);
    };

    const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreed(event.target.value);
    };

    const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSex(event.target.value === 'true'); // Convert string to boolean
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };
    const handleChipNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChipNumber(parseInt(event.target.value, 10));
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(event.target.value);
    };

    const handleLastUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value ? new Date(event.target.value) : null;
        setLastUpdate(dateValue);
    };
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



    const openWhatsApp = (phoneNumber: string) => {
        // Check if the phone number starts with '0' and replace it with '+972'
        const formattedPhoneNumber = phoneNumber.startsWith('0')
            ? '+972' + phoneNumber.substring(1)
            : phoneNumber;
        const url = `https://wa.me/${formattedPhoneNumber}`;
        window.open(url, '_blank');
    };

    const deletePetProfile = async () => {
        if (window.confirm('Are you sure you want to delete this pet profile?')) {
            try {
                console.log(`Attempting to delete pet with ID: ${pet.id}`);
                
                // Ensure pet.id is valid
                if (!pet.id) {
                    console.error('Pet ID is missing or undefined.');
                    alert('Failed to delete the pet profile: Invalid ID.');
                    return;
                }
                
                const petDocRef = doc(db, 'pets', pet.id);
                
                // Attempt to delete the document directly
                await deletePetFromDatabase(pet.id);
                alert('Pet profile deleted successfully.');
    
                // Optionally, redirect the user after deletion or update the UI
            } catch (error) {
                console.error('Error deleting pet profile:', error);
                alert('Failed to delete the pet profile. Please try again.');
            }
        }
    };
    

    return (
        <div className="pet-profile">
            <div className="pet-profile-header">
                <p><span className="text-32 bold">{pet.type}</span> 
                <span className='text-16'>Pet’s Profile</span></p>
            </div>
            <div className="pet-profile-image">
                <img src={pet.petPictureUrl || 'default-image-url'} alt={pet.name} />
            </div>
            <div className="pet-profile-details">
                <div className="pet-profile-info-header">
                    <p>
                        <span className='text-24 pet-name bold'>{pet.name}</span>
                        <span className='text-16 pet-type'>{pet.type}</span>
                    </p>
                    <button id='edit-button' onClick={toggleEditMode}>
                        {editMode ? (
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 20.5L3.5 15L4.91 13.59L9 17.67L20.09 6.59L21.5 8L9 20.5Z" fill="#5D6354"/>
                            </svg>
                        ) : (
                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.6789 1.8715C21.3525 0.545113 19.2019 0.545109 17.8755 1.8715L1.84709 17.9C1.37295 18.3741 1.04975 18.978 0.918253 19.6355L0.253604 22.9588C-0.0632703 24.5431 1.33361 25.9401 2.91799 25.6232L6.24122 24.9585C6.89874 24.827 7.50262 24.5038 7.97677 24.0297L24.0052 8.00118C25.3316 6.67479 25.3316 4.52429 24.0052 3.19789L22.6789 1.8715ZM19.4766 3.4726C19.9188 3.03047 20.6356 3.03047 21.0778 3.4726L22.4041 4.799C22.8463 5.24112 22.8463 5.95795 22.4041 6.40009L19.3795 9.42472L16.4521 6.49723L19.4766 3.4726ZM14.8509 8.09833L3.44818 19.5011C3.29013 19.6591 3.18241 19.8604 3.13857 20.0796L2.47392 23.4028L5.79716 22.7381C6.01633 22.6943 6.21763 22.5866 6.37567 22.4286L17.7784 11.0258L14.8509 8.09833Z" fill="#5D6354"/>
                            </svg>
                        )}
                    </button>
                    <button id='delete-button' onClick={deletePetProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="30px" viewBox="0 0 24 24" fill="none">
                            <path d="M20.5001 6H3.5" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M9.5 11L10 16" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M14.5 11L14 16" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#5D6354" stroke-width="1.5"/>
                        </svg>                    
                    </button>
                </div>
                <p className='pet-location'>
                    <svg height="23px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                    </svg>
                    <span className='pet-location-lost-at-title text-14'>Lost At</span>
                    <span className='pet-location-lost-at-text text-16'>{location.city}, {location.street}</span>
                </p>
                <div className="pet-description">
                    <div className='flex-line'>
                        <div className='flex-item' id='breed-field'>
                            {editMode ? (
                                <input
                                    type="text"
                                    className='flex-item-sub'
                                    value={breed}
                                    onChange={handleBreedChange} // Track user input
                                />
                            ) : (
                                <p className='flex-item-sub'>{breed}</p> // Display the updated breed
                            )}
                            <p className='flex-item-title'>Breed:</p>
                        </div>
                        <div className='flex-item' id="sex-selection">
                            {/* <p className="flex-item-title">Sex:</p> */}
                            {editMode ? (
                                <div>
                                    <p className="flex-item-title">Sex:</p>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="true"
                                            checked={sex === true}
                                            onChange={handleSexChange}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="false"
                                            checked={sex === false}
                                            onChange={handleSexChange}
                                        />
                                        Female
                                    </label>
                                </div>
                            ) : (
                                <div>
                                    <p className="flex-item-title">Sex:</p>
                                    <p className="flex-item-sub">{sex ? 'Male' : 'Female'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex-line'>
                        <div className='flex-item' id='color-field'>
                            {editMode ? (
                                <input
                                    type="text"
                                    className='flex-item-sub'
                                    value={color}
                                    onChange={handleColorChange} // Track user input
                                />
                            ) : (
                                <p className='flex-item-sub'>{color}</p> // Display the updated breed
                            )}
                            <p className='flex-item-title'>Color:</p>
                        </div>
                        <div className='flex-item' id='chip-number-field'>
                            {editMode ? (
                                <input
                                    type="text"
                                    className='flex-item-sub'
                                    value={chipNumber}
                                    onChange={handleChipNumberChange} // Track user input
                                />
                            ) : (
                                <p className='flex-item-sub'>{chipNumber}</p> // Display the updated breed
                            )}
                            <p className='flex-item-title'>Chip Number:</p>
                        </div>
                    </div>
                    <div className='flex-line'>
                        <div className='flex-item' id='size-field'>
                            {editMode ? (
                                <input
                                    type="text"
                                    className='flex-item-sub'
                                    value={size}
                                    onChange={handleSizeChange} // Track user input
                                />
                            ) : (
                                <p className='flex-item-sub'>{size}</p> // Display the updated breed
                            )}
                            <p className='flex-item-title'>Size:</p>
                        </div>
                        <div className='flex-item' id='last-update-field'>
                            {editMode ? (
                                <input
                                    type="date"
                                    className='flex-item-sub'
                                    value={lastUpdate ? lastUpdate.toISOString().substr(0, 10) : ''}
                                    onChange={handleLastUpdate} // Track user input for date
                                />
                            ) : (
                                <p className='flex-item-sub'>{lastUpdate ? lastUpdate.toDateString() : 'Not set'}</p> // Display the updated lastUpdate
                            )}
                            <p className='flex-item-title'>Last Update:</p>
                        </div>
                    </div>
                </div>
                <div className="pet-additional-info">
                    {/* Conditional rendering based on edit mode */}
                    {editMode ? (
                        <input className='text-16' defaultValue={pet.extraDetails}/>
                    ) : (
                        <p className='text-16'>{pet.extraDetails}</p>
                    )}
                </div>
                <div className="pet-contact">
                    <p>
                        <span className='first-letter'>{pet.contactName.charAt(0)}</span>
                        <span className='contact text-24 bold'>{pet.contactName}</span>
                        <span className='contact-info'>
                            <span className='contact-number'>{pet.contactPhone}</span>
                            <button className="whatsapp-button" onClick={() => openWhatsApp(pet.contactPhone)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PetProfile;
