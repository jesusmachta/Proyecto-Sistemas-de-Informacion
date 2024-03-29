import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getUserById = async (userId) => {
    try {
        console.log(userId);
      if (!userId) {
        console.error('userId is empty');
        return null;
      }
      const usersCollection = collection(db, 'Students');
      const userDocRef = doc(usersCollection, userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };