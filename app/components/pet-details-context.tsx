import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PetDetails {
    type: 'Found pet' | 'Lost pet' | '';
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
    position: {
        lat: number;
        lng: number;
    };
}

interface PetDetailsContextType {
    petDetails: PetDetails;
    setPetDetails: React.Dispatch<React.SetStateAction<PetDetails>>;
}

const defaultPetDetails: PetDetails = {
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
    position: {
        lat: 0,  // Default or initial value
        lng: 0,  // Default or initial value
    },
};

const PetDetailsContext = createContext<PetDetailsContextType | undefined>(undefined);

export const usePetDetails = () => {
    const context = useContext(PetDetailsContext);
    if (!context) {
        throw new Error('usePetDetails must be used within a PetDetailsProvider');
    }
    return context;
};

export const PetDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [petDetails, setPetDetails] = useState<PetDetails>(defaultPetDetails);

    return (
        <PetDetailsContext.Provider value={{ petDetails, setPetDetails }}>
            {children}
        </PetDetailsContext.Provider>
    );
};
