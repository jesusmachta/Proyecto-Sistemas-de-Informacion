
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getAllAgrupaciones = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Agrupaciones'));
    var agrupaciones = [];
    querySnapshot.forEach((doc) => {
      agrupaciones.push(doc.data());
    });
    return agrupaciones;
  } catch (error) {
    console.log(error);
  }
};

export const getAgrupacionById = async (agrupacionId) => {
    try {
      if (!agrupacionId) {
        console.error('AgrupacionId is empty');
        return null;
      }
      const agrupacionCollection = collection(db, 'Agrupaciones');
      const agrupacionDocRef = doc(agrupacionCollection, agrupacionId);
      const docSnap = await getDoc(agrupacionDocRef);
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