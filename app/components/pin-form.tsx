import React, { useState } from 'react';

interface PinFormProps {
  lat: number;
  lng: number;
  onSave: (pin: any) => void;
  onCancel: () => void;
}

const PinForm: React.FC<PinFormProps> = ({ lat, lng, onSave, onCancel }) => {
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [animalKind, setAnimalKind] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [color, setColor] = useState('');
  const [chipNumber, setChipNumber] = useState('');
  const [size, setSize] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = {
      lat,
      lng,
      type,
      details: {
        animalKind, name, breed, sex, color, chipNumber, size, extraDetails, contactName, contactPhone
      },
    };
    onSave(pin);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as 'lost' | 'found')}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </label>
      <label>
        Animal Kind:
        <input type="text" value={animalKind} onChange={(e) => setAnimalKind(e.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Sex:
        <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} />
      </label>
      <label>
        Color:
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <label>
        Chip Number:
        <input type="text" value={chipNumber} onChange={(e) => setChipNumber(e.target.value)} />
      </label>
      <label>
        Size:
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <label>
        Extra Details:
        <input type="text" value={extraDetails} onChange={(e) => setExtraDetails(e.target.value)} />
      </label>
      <label>
        Contact Name:
        <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
      </label>
      <label>
        Contact Phone:
        <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
      </label>
      <button type="submit">Save Pin</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default PinForm;

