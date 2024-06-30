import React, { useState } from 'react';
import L from 'leaflet';

interface PetDetailsFormProps {
  position: L.LatLng;
  onSubmit: (details: PetDetails) => void;
  onCancel: () => void;
}

interface PetDetails {
  type: 'found' | 'lost' | '';
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
}

const PetDetailsForm: React.FC<PetDetailsFormProps> = ({ position, onSubmit, onCancel }) => {
  const [details, setDetails] = useState<PetDetails>({
    type: '',
    animalKind: '',
    name: '',
    breed: '',
    sex: '',
    color: '',
    chipNumber: '',
    size: '',
    extraDetails: '',
    contactName: '',
    contactPhone: '',
  });
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (type: 'lost' | 'found') => {
    setDetails({ ...details, type });
    setIsTypeOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.type === '') {
      alert('Please select a type (Lost or Found)');
      return;
    }
    onSubmit(details);
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box' as const,
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#E5E5E5',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
  };

  const buttonStyle = {
    ...inputStyle,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    color: '#333',
    fontWeight: 'normal' as const,
    textAlign: 'left' as const,
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5D6354',
    color: 'white',
  };

  return (
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
      <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Pet Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setIsTypeOpen(!isTypeOpen)}
            style={buttonStyle}
          >
            {details.type || 'Type'}
            <span style={{ fontSize: '12px' }}>▼</span>
          </div>
          {isTypeOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 1000,
            }}>
              <div onClick={() => handleTypeSelect('lost')} style={buttonStyle}>Lost Pet</div>
              <div onClick={() => handleTypeSelect('found')} style={buttonStyle}>Found Pet</div>
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input type="text" name="animalKind" placeholder="Animal Kind" onChange={handleChange} required style={inputStyle} />
          <input type="text" name="name" placeholder="Name" onChange={handleChange} style={inputStyle} />
          <input type="text" name="breed" placeholder="Breed" onChange={handleChange} style={inputStyle} />
          <input type="text" name="sex" placeholder="Sex" onChange={handleChange} style={inputStyle} />
          <input type="text" name="color" placeholder="Color" onChange={handleChange} style={inputStyle} />
          <input type="text" name="chipNumber" placeholder="Chip Number" onChange={handleChange} style={inputStyle} />
        </div>
        <input type="text" name="size" placeholder="Size" onChange={handleChange} style={inputStyle} />
        <textarea name="extraDetails" placeholder="Extra Details" onChange={handleChange} style={{...inputStyle, height: '60px', resize: 'vertical'}}></textarea>
        <input type="text" name="contactName" placeholder="Contact Name" onChange={handleChange} required style={inputStyle} />
        <input type="tel" name="contactPhone" placeholder="Contact Phone" onChange={handleChange} required style={inputStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '5px' }}>
          <button type="submit" style={submitButtonStyle} className="submit_button">Submit</button>
          <button type="button" onClick={onCancel} style={buttonStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PetDetailsForm;
