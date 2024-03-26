// const defaultPicture = "./DefaultProfilePic.svg.png";
const logo = "./logo-color copy.png";
import { useNavigate } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
const ThankYouPage =({title, message, button, returnRoute})=> {
    const navigation = useNavigate();
     const handleClick=()=>{
        navigation(returnRoute); 
     }; 
    return(
        <div className={styles.thankyoupage}>
            {/* <img src ={logo}></img> */}
            <h1 className ={styles.title}>{title} </h1>
            <p className={styles.message}>{message}</p>
            <button className={styles.thankyoubutton} onClick={handleClick}>{button}</button>
        </div>
    )
}; 

export default ThankYouPage;