import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Loginbuttons.module.css";

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
    const signupWithGithub = async () => {
        const githubProvider = new GithubAuthProvider();
        try {
          const result = await signInWithPopup(auth, githubProvider);
    
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log("este es el usuario que te retorna"); 
          console.log(user); 
          const user = result.user;
          const uid = user.uid;
          console.log("nombreee"); 
          console.log(user.displayName); 
          
          console.log(user); 
          Navigate("/"); 
        } catch (error) {
            alert(error); 
          console.error(error);
        }
      }
    
      return(
        <button className={styles["github-button"]} onClick={signupWithGithub}>
          <FaGithub /> Regístrate con GitHub
        </button>
      );
}