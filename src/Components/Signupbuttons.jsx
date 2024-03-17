import {FcGoogle} from 'react-icons/fc'; 
import {FaFacebook} from 'react-icons/fa';
import {AiFillApple} from 'react-icons/ai';
import styles from './Singupbuttons.module.css';

export function GoogleButton(){
    return <button className={styles["google-button"]}><FcGoogle/> Registrate con Google</button>
}

export function FacebookButton(){
    return <button className={styles["facebook-button"]}><FaFacebook color='#3b5998'/> Registrate con Facebook</button>
}

export function AppleButton(){
    return <button className={styles["apple-button"]}><AiFillApple /> Registrate con Apple</button>
}