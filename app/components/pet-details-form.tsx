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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.type === '') {
      alert('Please select a type (Lost or Found)');
      return;
    }
    onSubmit(details);
  };

  return (
    <div className="background_color" style={{
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '90%',
      maxWidth: '400px',
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{ marginBottom: '10px' }}>Pet Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select 
          name="type" 
          value={details.type} 
          onChange={handleChange} 
          className="second_button"
          required
        >
          <option value="" disabled>Type</option>
          <option value="lost">Lost Pet</option>
          <option value="found">Found Pet</option>
        </select>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input type="text" name="animalKind" placeholder="Animal Kind" onChange={handleChange} required className="second_button" />
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="second_button" />
          <input type="text" name="breed" placeholder="Breed" onChange={handleChange} className="second_button" />
          <input type="text" name="sex" placeholder="Sex" onChange={handleChange} className="second_button" />
          <input type="text" name="color" placeholder="Color" onChange={handleChange} className="second_button" />
          <input type="text" name="chipNumber" placeholder="Chip Number" onChange={handleChange} className="second_button" />
          <input type="text" name="size" placeholder="Size" onChange={handleChange} className="second_button" />
        </div>
        <textarea name="extraDetails" placeholder="Extra Details" onChange={handleChange} className="second_button" style={{ height: '60px' }}></textarea>
        <input type="text" name="contactName" placeholder="Contact Name" onChange={handleChange} required className="second_button" />
        <input type="tel" name="contactPhone" placeholder="Contact Phone" onChange={handleChange} required className="second_button" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button type="submit" className="main_button" style={{ flex: 1, marginRight: '5px', padding: '10px' }}>Submit</button>
          <button type="button" onClick={onCancel} className="second_button" style={{ flex: 1, marginLeft: '5px', padding: '10px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PetDetailsForm;