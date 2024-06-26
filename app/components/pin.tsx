import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PinForm from '@/app/components/pin-form'; // Adjust the path as per your file structure

interface PinProps {
  initialPosition: [number, number];
}

const Pin: React.FC<PinProps> = ({ initialPosition }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<L.LatLng | null>(null);
  const [pinType, setPinType] = useState<string>('');

  const handleSavePin = (details: any) => {
    // Handle saving pin details logic here (example: console.log(details))
    setShowForm(false);
    setCurrentLocation(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentLocation(null);
  };

  useMapEvents({
    click(e) {
      setCurrentLocation(e.latlng);
      setShowForm(true);
    }
  });

  const handlePinTypeSelection = (type: string) => {
    setPinType(type);
    setShowForm(true);
  };

  const lostIcon = L.icon({
    iconUrl: 'path/to/purple-marker-icon.png', // Replace with your lost pin marker icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const foundIcon = L.icon({
    iconUrl: 'public\purple-marker-icon.png.png', // Replace with your found pin marker icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <Marker position={initialPosition} icon={lostIcon}>
        <Popup>Add a Pin</Popup>
      </Marker>
      {showForm && (
        <div className="pin-form-overlay">
          <div className="pin-form-container">
            {/* <PinForm
              onSave={handleSavePin}
              onCancel={handleCancel} */}
              {/* // initialPosition={currentLocation}
              // pinType={pinType as 'lost' | 'found'} */}
            {/* /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Pin;