import {  updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../firebase'; 

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

} 