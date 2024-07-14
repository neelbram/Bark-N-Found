import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TopBar from '../components/top-bar'; 
import L from 'leaflet';
import BottomPanel from '../components/bottom-panel';
import AddButton from '../components/add-button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config.js';

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
  const [currentPage, setCurrentPage] = useState('map-page');
  const [locations, setLocations] = useState<{ lat: number, lng: number, type: string }[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        if (querySnapshot.empty) {
          console.log('No matching documents.');
        } else {
          const locationsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Document data:', data); // Debug log each document
            if (data.position && data.type) {
              return { lat: data.position.lat, lng: data.position.lng, type: data.type };
            } else {
              console.warn('Missing position or type in document:', doc.id, data);
            }
            return null;
          }).filter(location => location !== null);
          console.log('Fetched locations:', locationsData); // Debug log all locations
          setLocations(locationsData as { lat: number, lng: number, type: string }[]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }, []);
  
  const MapEvents = () => {
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
        <BottomPanel currentPage={currentPage}></BottomPanel>
        <TopBar />
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





// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import TopBar from '../components/top-bar'; 
// import L from 'leaflet';
// import BottomPanel from '../components/bottom-panel';
// import AddButton from '../components/add-button';

// const DefaultIcon = L.icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const LocationMarker = () => {
//   const map = useMapEvents({
//     locationfound(e) {
//       const radius = e.accuracy / 2;
//       const marker = L.marker(e.latlng)
//         .addTo(map)
//         .on('dblclick', () => {
//           alert(marker.getLatLng());
//         })
//         .bindPopup(`You are within ${radius} meters from this point`)
//         .openPopup();
//       L.circle(e.latlng, { radius }).addTo(map);
//     },
//     locationerror(e) {
//       alert(e.message);
//     }
//   });

//   useEffect(() => {
//     map.locate({ setView: true, maxZoom: 16 });
//   }, [map]);

//   return null;
// };

// const MapPage: React.FC = () => {
//   const [map, setMap] = useState<L.Map | null>(null);
//   const [addingMarker, setAddingMarker] = useState(false);
//   const [currentPage, setCurrentPage] = useState('map-page');

//   const MapEvents = () => {
//     const map = useMap();
//     setMap(map);
//     return null;
//   };

//   return (
//     <div className='screen'>
//       <div className='top'>
//         <BottomPanel currentPage={currentPage}></BottomPanel>
//         <TopBar />
//       </div>
//       <div className="container background_color">
//         <MapContainer center={[31.8, 34.7]} zoom={13} style={{ height: '100vh', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
//           />
//           <Marker position={[31.8, 34.7]} />
//           <LocationMarker />
//           <MapEvents />
//         </MapContainer>
//         <AddButton map={map} setAddingMarker={setAddingMarker} />
//       </div>
//     </div>
//   );
// };

// export default MapPage;



