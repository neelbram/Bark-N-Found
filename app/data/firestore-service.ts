// firestoreService.ts or petService.ts
import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { Pet } from './types'; // Import PetType from types.ts


const updatePetInDatabase = async (updatedPet: Pet) => {
    if (!updatedPet.id) {
        throw new Error("Pet ID is required to update the pet.");
    }

    const petRef = doc(db, 'profiles', updatedPet.id);
    await setDoc(petRef, updatedPet, { merge: true });
};

export { updatePetInDatabase };
