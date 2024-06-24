import React, { useEffect, useState } from 'react';

const LostPetProfile: React.FC = () => {
  const [dogData, setDogData] = useState<any>(null); // State to hold dog data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch JSON data (assuming it's in the public folder)
        const response = await fetch('/lost-dogs.json');
        const data = await response.json();
        setDogData(data.dogs[0]); // Assuming there is only one dog in the JSON array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  if (!dogData) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  const { name, lost_at, details, description, contact } = dogData;

  return (
    <div className="lost-pet-profile">
      <header>
        <button className="back-button">&lt;</button>
        <h1>Lost Pet Profile</h1>
      </header>
      
      <h2>{name} <span>Dog</span></h2>
      <p>Lost At: {lost_at.location} ({lost_at.distance})</p>
      
      <div className="pet-details">
        <div>
          <p>Breed: {details.breed}</p>
          <p>Color: {details.color}</p>
          <p>Size: {details.size}</p>
        </div>
        <div>
          <p>Sex: {details.sex}</p>
          <p>Chip Number: {details.chip_number}</p>
          <p>Collar: {details.collar}</p>
        </div>
      </div>
      
      <p className="description">{description}</p>
      
      <footer>
        <p>{contact.name}</p>
        {contact.methods.chat && <button className="message-button">Message</button>}
        {contact.methods.call && <button className="call-button">Call</button>}
      </footer>
    </div>
  );
};

export default LostPetProfile;
