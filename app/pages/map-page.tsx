import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TopBar from '../components/top-bar';
import L from 'leaflet';
import BottomPanel from '../components/bottom-panel';
import AddButton from '../components/add-button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config.js';
import { LocationContext } from '../pages/LocationContext';
import FilterButton from '../components/filter-button'; // Ensure the import path is correct

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker: React.FC = () => {
  const { setUserLocation, setRadius } = useContext(LocationContext);
  const map = useMapEvents({
    locationfound(e) {
      const radius = e.accuracy / 2;
      setUserLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      setRadius(radius);
      L.marker(e.latlng)
        .addTo(map)
        .on('dblclick', () => {
          alert(e.latlng);
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
  const [currentPage, setCurrentPage] = useState('map-page');
  const [locations, setLocations] = useState<{ lat: number, lng: number, type: string }[]>([]);
  const [filters, setFilters] = useState<Filters>({
    kind: '',
    sex: '',
    color: '',
    size: ''
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        if (querySnapshot.empty) {
          console.log('No matching documents.');
        } else {
          const locationsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            if (data.position && data.type) {
              return { lat: data.position.lat, lng: data.position.lng, type: data.type };
            } else {
              console.warn('Missing position or type in document:', doc.id, data);
            }
            return null;
          }).filter(location => location !== null);
          setLocations(locationsData as { lat: number, lng: number, type: string }[]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }, []);

  const MapEvents: React.FC = () => {
    const map = useMap();
    setMap(map);
    return null;
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'Lost Pet':
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      case 'Found Pet':
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      default:
        return DefaultIcon;
    }
  };

  return (
    <div className='screen'>
      <div className='top'>
        <BottomPanel currentPage={currentPage} />
        <div className="header-container">
          <TopBar />
          <FilterButton filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className="container background_color">
        <MapContainer center={[31.8, 34.7]} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />
          {locations.length > 0 ? (
            locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={getMarkerIcon(location.type)}
              />
            ))
          ) : (
            <p>No locations found</p>
          )}
          <LocationMarker />
          <MapEvents />
        </MapContainer>
        <AddButton map={map} setAddingMarker={setAddingMarker} />
      </div>
    </div>
  );
};

export default MapPage;
