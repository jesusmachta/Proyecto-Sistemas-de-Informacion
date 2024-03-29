import {collection,  doc, setDoc} from "firebase/firestore";
import {db} from "./firebase";



export async function saveuser(user, idAuth){
    const usuariosRef = collection(db, "Students"); 
    try{
        const userc = {
            name: user.name, 
            lastName: user.lastName, 
            phoneNumber: user.phoneNumber, 
            email: user.email, 
        }; 
       const userDocRef = doc(usuariosRef, idAuth);

        await setDoc(userDocRef, userc);
        console.log("guardado con exito"); 
    }catch(e){
        console.error("Error adding document: ", e);
    }
}