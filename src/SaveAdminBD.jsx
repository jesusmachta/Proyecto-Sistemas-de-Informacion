import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function saveUser(user) {
  try {
    const userc = {
      name: user.name,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
    const usuariosRef = collection(db, "Administrator");
    await addDoc(usuariosRef, userc);
    console.log("guardado con exito");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
