import React, { createContext, useState } from 'react';

export const LocationContext = createContext({
  userLocation: null,
  radius: 0,
  setUserLocation: (location) => {},
  setRadius: (radius) => {},
});

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(0);

  return (
    <LocationContext.Provider value={{ userLocation, radius, setUserLocation, setRadius }}>
      {children}
    </LocationContext.Provider>
  );
};
