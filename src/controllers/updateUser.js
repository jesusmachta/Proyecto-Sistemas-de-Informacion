import { collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

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
  const usersCollection = collection(db, "Students");

  if (nameRef !== null) {
    name = nameRef;
  }
  if (lastNameRef !== null) {
    lastName = lastNameRef;
  }
  if (phoneRef !== null) {
    phoneNumber = phoneRef;
  }
  if(userId !== undefined && userId !== null){
    await updateDoc(doc(usersCollection, userId), {
        email, 
        lastName,
        name,
        phoneNumber,
      });
  }


  window.location.reload();
  alert("User updated successfully");
}
