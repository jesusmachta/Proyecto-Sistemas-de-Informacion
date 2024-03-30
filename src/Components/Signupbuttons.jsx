import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import styles from "./Singupbuttons.module.css";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../SaveUserDB";

import { FaGithub } from "react-icons/fa";


export function GoogleButton() {
  const navigate = useNavigate ();
  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;
      const uid = userCredential.uid;
      const userEmail = userCredential.email;
      const phoneNumber = userCredential.phoneNumber;
      const nameDisplay = userCredential.displayName;

        // se verifica si el correo es de la metro (si no es asi se elimina el usuario)
        if (!userEmail.endsWith("@correo.unimet.edu.ve")) {
          await userCredential.delete();
          alert("Debe utilizar un correo de la UNIMET"); 
          navigate("/signup"); 
          return;
        }



      let name = "";
      let lastname = "";
      if (nameDisplay) {
        const parts = nameDisplay.split(" ");
        if (parts.length > 0) {
          name = parts.shift();
        }
        if (parts.length > 0) {
          lastname = parts.shift();
        }
      }
      const user = {
        name: name,
        lastName: lastname,
        email: userEmail,
        phoneNumber: phoneNumber,
      };
      saveUser(user, uid);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className={styles["google-button"]} onClick={signinWithGoogle}>
      <FcGoogle /> Registrate con Google
    </button>
  );
}

export function FacebookButton() {
  return (
    <button className={styles["facebook-button"]}>
      <FaFacebook color="#3b5998" /> Registrate con Facebook
    </button>
  );
}

export function AppleButton() {
  return (
    <button className={styles["apple-button"]}>
      <AiFillApple /> Registrate con Apple
    </button>
  );
}


export function GithubSignupButton() {
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
      const fullName = user.displayName || '';
      const [nombre = '', apellido = ''] = fullName.split(' ');
      const correo = user.email || '';
      const numeroTelefono = user.phoneNumber || '';
      const usuario ={
        name: nombre,
        lastName: apellido,
        phoneNumber: numeroTelefono,
        email: correo,
      }

      await saveUser( usuario, uid);
      console.log(user); 
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <button className={styles["github-button"]} onClick={signupWithGithub}>
      <FaGithub /> Regístrate con GitHub
    </button>
  );
}