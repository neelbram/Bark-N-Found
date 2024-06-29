export interface Location {
    lost_at: string;
    distance: string;
  }
  
  export interface Collar {
    color: string;
  }
  
  export interface Description {
    breed: string;
    color: string;
    size: string;
    sex: string;
    chip_number: string;
    collar: Collar;
    additional_info: string;
  }
  
  export interface Contact {
    name: string;
    phone_number: string;
  }
  
  export interface Pet {
    key: string;
    name: string;
    type: string;
    status: string;
    location: Location;
    description: Description;
    contact: Contact;
    img?: string;
  }
  
  export interface PetsData {
    pets: Pet[];
  }
  