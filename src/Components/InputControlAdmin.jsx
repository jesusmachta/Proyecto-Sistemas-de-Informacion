import styles from "../Pages/RegistrarAdmin.module.css";
export function TextField({ placeholder, onChange }) {
  return (
    <input type="text" placeholder={placeholder} onChange={onChange}></input>
  );
}

export function EmailField({ placeholder, onChange }) {
  return (
    <input type="email" placeholder={placeholder} onChange={onChange}></input>
  );
}

export function PasswordField({
  placeholder,
  onChange,
  showPassword,
  onTogglePassword,
}) {
  return (
    <div className={styles.PasswordField}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.passwordInput}
      />
      <i
        onClick={onTogglePassword}
        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${
          styles.fas
        }`}
      />
    </div>
  );
}

export function TelField({ placeholder, onChange }) {
  return <input type="tel" placeholder={placeholder} onChange={onChange} />;
}
