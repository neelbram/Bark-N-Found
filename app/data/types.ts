// types.ts

// export interface Location {
//   lost_at: string;
//   distance: string;
// }

// export interface Collar {
// }

// export interface Description {
//   breed: string;
//   color: string;
//   size: string;
//   sex: string;
//   chip_number: string;
//   collar: Collar;
//   additional_info: string;
// }

export interface position {
  lat: number;
  lng: number;
}

export interface Pet {
  id: string;
  animalKind: string;
  breed: string;
  chipNumber: number;
  color: string;
  contactName: string;
  contactPhone: string;
  lastUpdate: Date|null;
  extraDetails: string;
  name: string;
  petPictureUrl: string;
  position: position;
  sex: string;
  size: string;
  type: string;
}
