import React, { useState } from 'react';
import L from 'leaflet';
import PetDetailsForm from './pet-details-form';

interface AddButtonProps {
  map: L.Map | null;
  setAddingMarker: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddButton: React.FC<AddButtonProps> = ({ map, setAddingMarker }) => {
  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState<L.LatLng | null>(null);

  // Create custom icons for lost and found pets
  const lostPetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const foundPetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleClick = () => {
    setAddingMarker(true);
    if (map) {
      map.once('click', (e) => {
        setFormPosition(e.latlng);
        setShowForm(true);
        setAddingMarker(false);
      });
    }
  };

  const handleFormSubmit = (details: any) => {
    if (map && formPosition) {
      const icon = details.type === 'lost' ? lostPetIcon : foundPetIcon;
      const newMarker = L.marker(formPosition, { icon }).addTo(map);
      newMarker.bindPopup(`
        <b>${details.type === 'found' ? 'Found' : 'Lost'} ${details.animalKind}</b><br>
        Contact: ${details.contactName} (${details.contactPhone})
      `).openPopup();
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  // ... rest of the component remains the same

  return (
    <>
      <button 
        onClick={handleClick}
        style={{
          position: 'absolute',
          bottom: '90px',
          right: '15px',
          zIndex: 1000,
          padding: '12px',
          backgroundColor: '#4B4665',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '56px',
          height: '56px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
        aria-label="Add Marker"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      {showForm && formPosition && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <PetDetailsForm
            position={formPosition}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}
    </>
  );
};

export default AddButton;