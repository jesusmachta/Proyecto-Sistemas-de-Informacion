import {  updateDoc, doc, arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
import {db} from '../firebase'; 
import Swal from 'sweetalert2'; 
import { useUser } from "../context/user";

export async function addSubscriptionFunction(
    userId,
    agrupacion,
    agrupacionId,
    name,
    lastName
  ) {
    try {
      const userRef = doc(db, 'Students', userId);
      const currentDate = new Date();
      const afiliacion = {
        nombre: agrupacion,
        fechaInicio: currentDate,
        idAgrupacion: agrupacionId,
      };
  
      await updateDoc(userRef, {
        afiliaciones: arrayUnion(afiliacion),
      });

      const groupRef = doc(db, 'Agrupaciones', agrupacionId);

      await updateDoc(groupRef, {
        members: arrayUnion(`${name} ${lastName}`),
      });

      Swal.fire({
        title: `Se envió exitosamemente su formulario a ${agrupacion}!`,
        text: 'Revisa en tu perfil el formulario enviado.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

export async function removeSubscriptionFunction(agrupacion, user, agrupacionId, name, lastName){
    const userRef = doc(db, "Students", user.uid);
    console.log("ESTOY DENTRO DE LA FUNCIÓN"); 
    console.log(agrupacion);
  

    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const afiliaciones = userData.afiliaciones || [];
    const afiliacionToRemove = afiliaciones.find(afiliacion => afiliacion.nombre === agrupacion);
    
    if(afiliacionToRemove){
        await updateDoc(userRef, {
            afiliaciones: arrayRemove(afiliacionToRemove)
        });

        const groupRef = doc(db, 'Agrupaciones', agrupacionId);

        await updateDoc(groupRef, {
            members: arrayRemove(`${name} ${lastName}`),
        });
    }

    Swal.fire({
        title: `Se salió exitosamente de la agrupación:  ${agrupacion}!`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
} 