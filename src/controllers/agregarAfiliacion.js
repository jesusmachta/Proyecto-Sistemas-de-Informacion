import {  updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../firebase'; 
import Swal from 'sweetalert2'; 


// se le pasa el userId que es el id del documento y el nombre de la agrupación y su id (del documento)
export async function addSubscriptionFunction(userId, agrupacion, agrupacionId){
    const userRef = doc(db, "Students", userId);
    const currentDate = new Date();
    const afiliacion = {
        nombre: agrupacion,
        fechaInicio: currentDate, 
        idAgrupacion: agrupacionId, 
    }

    await updateDoc(userRef, {
        afiliaciones: arrayUnion(afiliacion)
    }); 
    Swal.fire({
        title: `Se envió exitosamemente su formulario a ${agrupacion}!`,
        text: 'Revisa en tu perfil el formulario enviado.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    
}


export async function removeSubscriptionFunction(userId, agrupacion){
    const userRef = doc(db, "Students", userId);

    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const afiliaciones = userData.afiliaciones || [];
    const afiliacionToRemove = afiliaciones.find(afiliacion => afiliacion.nombre === agrupacion);
    
    if(afiliacionToRemove){
        await updateDoc(userRef, {
            afiliaciones: arrayRemove(afiliacionToRemove)
        });
    }

    Swal.fire({
        title: `Se salió exitosamente de la agrupación:  ${agrupacion}!`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
} 