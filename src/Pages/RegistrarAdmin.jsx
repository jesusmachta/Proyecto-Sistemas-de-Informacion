import {
  TextField,
  EmailField,
  PasswordField,
  TelField,
} from "../Components/InputControlAdmin";
import styles from "./Signup.module.css";
const logo = "./logo-color-sinfondo.png";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { saveUser } from "../SaveAdminBD";
import { useNavigate } from "react-router-dom";

export default function RegistrarAdmin() {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailRegex = /^[\w-]+(\.[\w-]+)*@unimet\.edu\.ve$/;

  const registro = () => {
    console.log(values);
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
    if (values.password !== values.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    if (!emailRegex.test(values.email)) {
      setErrorMessage(
        "El correo no es válido. Debe colocar su correo de admin"
      );
      return;
    }
    setErrorMessage("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
          displayLastname: values.lastName,
          phone: values.phoneNumber,
        });
        console.log(values);

        saveUser(values);
        alert("Admin creado correctamente");
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
      <b className={styles.error}>{errorMessage}</b>

      <div className={styles.container}>
        <h2 className={styles.titles}>Nombre</h2>
        <TextField
        id = "nombreAdministrador"
          label="Nombre"
          placeholder="Ingresa tu nombre..."
          onChange={(event) => {
            console.log(event.target.value);
            setvalues((prev) => ({ ...prev, name: event.target.value }));
          }}
        />

        <h2 className={styles.titles}>Apellido</h2>
        <TextField
        id = "apellidoAdministrador"
          label="Apellido"
          placeholder="Ingresa tu apellido..."
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, lastName: event.target.value }))
          }
        />

        <h2 className={styles.titles}>Teléfono</h2>
        <TelField
        id = "telefonoAdministrador"
          label="Telefono"
          placeholder="Ingresa tu teléfono..."
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, phoneNumber: event.target.value }))
          }
        />

        <h2 className={styles.titles}>Correo Electrónico</h2>
        <EmailField
        id = "correoAdministrador"
          label="Email"
          placeholder="Ingresa tu correo..."
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <h2 className={styles.titles}>Contraseña</h2>
        <PasswordField
        id = "contraseñaAdministrador"
          placeholder="Ingresa tu contraseña..."
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, password: event.target.value }))
          }
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <h2 className={styles.titles}>Confirme su Contraseña</h2>
        <PasswordField
        id = "confirmarContraseñaAdministrador"
          placeholder="Confirma tu contraseña..."
          onChange={(event) =>
            setvalues((prev) => ({
              ...prev,
              confirmPassword: event.target.value,
            }))
          }
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div>
          <button className={styles.buttonRegistrarse} onClick={registro}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
