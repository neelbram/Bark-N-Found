// firestoreService.ts or petService.ts
import { db } from '../firebase-config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Pet } from './types'; // Import PetType from types.ts


const updatePetInDatabase = async (updatedPet: Pet) => {
    if (!updatedPet.id) {
        throw new Error("Pet ID is required to update the pet.");
    }

    const petRef = doc(db, 'profiles', updatedPet.id);
    await setDoc(petRef, updatedPet, { merge: true });
};



const deletePetFromDatabase = async (petId: string) => {
    try {
        const petDocRef = doc(db, 'pets', petId); // Adjust the collection path if needed
        await deleteDoc(petDocRef);
        console.log('Pet profile deleted successfully from Firebase.');
    } catch (error) {
        console.error('Error deleting pet profile from Firebase:', error);
        throw error; // Rethrow the error so it can be caught higher up if needed
    }
};

export { updatePetInDatabase, deletePetFromDatabase };
