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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
    userId,
    userEmail,
    userName,
    agrupaciones,
    image,
    dataLoaded,
    isLoading,
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

  function onApprove(data, actions) {
    return actions.order
      .capture()
      .then(function (details) {
        alert("¡Muchas gracias por su colaboración!");
      })
      .catch(function (error) {
        console.error("Error al capturar la orden:", error);
        alert(
          "Hubo un problema al procesar su donación. Por favor, inténtelo de nuevo más tarde."
        );
      });
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
                          <div className={styles.paypalWrapper}>
                            <PayPalScriptProvider
                              options={{
                                clientId:
                                  "AegtMfBPHAwnLICPfPbXdxpws0YIf0P9tVf1kUW012yoG9TFSkN2xfTdw4MYnwUiYXGkwfdiQBuwWxPK",
                                components: "buttons",
                                currency: "USD",
                              }}
                            >
                              <PayPalButtons
                                fundingSource="paypal"
                                style={{ layout: "vertical", label: "donate" }}
                                disabled={false}
                                forceReRender={[{ layout: "vertical" }]}
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          value:
                                            parseFloat(donationAmount).toFixed(
                                              2
                                            ),
                                          breakdown: {
                                            item_total: {
                                              currency_code: "USD",
                                              value:
                                                parseFloat(
                                                  donationAmount
                                                ).toFixed(2),
                                            },
                                          },
                                        },
                                        items: [
                                          {
                                            name: "Agrupación",
                                            quantity: "1",
                                            unit_amount: {
                                              currency_code: "USD",
                                              value:
                                                parseFloat(
                                                  donationAmount
                                                ).toFixed(2),
                                            },
                                            category: "DONATION",
                                          },
                                        ],
                                      },
                                    ],
                                  });
                                }}
                                onApprove={onApprove}
                              />
                            </PayPalScriptProvider>
                            <input
                              type="number"
                              step={0.5}
                              value={donationAmount}
                              onChange={(e) =>
                                setDonationAmount(e.target.value)
                              }
                            />
                          </div>
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
