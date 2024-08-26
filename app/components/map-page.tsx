'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import TopBar from './top-bar';
import BottomPanel from './bottom-panel';
import AddButton from './add-button';
import InfoButton from './map-info-button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { LocationContext } from '../data/locationcontext';
import Link from 'next/link';
import L, { LocationEvent, ErrorEvent } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import FilterButton from './filter-button'; // Ensure the import path is correct

// No need to dynamically import hooks
// Dynamically import Map components to disable SSR
const MapContainerDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayerDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const MarkerDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const PopupDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface Filters {
    kind: string;
    sex: string;
    color: string;
    size: string;
}

// Ensure DefaultIcon setup only happens in the browser
if (typeof window !== 'undefined') {
    const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
    });

    L.Marker.prototype.options.icon = DefaultIcon;
}

const LocationMarker: React.FC = () => {
    const { setUserLocation, setRadius } = useContext(LocationContext);

    const map = useMapEvents({
        locationfound(e: LocationEvent) {
            const radius = e.accuracy / 2;
            setUserLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
            setRadius(radius);

            if (typeof window !== 'undefined') {
                L.marker(e.latlng)
                    .addTo(map)  // This now correctly refers to the map object
                    .on('dblclick', () => {
                        alert(e.latlng);
                    })
                    .bindPopup(`You are within ${radius} meters from this point`)
                    .openPopup();
                L.circle(e.latlng, { radius }).addTo(map);
            }
        },
        locationerror(e: ErrorEvent) {
            alert(e.message);
        }
    });

    useEffect(() => {
        // Check if map is initialized and call locate
        if (map && typeof map.locate === 'function') {
            map.locate({ setView: true, maxZoom: 16 });
        }
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
        useEffect(() => {
            setMap(map);
        }, [map]);
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
                return L.icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
                });
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
            <div className='top background_color'>
                <div className="header-container" >
                    <TopBar title=" " filters={filters} setFilters={setFilters} />
                </div>
            </div>
            <div className="screen background_color">
                <MapContainerDynamic center={[31.8, 34.7]} zoom={13} style={{ height: '100vh', width: '100%', marginTop: "10px" }}>
                    <TileLayerDynamic
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    />
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                            <MarkerDynamic
                                key={location.id}
                                position={[location.lat, location.lng]}
                                icon={getMarkerIcon(location.type)}
                            >
                                <PopupDynamic>
                                    {/* Link to navigate to the profile-lost page */}
                                    <Link href={`/profile-lost/${location.id}`}>
                                        View Profile
                                    </Link>
                                </PopupDynamic>
                            </MarkerDynamic>
                        ))
                    ) : (
                        <p>No locations found</p>
                    )}
                    <LocationMarker />
                    <MapEvents />
                </MapContainerDynamic>
                <AddButton map={map} setAddingMarker={setAddingMarker} />
                <InfoButton/>
            </div>
            <BottomPanel currentPage={currentPage} />
        </div>
    );
};

export default MapPage;
