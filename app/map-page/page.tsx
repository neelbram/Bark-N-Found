'use client';

import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap , MarkerProps, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TopBar from '../components/top-bar';
import L from 'leaflet';
import BottomPanel from '../components/bottom-panel';
import AddButton from '../components/add-button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { LocationContext } from '../data/locationcontext';
import FilterButton from '../components/filter-button'; // Ensure the import path is correct
import Link from 'next/link';



interface Filters {
    kind: string;
    sex: string;
    color: string;
    size: string;
}
interface ClickableMarkerProps extends MarkerProps {
    href: string;
}

const ClickableMarker: React.FC<{ position: [number, number], href: string, icon: L.Icon }> = ({ position, href, icon }) => {
    const map = useMap();
    const [pixelPosition, setPixelPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (map) {
            // Convert geographical coordinates to pixel coordinates
            const point = map.latLngToContainerPoint(L.latLng(position));
            setPixelPosition([point.x, point.y]);
        }
    }, [map, position]);

    return (
        <>
            <Marker position={position} icon={icon} />
            {pixelPosition && (
                <Link href={href}>
                    <div
                        style={{
                            position: 'absolute',
                            top: `${pixelPosition[1]}px`,
                            left: `${pixelPosition[0]}px`,
                            width: '25px',  // Match marker size
                            height: '41px', // Match marker size
                            cursor: 'pointer',
                            zIndex: 1000,   // Ensure it's clickable over the map
                            backgroundColor: 'transparent', // Ensure it's invisible
                        }}
                    ></div>
                </Link>
            )}
        </>
    );
};
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
    const [locations, setLocations] = useState<{ id: string, lat: number, lng: number, type: string, kind: string, sex: string, color: string, size: string }[]>([]);
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
                            return { 
                                id: doc.id,  // Add the document ID here
                                lat: data.position.lat, 
                                lng: data.position.lng, 
                                type: data.type,
                                kind: data.kind || '',
                                sex: data.sex || '',
                                color: data.color || '',
                                size: data.size || ''
                            };
                        } else {
                            console.warn('Missing position or type in document:', doc.id, data);
                        }
                        return null;
                    }).filter(location => location !== null);
                    setLocations(locationsData as { id: string, lat: number, lng: number, type: string, kind: string, sex: string, color: string, size: string }[]);
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

    // Filter locations based on selected filters
    const filteredLocations = locations.filter(location => {
        return (
            (filters.kind === '' || location.kind === filters.kind) &&
            (filters.sex === '' || location.sex === filters.sex) &&
            (filters.color === '' || location.color === filters.color) &&
            (filters.size === '' || location.size === filters.size)
        );
    });

    useEffect(() => {
        if (map) {
            map.setZoom(10); // Adjust the zoom level as needed
        }
    }, [map]);

    return (
        <div className='screen'>
            <div className='top'>
                <BottomPanel currentPage={currentPage} />
                <div className="header-container">
                    <TopBar />
                    <FilterButton filters={filters} setFilters={setFilters} />
                </div>
            </div>
            <div className="screen background_color">
                <MapContainer center={[31.8, 34.7]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    />
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                            <Marker
                                key={location.id}
                                position={[location.lat, location.lng]}
                                icon={getMarkerIcon(location.type)}
                            >
                                <Popup>
                                    {/* Link to navigate to the profile-lost page */}
                                    <Link href={`/profile-lost/${location.id}`}>
                                        <a>View Profile</a> {/* Ensure the link wraps an anchor tag */}
                                    </Link>
                                </Popup>
                            </Marker>
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
