import styles from "./InputControlAdmin.module.css";
export function InputControlAdmin(props) {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props}></input>
    </div>
  );
}

export function EmailField({ placeholder, onChange, id }) {
  return (
    <input
      className={styles.inputField}
      id = {id}
      type="email"
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}

export function PasswordField({
  placeholder,
  onChange,
  showPassword,
  onTogglePassword,
  id,
}) {
  return (
    <div className={styles.inputField}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.passwordInput}
        id = {id}
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
