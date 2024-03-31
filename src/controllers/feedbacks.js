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
  userId,
  agrupacionName,
  rating
) => {
  try {
    const feedbacksCollection = collection(db, 'Feedbacks');
    const docRef = await addDoc(feedbacksCollection, {
      content,
      userId,
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

export const getUserFeedbacks = async (userId) => {
  try {
    if (!userId) {
      console.error('userId is empty');
      return null;
    }
    var feedbacks = [];
    const feedbacksCollection = collection(db, 'Feedbacks');
    const q = query(feedbacksCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      feedbacks.push(doc.data());
    });

    return feedbacks;
  } catch (error) {
    console.log(error);
  }
};
export const geFeedbacksByAgrupacion = async (agrupacionName) => {
  try {
    if (!agrupacionName) {
      console.error('agrupacionName is empty');
      return null;
    }
    var feedbacks = [];
    const feedbacksCollection = collection(db, 'Feedbacks');
    const q = query(
      feedbacksCollection,
      where('agrupacion', '==', agrupacionName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      feedbacks.push(doc.data());
    });

    return feedbacks;
  } catch (error) {
    console.log(error);
  }
};
