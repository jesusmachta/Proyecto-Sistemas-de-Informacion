import { collection, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function updateUser({
  userId,
  email,
  name,
  phoneNumber,
  lastName,
  nameRef,
  lastNameRef,
  phoneRef,
}) {
  const usersCollection = collection(db, 'Administrator');

  if (nameRef !== null && nameRef !== '') {
    name = nameRef;
  }
  if (lastNameRef !== null && lastNameRef !== '') {
    lastName = lastNameRef;
  }
  if (phoneRef !== null && phoneRef !== '') {
    phoneNumber = phoneRef;
  }
  if (userId !== undefined && userId !== null) {
    await updateDoc(doc(usersCollection, userId), {
      email,
      lastName,
      name,
      phoneNumber,
    });
  }

  window.location.reload();
  alert('User updated successfully');
}

export const getAdminById = async (adminId) => {
  try {
    if (!adminId) {
      console.error('AdminId is empty');
      return null;
    }
    const administratorCollection = collection(db, 'Administrator');
    const administratorDocRef = doc(administratorCollection, adminId);
    const docSnap = await getDoc(administratorDocRef);
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