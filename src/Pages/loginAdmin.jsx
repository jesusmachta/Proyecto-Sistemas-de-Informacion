import styles from "./loginAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { InputControlAdmin } from "./InputControlAdmin/InputControlAdmin";
const logo = "./logo-color-sinfondo.png";
import {
  EmailField,
  PasswordField,
} from "./InputControlAdmin/InputControlAdmin";

export function LoginAdmin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const Iniciar = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Datos incompletos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  useEffect(() => {
    const guardarPerfil = async (user) => {
      try {
        const userProfile = {
          displayName: values.name,
        };
        await updateProfile(user, userProfile);
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
        guardarPerfil(user); // Llamada a la función para guardar el perfil del usuario
      }
    });
    return unsubscribe;
  }, [navigate, values.name]);

  return (
    <div className={styles.page}>
      <div>
        <img src={logo} alt="logo" className={styles.logo}></img>
      </div>
      <div className={styles.buttonsLogInSignUp}>
        <button className={styles.button}>Log In</button>
        <button className={`${styles.button} ${styles.buttonSelected}`}>
          Sign Up
        </button>
      </div>
      <b className={styles.error}>{errorMsg}</b>
      <form className={styles.container}>
        <h2 className={styles.titles}>Correo Electrónico</h2>
        <EmailField
          className={styles.inputField}
          label="Email"
          placeholder="Ingresa tu correo..."
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <h2 className={styles.titles}>Contraseña</h2>
        <PasswordField
          className={styles.inputField}
          label="Contraseña"
          placeholder="Ingresa tu contraseña..."
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        <button onClick={Iniciar} disabled={submitButtonDisabled}>
          Iniciar
        </button>
      </form>
    </div>
  );
}
export default LoginAdmin;
