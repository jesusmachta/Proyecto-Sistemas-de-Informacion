import { db } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export const getAllFeedbacks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Feedbacks'));
    var feedbacks = [];
    querySnapshot.forEach((doc) => {
      feedbacks.push(doc.data());
    });
    return feedbacks;
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    if (!feedbackId) {
      console.error('feedbackId is empty');
      return null;
    }
    const feedbacksCollection = collection(db, 'Feedbacks');
    const feedbackDocRef = doc(feedbacksCollection, feedbackId);
    const docSnap = await getDoc(feedbackDocRef);
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

export const createFeedback = async (
  content,
  userEmail,
  agrupacionName,
  rating
) => {
  try {
    const feedbacksCollection = collection(db, 'Feedbacks');
    const docRef = await addDoc(feedbacksCollection, {
      content,
      userEmail,
      agrupacion: agrupacionName,
      rating,
    });
    if (docRef) {
      return docRef;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserFeedbacks = async (email) => {
  try {
    if (!email) {
      console.error('email is empty');
      return null;
    }
    var feedbacks = [];
    const feedbacksCollection = collection(db, 'Feedbacks');
    const q = query(feedbacksCollection, where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      feedbacks.push(doc.data());
    });

    return feedbacks;
  } catch (error) {
    console.log(error);
  }
};
