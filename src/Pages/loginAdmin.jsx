import styles from "./loginAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { InputControlAdmin } from "./InputControlAdmin/InputControlAdmin";
import { GoogleButton } from "../Components/Loginbuttons";
import { LoginGitHub } from "../Components/Loginbuttons";
const logo = "./logo-color-sinfondo.png";
import {
  EmailField,
  PasswordField,
} from "./InputControlAdmin/InputControlAdmin";
import Swal from "sweetalert2";

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
        });
        navigate("/");
        guardarPerfil(user);
      }
    });
    return unsubscribe;
  }, [navigate, values.name]);

  return (
    <div className={styles.la_page}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" className={styles.la_logo}></img>
        <div className={styles.la_buttonsLogInSignUp}>
          <button className={`${styles.la_button} ${styles.la_buttonSelected}`}>
            Log In
          </button>
          <button
            className={styles.la_button}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
        <div
          className={styles.la_buttonsContainer}
          style={{ justifyContent: "center" }}
        >
          <button
            className={`${styles.la_button2} ${
              selectedButton === "student" ? styles.la_selected : ""
            }`}
            onClick={() => setSelectedButton("student")}
          ></button>
          <h3 className={styles.la_textobotones}>Estudiante</h3>
          <button
            className={`${styles.la_button2} ${
              selectedButton === "admin" ? styles.la_selected : ""
            }`}
            onClick={() => setSelectedButton("admin")}
          ></button>
          <h3 className={styles.la_textobotones}>Administrador</h3>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <form className={styles.la_container}>
            <h2 className={styles.la_titles}>Correo Electrónico</h2>
            <EmailField
              id="email"
              className={styles.la_inputField}
              label="Email"
              placeholder="Ingresa tu correo..."
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <h2 className={styles.la_titles}>Contraseña</h2>
            <PasswordField
              id="password"
              className={styles.la_inputField}
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
              className={styles.la_buttonIniciar}
            >
              Iniciar
            </button>
            <GoogleButton />
            <LoginGitHub />
          </form>
        </div>
      </div>
      <b className={styles.la_error}>{errorMsg}</b>
    </div>
  );
}
export default LoginAdmin;
