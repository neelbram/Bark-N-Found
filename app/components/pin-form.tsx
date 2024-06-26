// // PinForm.tsx

// import React, { useState } from 'react';

// interface PinFormProps {
//   onSave: (details: PinDetails) => void;
//   onCancel: () => void;
//   initialPosition: L.LatLng | null; // Assuming L.LatLng from Leaflet typings
//   pinType: 'lost' | 'found';
// }

// interface PinDetails {
//   animalKind: string;
//   name: string;
//   breed: string;
//   sex: string;
//   color: string;
//   chipNumber: string;
//   size: string;
//   extraDetails: string;
//   contactName: string;
//   contactPhone: string;
// }

// const PinForm: React.FC<PinFormProps> = ({ onSave, onCancel, initialPosition, pinType }) => {
//   const [formState, setFormState] = useState<PinDetails>({
//     animalKind: '',
//     name: '',
//     breed: '',
//     sex: '',
//     color: '',
//     chipNumber: '',
//     size: '',
//     extraDetails: '',
//     contactName: '',
//     contactPhone: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormState(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formState);
//   };

//   return (
//     <div className="pin-form">
//       <h2>{pinType === 'lost' ? 'Lost Pet Details' : 'Found Pet Details'}</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Animal Kind:
//           <input type="text" name="animalKind" value={formState.animalKind} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Name:
//           <input type="text" name="name" value={formState.name} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Breed:
//           <input type="text" name="breed" value={formState.breed} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Sex:
//           <input type="text" name="sex" value={formState.sex} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Color:
//           <input type="text" name="color" value={formState.color} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Chip Number:
//           <input type="text" name="chipNumber" value={formState.chipNumber} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Size:
//           <input type="text" name="size" value={formState.size} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Extra Details:
//           <textarea name="extraDetails" value={formState.extraDetails} onChange={handleInputChange}></textarea>
//         </label>
//         <label>
//           Contact Name:
//           <input type="text" name="contactName" value={formState.contactName} onChange={handleInputChange} required />
//         </label>
//         <label>
//           Contact Phone:
//           <input type="text" name="contactPhone" value={formState.contactPhone} onChange={handleInputChange} required />
//         </label>
//         <div>
//           <button type="submit">Save</button>
//           <button type="button" onClick={onCancel}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PinForm;

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

