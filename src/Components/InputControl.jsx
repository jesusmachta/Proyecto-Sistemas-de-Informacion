

import styles from "./InputControl.module.css";
export function TextField({placeholder, onChange, id }){
    return <input type ="text" placeholder={placeholder} onChange={onChange} className={styles.input} id = {id}></input>
}

export function EmailField({placeholder, onChange, id}){
    return <input type ="email" placeholder={placeholder} onChange={onChange} className={styles.input} id ={id}></input>
}

export function PasswordField({placeholder, onChange, showPassword, onTogglePassword, id}){
    return (
        <div >
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                onChange={onChange}
                className={styles.input}
                id ={id}
            />
            <i 
                onClick={onTogglePassword}
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.fas}`}
            />
        </div>
    );
}

export function TelField({placeholder, onChange, id}){
    return <input type= "tel" placeholder={placeholder} onChange={onChange} className={styles.input} id ={id}/>;
}
