import {useState} from 'react';
import styles from './Alert.module.css'; 



export default function Alert({titulo, mensaje}){
    const [show, setShow] = useState(true);
 
    console.log(titulo,mensaje); 
    return(
        show && (
            <div className={styles.alert}>
                <div>
                <span className={styles.closeBtn} onClick={() => setShow(false)}>&times;</span>
                    <h1 className={styles.titulo}>{titulo}</h1>
                    <p className={styles.mensaje}>{mensaje}</p>
                    
                </div>
            </div>
        )
    );
}