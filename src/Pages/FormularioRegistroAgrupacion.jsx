import Navbar from "../Components/Navbar";
import SidebarStudent from "../Components/SidebarStudent";
import { useUser } from "../context/user";
import styles from "./FormularioRegistroAgrupacion.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

export default function Formulario() {
  const navigation = useNavigate();
  const userL = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userCareer, setUserCareer] = useState(null);
  const [carnet, setCarnet] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userL) {
      setUserEmail(userL.email);
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
          setUserCareer(doc.data().career);
          setCarnet(doc.data().carnet);
          console.log(userCareer);

          setDataLoaded(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
      if (userId) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        try {
          const url = await getDownloadURL(storageRef);
          setImage(url);
        } catch (error) {
          console.log(error);
        }
      }
    };
    findUser();
  }, [
    navigation,
    userL
  ]);

  async function update (){
    if(userCareer && carnet){
        const userRef = doc(db, "Students", userId);
        await updateDoc(userRef, {
            career: userCareer,
            carnet: carnet,
        });
        Swal.fire({
            icon: "success",
            title: "¡Datos actualizados!",
            confirmButtonText: "Ok",
        });
        window.location.reload();
    }else{
        setErrorMessage("Por favor, llena todos los campos");
    }
      console.log("Se actualizó la carrera y el carnet");

  }; 
  if(isLoading){
    return <div className ={styles.loaderContainer}>
    <ClipLoader
      color="#d6ae36"
      cssOverride={{}}
      size={100}
      speedMultiplier={1}
    /> </div>;
  }
  if (dataLoaded) {
    return (
      <div>
        <SidebarStudent></SidebarStudent>
        <Navbar></Navbar>
        <div className={styles.nameContainer}>
          <div
            className={styles.profilePic}
            style={{
              backgroundImage: `url(${image})`,
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
        <div>
          <h1 className={styles.titulo}>
            Formulario para registro en una agrupación
          </h1>
          <p className={styles.mensaje}>
            Estamos emocionados de que estés interesado en formar parte de una
            agrupación en la universidad. Completa el siguiente formulario de
            registro para unirte a cualquier agrupación y participar en sus
            actividades y eventos.
          </p>
          <p className={styles.errorMsg}>{errorMessage}</p>
        </div>
        
        <div className={styles.containerInputs}>
            <p className={styles.titulosinputs}>Nombre</p>
            <input id = "nombreEstudiante" type="text" readOnly placeholder={userName} className={styles.inputs}/>
            <p className={styles.titulosinputs}>Apellido</p>
            <input id = "apellidoEstudiante" type="text" readOnly placeholder={userLastName} className={styles.inputs}/>
            <p className={styles.titulosinputs}>Teléfono</p>
            <input id = "telefonoEstudiante" type="number" readOnly placeholder={userPhone} className={styles.inputs}/>
            <p className={styles.titulosinputs}>Correo electrónico</p>
            <input id = "correoEstudiante" type="mail" readOnly placeholder={userEmail} className={styles.inputs}/>
            <p className={styles.titulosinputs}>Carrera</p>
            <input  id ="carreraEstudiante" type="text"  placeholder={userCareer? userCareer: "Tu carrera..."} className={styles.inputs}
                onChange ={(event)=>{
                    setUserCareer(event.target.value); 
                    setErrorMessage("");} 
                    
                }
            />
            <p className={styles.titulosinputs}>Carnet Unimet</p>
            <input id ="carnetEstudiante" type="number"  placeholder={carnet ? carnet: "Tu carnet...."} className={styles.inputs}
                onChange ={(event)=>{
                    setCarnet(event.target.value); 
                    setErrorMessage("");}
                }
            />


        </div>
        <div>
            <button className={styles.botonGuardar} onClick={update}>Guardar</button>
        </div>
      </div>
    );
  }
}
