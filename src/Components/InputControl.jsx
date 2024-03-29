

import styles from "./InputControl.module.css";
export function TextField({placeholder, onChange}){
    return <input type ="text" placeholder={placeholder} onChange={onChange} className={styles.input}></input>
}

export function EmailField({placeholder, onChange}){
    return <input type ="email" placeholder={placeholder} onChange={onChange} className={styles.input}></input>
}

export function PasswordField({placeholder, onChange, showPassword, onTogglePassword}){
    return (
        <div >
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                onChange={onChange}
                className={styles.input}
            />
            <i 
                onClick={onTogglePassword}
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.fas}`}
            />
        </div>
    );
}

export function TelField({placeholder, onChange}){
    return <input type= "tel" placeholder={placeholder} onChange={onChange} className={styles.input}/>;
}
