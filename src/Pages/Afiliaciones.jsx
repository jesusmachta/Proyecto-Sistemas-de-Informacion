import Navbar from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/user";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Afiliaciones.module.css";
import SidebarStudent from "../Components/SidebarStudent";
import PaypalButton from "../Components/PaypalButton";
import ClipLoader from "react-spinners/ClipLoader";
import { getStudentById } from "../controllers/updateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {removeSubscriptionFunction} from '../controllers/agregarAfiliacion';


export default function Afiliaciones() {
  const navigation = useNavigate();
  const userL = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [agrupaciones, setAgrupaciones] = useState([]);
  const [image, setImage] = useState(null);
  //borrar:
  const [showAlert, setShowAlert] = useState(false);
  const [donationAmount, setDonationAmount] = useState(1);


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
          setAgrupaciones(doc.data().afiliaciones);
          console.log(agrupaciones);
          setShowAlert(true);
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
    userL,
    
  ]);
  const handleGetOut=( nombre)=>{
    console.log("Nombre de la agrupación que quieres eliminar!"); 
    console.log(nombre); 
    removeSubscriptionFunction(nombre, userL);

    // window.location.reload(); 
  }; 

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader
          color="#d6ae36"
          cssOverride={{}}
          size={100}
          speedMultiplier={1}
        />{" "}
      </div>
    );
  }

  if (dataLoaded) {
    return (
      <div>
        <div>
          <SidebarStudent></SidebarStudent>
          <Navbar />
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
          {!agrupaciones ? (
            <div>
              <h1 className={styles.titulo}>Afiliaciones</h1>

              <p className={styles.mensaje}>
                Todavía no estás afiliado a ninguna agrupación.
              </p>
              <button
                onClick={() => navigation("/")}
                className={styles.botonveragrupaciones}
              >
                Ver agrupaciones
              </button>
            </div>
          ) : (
            <div>
              <div className={styles.header}>
                <h1 className={styles.titulo}>Afiliaciones</h1>
                <button className={styles.botonRealizarFeedback}>
                  Realizar un feedback
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table>
                  <thead>
                    <tr>
                      <th>Agrupación</th>
                      <th>Colaborar</th>
                      <th>Fecha de Afiliación</th>
                      <th>Desafiliar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agrupaciones.map((agrupacion) => (
                      <tr key={agrupacion.id}>
                        <td>{agrupacion.nombre}</td>
                        <td>
                        <PaypalButton donationAmount={donationAmount} setDonationAmount={setDonationAmount} /> 
                        </td>
                        <td>{agrupacion.fechaAfiliacion}</td>
                        <td>
                          <button>Desafiliar</button>
                        </td>
                        <td>{agrupacion.miembros?.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}


