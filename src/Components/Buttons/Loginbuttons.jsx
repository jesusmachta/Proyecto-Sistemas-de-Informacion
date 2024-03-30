
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { AiFillApple } from "react-icons/ai";
import {auth, googleProvider} from "../../firebase";
import styles from "./Loginbuttons.module.css"; 
import  { signInWithPopup, GithubAuthProvider, getAuth } from "firebase/auth";


export function GoogleButton(){
    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result); 
        } catch (error) {
            alert(error.message);
            console.error(error);
            
        }
    }
    return(
        <button className={styles["google-button"]} onClick={signinWithGoogle}>
            <FcGoogle /> Inicia sesión con Google
        </button>
    );
}


export function LoginGitHub(){
    const signinWithGithub = async () => {
        // const auth = getAuth();
        const githubProvider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, githubProvider);
            // This gives you a GitHub Access Token.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user); // You can remove this line after confirming it works
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }

    return(
        <button className="github-button" onClick={signinWithGithub}>
            <i className="fab fa-github"></i> Inicia sesión con GitHub
        </button>
    );
}