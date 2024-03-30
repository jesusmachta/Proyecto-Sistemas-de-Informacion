
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { AiFillApple } from "react-icons/ai";
import {auth, googleProvider} from "../../firebase";
import styles from "./Loginbuttons.module.css"; 
import  { signInWithPopup } from "firebase/auth";


export function GoogleButton(){
    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result); 
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    return(
        <button className={styles["google-button"]} onClick={signinWithGoogle}>
            <FcGoogle /> Inicia sesión con Google
        </button>
    );
}