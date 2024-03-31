import styles from "./loginAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { InputControlAdmin } from "./InputControlAdmin/InputControlAdmin";
import {GoogleButton} from "../Components/Loginbuttons"; 
import {LoginGitHub} from "../Components/Loginbuttons";
const logo = "./logo-color-sinfondo.png";
import {
  EmailField,
  PasswordField,
} from "./InputControlAdmin/InputControlAdmin";
import Swal from "`sweetalert2`";

export function LoginAdmin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
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
        Swal.fire({
          title: `Inicio de sesión exitoso!`,
          icon: "success",
          confirmButtonText: "OK",
        
        })
        navigate("/");
        guardarPerfil(user);
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
        <button className={`${styles.button} ${styles.buttonSelected}`}>
          Log In
        </button>
        <button className={styles.button} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button2} ${
            selectedButton === "student" ? styles.selected : ""
          }`}
          onClick={() => setSelectedButton("student")}
        ></button>
        <h3 className={styles.textobotones}>Estudiante</h3>
        <button
          className={`${styles.button2} ${
            selectedButton === "admin" ? styles.selected : ""
          }`}
          onClick={() => setSelectedButton("admin")}
        ></button>
        <h3 className={styles.textobotones}>Administrador</h3>
      </div>
      <b className={styles.error}>{errorMsg}</b>
      <form className={styles.container}>
        <h2 className={styles.titles}>Correo Electrónico</h2>
        <EmailField
          id="email"
          className={styles.inputField}
          label="Email"
          placeholder="Ingresa tu correo..."
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <h2 className={styles.titles}>Contraseña</h2>
        <PasswordField
          id="password"
          className={styles.inputField}
          label="Contraseña"
          placeholder="Ingresa tu contraseña..."
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <button
          onClick={Iniciar}
          disabled={submitButtonDisabled}
          className={styles.buttonIniciar}
        >
          Iniciar
        </button>
        <GoogleButton />
        <LoginGitHub />
      </form>
    </div>
  );
}
export default LoginAdmin;
