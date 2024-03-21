import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import styles from "./Singupbuttons.module.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../SaveUserDB";

export function GoogleButton() {
  const navigate = useNavigate();
  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;
      const userEmail = userCredential.email;
      const phoneNumber = userCredential.phoneNumber;
      const nameDisplay = userCredential.displayName;
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
      saveUser(user);
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
