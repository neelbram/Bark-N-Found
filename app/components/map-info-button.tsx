import React, { useState } from 'react';
import L from 'leaflet';


const InfoButton: React.FC = () => {
  const [ShowInfo, setShowInfo] = useState(false);

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

  const handleInfoOpen = () => {
        setShowInfo(true);
  };


  const handleInfoClose = () => {
    setShowInfo(false);
  };

  return (
    <>
      <button 
        onClick={handleInfoOpen}
        style={{
          position: 'absolute',
          bottom: '90px',
          left: '15px',
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
        aria-label="Info button"
      >
        <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z" fill='white'/></svg>
      </button>
      {ShowInfo && (
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
            <div className="background_color" style={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              width: 'calc(100% - 40px)',
              maxWidth: '320px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
            }}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <h2 style={{fontSize: '18px' }}>Map Info</h2>
                <button onClick={handleInfoClose} style={{
                  textAlign: "right", marginTop:'0', marginBottom:'20px', fontFamily:'Poppins, sans-serif', color:'#696480'
                }}>X</button>
              </div>
              <p>For adding a new pet, click the + button and then click your desired location on the map</p>
              <div style={{display:'flex'}}>
                <img width='20' height='30' style={{marginTop:'10px', marginBottom:'16px', marginRight:'10px'}} src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'/>
                <p>The green icon is for found pets</p>
              </div>
              <div style={{display:'flex'}}>
                <img width='20' height='30' style={{marginTop:'10px', marginBottom:'16px', marginRight:'10px'}} src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'/>
                <p>The red icon is for lost pets</p>
              </div>
              <p>We wish you good luck in your findings</p>
            </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;
