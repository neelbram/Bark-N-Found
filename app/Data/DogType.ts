// DogType.ts

export interface Dog {
    name: string;
    lost_at: {
      location: string;
      distance: string;
    };
    details: {
      breed: string;
      sex: string;
      color: string;
      chip_number: string;
      size: string;
      collar: string;
    };
    description: string;
    contact: {
      name: string;
      methods: {
        chat: boolean;
        call: boolean;
      };
    };
  }
  