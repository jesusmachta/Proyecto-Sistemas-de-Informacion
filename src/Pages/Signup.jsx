import {
  TextField,
  EmailField,
  PasswordField,
  TelField,
} from "../Components/InputControl";
import {
  GoogleButton,
  FacebookButton,
  AppleButton,
} from "../Components/Signupbuttons";

import styles from "./Signup.module.css";
const logo = "./logo-color-sinfondo.png";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { saveUser } from "../SaveUserDB";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const registro = () => {
    if (
      !values.name ||
      !values.lastName ||
      !values.phoneNumber ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }
    setErrorMessage("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updatePassword(user, {
          displayName: values.name,
          displayLastname: values.lastName,
          phone: values.phoneNumber,
        });
        console.log(values);

        saveUser(values);
        alert("Usuario creado correctamente");
      })
      .catch((e) => {
        setSubmitButtonDisabled(false);
        setErrorMessage(e.message);
      });
  };
  [
    navigate,
    values.name,
    values.lastName,
    values.phoneNumber,
    values.email,
    values.password,
    values.confirmPassword,
    errorMessage,
    submitButtonDisabled,
  ];

  useEffect(() => {
    const guardarPerfil = async (user) => {
      try {
        const userProfile = {
          displayName: values.name,
          displayLastname: values.lastName,
          phone: values.phoneNumber,
        };
        await updateProfile(user, userProfile);
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
        guardarPerfil(user);
      }
    });
    return unsubscribe;
  }, [navigate, values.name, values.lastName, values.phoneNumber]);

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
      <b className = {styles.error}>{errorMessage}</b>

      <div className={styles.container}>
        <h2 className={styles.titles}>Nombre</h2>
        <TextField
          label="Nombre"
          placeholder="Ingresa tu nombre..."
          onChange={(event) =>
            setvalues({ ...values, name: event.target.value })
          }
        />

        <h2 className={styles.titles}>Apellido</h2>
        <TextField
          label="Apellido"
          placeholder="Ingresa tu apellido..."
          onChange={(event) =>
            setvalues({ ...values, lastName: event.target.value })
          }
        />

        <h2 className={styles.titles}>Teléfono</h2>
        <TelField
          label="Telefono"
          placeholder="Ingresa tu teléfono..."
          onChange={(event) =>
            setvalues({ ...values, phoneNumber: event.target.value })
          }
        />

        <h2 className={styles.titles}>Correo Electrónico</h2>
        <EmailField
          label="Email"
          placeholder="Ingresa tu correo..."
          onChange={(event) =>
            setvalues({ ...values, email: event.target.value })
          }
        />

        <h2 className={styles.titles}>Contraseña</h2>
        <PasswordField
          label="Contraseña"
          placeholder="Ingresa tu contraseña..."
          onChange={(event) =>
            setvalues({ ...values, password: event.target.value })
          }
        />

        <h2 className={styles.titles}>Confirme su Contraseña</h2>
        <PasswordField
          label="ConfirmeContraseña"
          placeholder="Confirma tu contraseña..."
          onChange={(event) =>
            setvalues({ ...values, confirmPassword: event.target.value })
          }
        />

        <div>
          <button className={styles.buttonRegistrarse} onClick={registro}>Registrarse</button>
        </div>
        <div>
          <GoogleButton />
          <FacebookButton />
        </div>
        <div>
          <AppleButton />
        </div>
      </div>
    </div>
  );
}
