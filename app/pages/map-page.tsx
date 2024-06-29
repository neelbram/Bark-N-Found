import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import './map-style.css'; // Ensure this file is created and contains necessary styles
import BottomPanel from '../components/bottom-panel';

const PinForm = dynamic(() => import('@/app/components/pin-form'), { ssr: false });

interface Pin {
  lat: number;
  lng: number;
  type: 'lost' | 'found';
  details: {
    animalKind: string;
    name: string;
    breed: string;
    sex: string;
    color: string;
    chipNumber: string;
    size: string;
    extraDetails: string;
    contactName: string;
    contactPhone: string;
  };
}

const MapPage: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [newPin, setNewPin] = useState<{ lat: number; lng: number } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    setNewPin({ lat: e.latlng.lat, lng: e.latlng.lng });
    setShowForm(true);
  };

  const handleAddPin = (pin: Pin) => {
    setPins([...pins, pin]);
    setNewPin(null);
    setShowForm(false);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        handleMapClick(e);
      },
    });

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);

            L.marker([latitude, longitude]).addTo(map)
              .bindPopup('You are here!')
              .openPopup();
          },
          () => {
            console.error('Unable to retrieve your location');
          }
        );
      }
    }, [map]);

    return null;
  };

  return (
    // <div className='screen'>
    <div style={{ position: 'relative' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <BottomPanel></BottomPanel>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />
        {pins.map((pin, index) => (
          <Marker
            key={index}
            position={[pin.lat, pin.lng]}
            icon={L.icon({
              iconUrl: pin.type === 'lost' ? 'purple-marker-icon.png' : 'orange-marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <div>
                <h3>{pin.details.name}</h3>
                <p>{pin.details.animalKind}</p>
                <p>{pin.details.breed}</p>
                <p>{pin.details.sex}</p>
                <p>{pin.details.color}</p>
                <p>{pin.details.chipNumber}</p>
                <p>{pin.details.size}</p>
                <p>{pin.details.extraDetails}</p>
                <p>{pin.details.contactName}</p>
                <p>{pin.details.contactPhone}</p>
              </div>
            </Popup>

          </Marker>
        ))}
        <LocationMarker />
      </MapContainer>
      {showForm && newPin && (
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <PinForm
            lat={newPin.lat}
            lng={newPin.lng}
            onSave={handleAddPin}
            onCancel={() => {
              setShowForm(false);
              setNewPin(null);
            }}
          />
        </div>
      )}
    </div>
    // </div>
  );
};

export default MapPage;