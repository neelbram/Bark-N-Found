import React, { useEffect, useState } from 'react';
import { Pet } from '../data/types';
import { db, storage } from '../firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { updatePetInDatabase, deletePetFromDatabase } from '../data/firestore-service'; // Adjust the path as needed
import Link from 'next/link';



interface PetProfileProps {
    pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
    const firstLetter = pet.contactName?.slice(0, 1) || '';
    const [name, setName] = useState<string>(pet.name || '');
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

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
        if (typeof window !== "undefined") {
            // Check if the phone number starts with '0' and replace it with '+972'
            const formattedPhoneNumber = phoneNumber.startsWith('0')
                ? '+972' + phoneNumber.substring(1)
                : phoneNumber;
            const url = `https://wa.me/${formattedPhoneNumber}`;
            window.open(url, '_blank');
        } else {
            console.error("Window is not defined. Cannot open WhatsApp.");
        }
    };
    
    const [showPopup, setShowPopup] = useState(false);

    // Function to handle delete
    const handleDelete = async () => {
        try {
            // const petDoc = doc(db, 'profiles', pet.id); 
            // await deleteDoc(petDoc);
            setShowPopup(true); // Show popup after deleting
            console.log('Pet deleted successfully');
        } catch (error) {
            console.error('Error deleting pet:', error);
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
                    <div className='pet-profile-name-and-type'>
                    {editMode ? (
                        <input
                            type="text"
                            className="text-24 pet-name bold"
                            id = 'pet-name'
                            value={name}
                            onChange={handleNameChange} // Handle name change
                        />
                    ) : (
                        <span className="text-24 pet-name bold">{name}</span> // Display name
                    )}
                        <span className='text-16 pet-type'>{pet.type}</span>
                    </div>
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

                        <button id='delete-button' onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="30px" viewBox="0 0 24 24" fill="none">
                                <path d="M20.5001 6H3.5" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M9.5 11L10 16" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M14.5 11L14 16" stroke="#5D6354" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#5D6354" stroke-width="1.5"/>
                            </svg>                    
                        </button>
                    {showPopup && (
                        <div className="popup">
                            <p>Pet’s profile deleted successfully</p>
                            <p>We hope you found your loved one</p>
                            <Link href="/map-page">
                            <button id='back-to-map'></button>
                                <svg width="143" height="40" viewBox="0 0 143 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 16C0 7.16344 7.16344 0 16 0H127C135.837 0 143 7.16345 143 16V24C143 32.8366 135.837 40 127 40H16C7.16344 40 0 32.8366 0 24V16Z" fill="#5D6354"/>
    <path d="M18.2102 26V14.3636H22.5739C23.4678 14.3636 24.2178 14.5189 24.8239 14.8295C25.4337 15.1402 25.8939 15.5758 26.2045 16.1364C26.5189 16.6932 26.6761 17.3428 26.6761 18.0852C26.6761 18.8314 26.517 19.4792 26.1989 20.0284C25.8845 20.5739 25.4205 20.9962 24.8068 21.2955C24.1932 21.5909 23.4394 21.7386 22.5455 21.7386H19.4375V19.9886H22.2614C22.7841 19.9886 23.2121 19.9167 23.5455 19.7727C23.8788 19.625 24.125 19.411 24.2841 19.1307C24.447 18.8466 24.5284 18.4981 24.5284 18.0852C24.5284 17.6723 24.447 17.3201 24.2841 17.0284C24.1212 16.733 23.8731 16.5095 23.5398 16.358C23.2064 16.2027 22.7765 16.125 22.25 16.125H20.3182V26H18.2102ZM24.2216 20.7273L27.1023 26H24.75L21.9205 20.7273H24.2216ZM32.2642 26.1705C31.3892 26.1705 30.6335 25.9886 29.9972 25.625C29.3646 25.2576 28.8778 24.7386 28.5369 24.0682C28.196 23.3939 28.0256 22.6004 28.0256 21.6875C28.0256 20.7898 28.196 20.0019 28.5369 19.3239C28.8816 18.642 29.3627 18.1117 29.9801 17.733C30.5975 17.3504 31.3229 17.1591 32.1562 17.1591C32.6941 17.1591 33.2017 17.2462 33.679 17.4205C34.16 17.5909 34.5843 17.8561 34.9517 18.2159C35.3229 18.5758 35.6146 19.0341 35.8267 19.5909C36.0388 20.1439 36.1449 20.803 36.1449 21.5682V22.1989H28.9915V20.8125H34.1733C34.1695 20.4186 34.0843 20.0682 33.9176 19.7614C33.7509 19.4508 33.518 19.2064 33.2188 19.0284C32.9233 18.8504 32.5786 18.7614 32.1847 18.7614C31.7642 18.7614 31.3949 18.8636 31.0767 19.0682C30.7585 19.2689 30.5104 19.5341 30.3324 19.8636C30.1581 20.1894 30.0691 20.5473 30.0653 20.9375V22.1477C30.0653 22.6553 30.1581 23.0909 30.3438 23.4545C30.5294 23.8144 30.7888 24.0909 31.1222 24.2841C31.4555 24.4735 31.8456 24.5682 32.2926 24.5682C32.5919 24.5682 32.8627 24.5265 33.1051 24.4432C33.3475 24.3561 33.5578 24.2292 33.7358 24.0625C33.9138 23.8958 34.0483 23.6894 34.1392 23.4432L36.0597 23.6591C35.9384 24.1667 35.7074 24.6098 35.3665 24.9886C35.0294 25.3636 34.5975 25.6553 34.071 25.8636C33.5445 26.0682 32.9422 26.1705 32.2642 26.1705ZM42.2429 17.2727V18.8636H37.2259V17.2727H42.2429ZM38.4645 15.1818H40.5213V23.375C40.5213 23.6515 40.563 23.8636 40.6463 24.0114C40.7334 24.1553 40.8471 24.2538 40.9872 24.3068C41.1274 24.3598 41.2827 24.3864 41.4531 24.3864C41.5819 24.3864 41.6993 24.3769 41.8054 24.358C41.9152 24.339 41.9986 24.322 42.0554 24.3068L42.402 25.9148C42.2921 25.9527 42.1349 25.9943 41.9304 26.0398C41.7296 26.0852 41.4834 26.1117 41.1918 26.1193C40.6766 26.1345 40.2126 26.0568 39.7997 25.8864C39.3868 25.7121 39.0592 25.4432 38.8168 25.0795C38.5781 24.7159 38.4607 24.2614 38.4645 23.7159V15.1818ZM49.5256 22.3295V17.2727H51.5824V26H49.5881V24.4489H49.4972C49.3002 24.9375 48.9763 25.3371 48.5256 25.6477C48.0786 25.9583 47.5275 26.1136 46.8722 26.1136C46.3002 26.1136 45.7945 25.9867 45.3551 25.733C44.9195 25.4754 44.5786 25.1023 44.3324 24.6136C44.0862 24.1212 43.9631 23.5265 43.9631 22.8295V17.2727H46.0199V22.5114C46.0199 23.0644 46.1714 23.5038 46.4744 23.8295C46.7775 24.1553 47.1752 24.3182 47.6676 24.3182C47.9706 24.3182 48.2642 24.2443 48.5483 24.0966C48.8324 23.9489 49.0653 23.7292 49.2472 23.4375C49.4328 23.142 49.5256 22.7727 49.5256 22.3295ZM53.6974 26V17.2727H55.6918V18.7273H55.7827C55.9418 18.2235 56.2145 17.8352 56.6009 17.5625C56.991 17.286 57.4361 17.1477 57.9361 17.1477C58.0497 17.1477 58.1766 17.1534 58.3168 17.1648C58.4607 17.1723 58.58 17.1856 58.6747 17.2045V19.0966C58.5876 19.0663 58.4493 19.0398 58.2599 19.017C58.0743 18.9905 57.8944 18.9773 57.7202 18.9773C57.3452 18.9773 57.008 19.0587 56.7088 19.2216C56.4134 19.3807 56.1804 19.6023 56.0099 19.8864C55.8395 20.1705 55.7543 20.4981 55.7543 20.8693V26H53.6974ZM62.098 20.8864V26H60.0412V17.2727H62.0071V18.7557H62.1094C62.3101 18.267 62.6302 17.8788 63.0696 17.5909C63.5128 17.303 64.0601 17.1591 64.7116 17.1591C65.3139 17.1591 65.8385 17.2879 66.2855 17.5455C66.7363 17.803 67.0848 18.1761 67.331 18.6648C67.581 19.1534 67.7041 19.7462 67.7003 20.4432V26H65.6435V20.7614C65.6435 20.178 65.492 19.7216 65.1889 19.392C64.8897 19.0625 64.4749 18.8977 63.9446 18.8977C63.5848 18.8977 63.2647 18.9773 62.9844 19.1364C62.7079 19.2917 62.4901 19.517 62.331 19.8125C62.1757 20.108 62.098 20.4659 62.098 20.8864ZM78.1179 17.2727V18.8636H73.1009V17.2727H78.1179ZM74.3395 15.1818H76.3963V23.375C76.3963 23.6515 76.438 23.8636 76.5213 24.0114C76.6084 24.1553 76.7221 24.2538 76.8622 24.3068C77.0024 24.3598 77.1577 24.3864 77.3281 24.3864C77.4569 24.3864 77.5743 24.3769 77.6804 24.358C77.7902 24.339 77.8736 24.322 77.9304 24.3068L78.277 25.9148C78.1671 25.9527 78.0099 25.9943 77.8054 26.0398C77.6046 26.0852 77.3584 26.1117 77.0668 26.1193C76.5516 26.1345 76.0876 26.0568 75.6747 25.8864C75.2618 25.7121 74.9342 25.4432 74.6918 25.0795C74.4531 24.7159 74.3357 24.2614 74.3395 23.7159V15.1818ZM83.5511 26.1705C82.6989 26.1705 81.9602 25.983 81.3352 25.608C80.7102 25.233 80.2254 24.7083 79.8807 24.0341C79.5398 23.3598 79.3693 22.572 79.3693 21.6705C79.3693 20.7689 79.5398 19.9792 79.8807 19.3011C80.2254 18.6231 80.7102 18.0966 81.3352 17.7216C81.9602 17.3466 82.6989 17.1591 83.5511 17.1591C84.4034 17.1591 85.142 17.3466 85.767 17.7216C86.392 18.0966 86.875 18.6231 87.2159 19.3011C87.5606 19.9792 87.733 20.7689 87.733 21.6705C87.733 22.572 87.5606 23.3598 87.2159 24.0341C86.875 24.7083 86.392 25.233 85.767 25.608C85.142 25.983 84.4034 26.1705 83.5511 26.1705ZM83.5625 24.5227C84.0246 24.5227 84.411 24.3958 84.7216 24.142C85.0322 23.8845 85.2633 23.5398 85.4148 23.108C85.5701 22.6761 85.6477 22.1951 85.6477 21.6648C85.6477 21.1307 85.5701 20.6477 85.4148 20.2159C85.2633 19.7803 85.0322 19.4337 84.7216 19.1761C84.411 18.9186 84.0246 18.7898 83.5625 18.7898C83.089 18.7898 82.6951 18.9186 82.3807 19.1761C82.0701 19.4337 81.8371 19.7803 81.6818 20.2159C81.5303 20.6477 81.4545 21.1307 81.4545 21.6648C81.4545 22.1951 81.5303 22.6761 81.6818 23.108C81.8371 23.5398 82.0701 23.8845 82.3807 24.142C82.6951 24.3958 83.089 24.5227 83.5625 24.5227ZM93.4474 26V17.2727H95.4134V18.7557H95.5156C95.6974 18.2557 95.9986 17.8655 96.419 17.5852C96.8395 17.3011 97.3414 17.1591 97.9247 17.1591C98.5156 17.1591 99.0137 17.303 99.419 17.5909C99.8281 17.875 100.116 18.2633 100.283 18.7557H100.374C100.567 18.2708 100.893 17.8845 101.351 17.5966C101.813 17.3049 102.36 17.1591 102.993 17.1591C103.796 17.1591 104.451 17.4129 104.959 17.9205C105.466 18.428 105.72 19.1686 105.72 20.142V26H103.658V20.4602C103.658 19.9186 103.514 19.5227 103.226 19.2727C102.938 19.0189 102.586 18.892 102.169 18.892C101.673 18.892 101.285 19.0473 101.004 19.358C100.728 19.6648 100.589 20.0644 100.589 20.5568V26H98.5724V20.375C98.5724 19.9242 98.4361 19.5644 98.1634 19.2955C97.8944 19.0265 97.5421 18.892 97.1065 18.892C96.8111 18.892 96.5421 18.9678 96.2997 19.1193C96.0573 19.267 95.8641 19.4773 95.7202 19.75C95.5762 20.0189 95.5043 20.3333 95.5043 20.6932V26H93.4474ZM110.318 26.1761C109.765 26.1761 109.267 26.0777 108.824 25.8807C108.384 25.6799 108.036 25.3845 107.778 24.9943C107.525 24.6042 107.398 24.1231 107.398 23.5511C107.398 23.0587 107.489 22.6515 107.67 22.3295C107.852 22.0076 108.1 21.75 108.415 21.5568C108.729 21.3636 109.083 21.2178 109.477 21.1193C109.875 21.017 110.286 20.9432 110.71 20.8977C111.222 20.8447 111.636 20.7973 111.955 20.7557C112.273 20.7102 112.504 20.642 112.648 20.5511C112.795 20.4564 112.869 20.3106 112.869 20.1136V20.0795C112.869 19.6515 112.742 19.3201 112.489 19.0852C112.235 18.8504 111.869 18.733 111.392 18.733C110.888 18.733 110.489 18.8428 110.193 19.0625C109.902 19.2822 109.705 19.5417 109.602 19.8409L107.682 19.5682C107.833 19.0379 108.083 18.5947 108.432 18.2386C108.78 17.8788 109.206 17.6098 109.71 17.4318C110.214 17.25 110.771 17.1591 111.381 17.1591C111.801 17.1591 112.22 17.2083 112.636 17.3068C113.053 17.4053 113.434 17.5682 113.778 17.7955C114.123 18.0189 114.4 18.3239 114.608 18.7102C114.82 19.0966 114.926 19.5795 114.926 20.1591V26H112.949V24.8011H112.881C112.756 25.0436 112.58 25.2708 112.352 25.483C112.129 25.6913 111.847 25.8598 111.506 25.9886C111.169 26.1136 110.773 26.1761 110.318 26.1761ZM110.852 24.6648C111.265 24.6648 111.623 24.5833 111.926 24.4205C112.229 24.2538 112.462 24.0341 112.625 23.7614C112.792 23.4886 112.875 23.1913 112.875 22.8693V21.8409C112.811 21.8939 112.701 21.9432 112.545 21.9886C112.394 22.0341 112.223 22.0739 112.034 22.108C111.845 22.142 111.657 22.1723 111.472 22.1989C111.286 22.2254 111.125 22.2481 110.989 22.267C110.682 22.3087 110.407 22.3769 110.165 22.4716C109.922 22.5663 109.731 22.6989 109.591 22.8693C109.451 23.036 109.381 23.2519 109.381 23.517C109.381 23.8958 109.519 24.1818 109.795 24.375C110.072 24.5682 110.424 24.6648 110.852 24.6648ZM116.994 29.2727V17.2727H119.017V18.7159H119.136C119.242 18.5038 119.392 18.2784 119.585 18.0398C119.778 17.7973 120.04 17.5909 120.369 17.4205C120.699 17.2462 121.119 17.1591 121.631 17.1591C122.305 17.1591 122.913 17.3314 123.455 17.6761C124 18.017 124.432 18.5227 124.75 19.1932C125.072 19.8598 125.233 20.678 125.233 21.6477C125.233 22.6061 125.076 23.4205 124.761 24.0909C124.447 24.7614 124.019 25.2727 123.477 25.625C122.936 25.9773 122.322 26.1534 121.636 26.1534C121.136 26.1534 120.722 26.0701 120.392 25.9034C120.063 25.7367 119.797 25.536 119.597 25.3011C119.4 25.0625 119.246 24.8371 119.136 24.625H119.051V29.2727H116.994ZM119.011 21.6364C119.011 22.2008 119.091 22.6951 119.25 23.1193C119.413 23.5436 119.646 23.875 119.949 24.1136C120.256 24.3485 120.627 24.4659 121.062 24.4659C121.517 24.4659 121.898 24.3447 122.205 24.1023C122.511 23.8561 122.742 23.5208 122.898 23.0966C123.057 22.6686 123.136 22.1818 123.136 21.6364C123.136 21.0947 123.059 20.6136 122.903 20.1932C122.748 19.7727 122.517 19.4432 122.21 19.2045C121.903 18.9659 121.521 18.8466 121.062 18.8466C120.623 18.8466 120.25 18.9621 119.943 19.1932C119.636 19.4242 119.403 19.7481 119.244 20.1648C119.089 20.5814 119.011 21.072 119.011 21.6364Z" fill="white"/>
                                </svg>

                            </Link>
                        </div>
                    )}
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
                        {/* <div className='flex-item' id='last-update-field'>
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
                        </div> */}  
                        {/* TODO need to find out where date is save from pet-details form and use it here */}
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
