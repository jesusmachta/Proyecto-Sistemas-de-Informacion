import { collection, updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../firebase'; 


export async function addSubscriptionFunction(userId, agrupacion){
    const userRef = doc(db, "Students", userId);
    
}