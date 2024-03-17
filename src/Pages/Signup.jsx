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

export default function Register() {
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

      <div className={styles.container}>
        <h2 className={styles.titles}>Nombre</h2>
        <TextField placeholder="Ingresa tu nombre... !!" />

        <h2 className={styles.titles}>Apellido</h2>
        <TextField placeholder="Ingresa tu apellido..." />

        <h2 className={styles.titles}>Teléfono</h2>
        <TelField placeholder="Ingresa tu teléfono..." />

        <h2 className={styles.titles}>Correo Electrónico</h2>
        <EmailField placeholder="Ingresa tu correo..." />

        <h2 className={styles.titles}>Contraseña</h2>
        <PasswordField placeholder="Ingresa tu contraseña..." />

        <h2 className={styles.titles}>Confirme su Contraseña</h2>
        <PasswordField placeholder="Confirma tu contraseña..." />

        <div>
          <button className = {styles.buttonRegistrarse}>Registrarse</button>
        </div>
        <div>
          <GoogleButton/>
          <FacebookButton />
        </div>
        <div>
          
          <AppleButton />
        </div>
      </div>
    </div>
  );
}
