import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TopBar from '../components/top-bar'; 
import L from 'leaflet';
import BottomPanel from '../components/bottom-panel';
import AddButton from '../components/add-button';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = () => {
  const map = useMapEvents({
    locationfound(e) {
      const radius = e.accuracy / 2;
      const marker = L.marker(e.latlng)
        .addTo(map)
        .on('dblclick', () => {
          alert(marker.getLatLng());
        })
        .bindPopup(`You are within ${radius} meters from this point`)
        .openPopup();
      L.circle(e.latlng, { radius }).addTo(map);
    },
    locationerror(e) {
      alert(e.message);
    }
  });

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  return null;
};

const MapPage: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [addingMarker, setAddingMarker] = useState(false);

  const MapEvents = () => {
    const map = useMap();
    setMap(map);
    return null;
  };

  return (
    <div className='screen'>
      <div className='top'>
        <BottomPanel></BottomPanel>
        <TopBar />
      </div>
      <div className="container background_color">
        <MapContainer center={[31.8, 34.7]} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />
          <Marker position={[31.8, 34.7]} />
          <LocationMarker />
          <MapEvents />
        </MapContainer>
        <AddButton map={map} setAddingMarker={setAddingMarker} />
      </div>
    </div>
  );
};

export default MapPage;



