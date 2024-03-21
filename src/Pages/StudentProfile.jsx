import Navbar from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/user";
const defaultPicture = "./DefaultProfilePic.svg.png";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import styles from "./StudentProfile.module.css";
export default function studentProfile() {
  const navigation = useNavigate();
  const userL = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    if (userL) {
      console.log("Si existe userL");
      setUserEmail(userL.email);
      console.log(userEmail);
      // setUserName(userL.displayName.split(" ")[0]);
      // console.log(userName);
      // setUserLastName(userL.displayName.split(" ")[1]);
      // console.log(userLastName);
      // setUserPhone(userL.phoneNumber);
      // console.log(userPhone);
      // setDataLoaded(true);
    }
    const findUser = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Students"), where("email", "==", userL.email))
        );

        querySnapshot.forEach((doc) => {
          setUserId(doc.id); 
          setUserName(doc.data().name);
          setUserLastName(doc.data().lastName);
          setUserPhone(doc.data().phoneNumber);
          setDataLoaded(true); 
          setIsLoading(false); 
        });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }; findUser(); 
  }, [navigation, userEmail, userL]);

  if(isLoading){
    return <div>Loading...</div>
  }
  if (dataLoaded) {
    return (
      <div>
        <Navbar></Navbar>
        <div className={styles.nameContainer}>
          <div
            className={styles.profilePic}
            style={{
              backgroundImage: `url(${defaultPicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
            }}
          ></div>
          <div>
          <h1 className={styles.profileName}>{userName}</h1>
          <p className={styles.profileEmail}>{userEmail}</p>
          </div>
          
        </div>
        <div className={styles.parentContainer}>
        <div className={styles.containerInputs}>
          <div className={styles.inputs}>
            <div>
            <h1>Nombre</h1>
            <input type="text" placeholder={userName}></input>
            </div>
            <div>
            <h1>Apellido</h1>
            <input type="text" placeholder={userLastName}></input>
            </div>
            
          </div>
          <div className={styles.inputs}>
            <div>
            <h1>Teléfono</h1>
            <input type="tel" placeholder={userPhone}></input>
            </div>
           <div>
           <h1>Correo electrónico</h1>
            <input type="email" placeholder={userEmail} readOnly={true}></input>
           </div>
            
          </div>
          <div className="button">
            <button>Guardar cambios</button>
          </div>
        </div>
        </div>
       
      </div>
    );
  }
}
