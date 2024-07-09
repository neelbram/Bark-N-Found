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
  petPicture: File | null;
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
    petPicture: null,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const animalKindOptions = ['Dog', 'Cat', 'Bunny', 'Other'];
  const sexOptions = ['Male', 'Female', "Don't Know"];
  const colorOptions = ['Black', 'Dark Brown', 'Light Brown', 'White', 'Ginger', 'Mix'];
  const sizeOptions = ['Large', 'Medium', 'Small'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDetails({ ...details, petPicture: e.target.files[0] });
    }
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setDetails({ ...details, [field]: value });
    setOpenDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.type === '') {
      alert('Please select a type (Lost or Found)');
      return;
    }
    if (details.animalKind === '') {
      alert('Please select an animal kind');
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
    textAlign: 'left' as const,
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
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5D6354',
    color: 'white',
  };

  const createDropdown = (field: string, options: string[], placeholder: string) => (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setOpenDropdown(openDropdown === field ? null : field)}
        style={buttonStyle}
      >
        {details[field as keyof PetDetails] || placeholder}
        <span style={{ fontSize: '12px' }}>▼</span>
      </div>
      {openDropdown === field && (
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
          {options.map((option) => (
            <div 
              key={option} 
              onClick={() => handleDropdownSelect(field, option)} 
              style={buttonStyle}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {field === 'animalKind' && (
        <input type="hidden" required value={details.animalKind} />
      )}
    </div>
  );

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
        {createDropdown('type', ['Lost Pet', 'Found Pet'], 'Type *')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {createDropdown('animalKind', animalKindOptions, 'Animal Kind *')}
          <input type="text" name="name" placeholder="Name" onChange={handleChange} style={inputStyle} />
          {createDropdown('sex', sexOptions, 'Sex')}
          {createDropdown('color', colorOptions, 'Color')}
          {createDropdown('size', sizeOptions, 'Size')}
          <input type="text" name="chipNumber" placeholder="Chip Number" onChange={handleChange} style={inputStyle} />
        </div>
        <textarea name="extraDetails" placeholder="Tell Us More!" onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'vertical'}}></textarea>
        <input type="text" name="contactName" placeholder="Contact Name *" onChange={handleChange} required style={inputStyle} />
        <input type="tel" name="contactPhone" placeholder="Contact Phone Number *" onChange={handleChange} required style={inputStyle} />
        <label htmlFor='date' style={{ marginBottom: '5px', fontSize: '0.9em', color: "#4B4665"}}>Last Updated *</label>
        <input type="date" name="date" onChange={handleChange} required style={inputStyle}/>
        <label htmlFor='petPicture' style={{ marginBottom: '5px', fontSize: '0.9em', color: "#4B4665"}}>Pet Picture *</label>
        <input type="file" name="petPicture" id="petPicture" onChange={handleFileChange} required style={inputStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '5px' }}>
          <button type="submit" style={submitButtonStyle} className="submit_button">Submit</button>
          <button type="button" onClick={onCancel} style={buttonStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PetDetailsForm;