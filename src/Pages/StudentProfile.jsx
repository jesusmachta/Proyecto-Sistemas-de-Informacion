import Navbar from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/user";
const defaultPicture = "./DefaultProfilePic.svg.png";
import { collection, where, query, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import styles from "./StudentProfile.module.css";
import { updateUser } from "../controllers/updateUser";
import { storage } from "../firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import SidebarStudent from "../Components/SidebarStudent";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

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
  const [image, setImage] = useState(null);

  const nameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    if (userL) {
      console.log("Si existe userL");
      setUserEmail(userL.email);
      console.log(userEmail);
    }
    const findUser = async () => {
      try {
        const docRef = doc(db, "Students", userL.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserId(docSnap.id);
          setUserName(docSnap.data().name);
          setUserLastName(docSnap.data().lastName);
          setUserPhone(docSnap.data().phoneNumber);
          setDataLoaded(true);
          setIsLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting documents: ", error);
      }

      if (userId) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        try {
          const url = await getDownloadURL(storageRef);
          setImage(url);
        } catch (error) {
          console.log("No se encontró la imagen");
          setImage(defaultPicture);
        }
      }
    };
    findUser();
  }, [navigation, userId]);

  const update = () => {
    const nameR = nameRef.current.value;
    const lastNameR = lastNameRef.current.value;
    const phoneR = phoneRef.current.value;
    if (nameR !== "" || lastNameR !== "" || phoneR !== "") {
      updateUser({
        userId: userId,
        email: userEmail,
        name: userName,
        phoneNumber: userPhone,
        lastName: userLastName,
        nameRef: nameR,
        lastNameRef: lastNameR,
        phoneRef: phoneR,
      });
    }

    if (image) {
      // Esto verifica si image es diferente de null
      const storageRef = ref(getStorage(), `profilePictures/${userId}`);
      uploadBytes(storageRef, image).then(() => {
        // alert("Se subió la imagen correctamente");
      });
    } else {
      // alert("No se seleccionó ninguna imagen");
    }
    Swal.fire({
      icon: "success",
      title: "Perfil actualizado exitosamente",
      confirmButtonText: "OK",
    });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
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
          <SidebarStudent className={styles.sidebar}></SidebarStudent>
          <Navbar></Navbar>
          <div className={styles.nameContainer}>
            <div
              className={styles.profilePic}
              style={{
                backgroundImage: `url(${image || defaultPicture})`,
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
                  <input
                    id="nombreEstudiante"
                    type="text"
                    placeholder={userName}
                    ref={nameRef}
                    className={styles.input}
                  ></input>
                </div>
                <div>
                  <h1>Apellido</h1>
                  <input
                    id="apellidoEstudiante"
                    type="text"
                    placeholder={userLastName}
                    ref={lastNameRef}
                    className={styles.input}
                  ></input>
                </div>
              </div>
              <div className={styles.inputs}>
                <div>
                  <h1>Teléfono</h1>
                  <input
                    id="telefonoEstudiante"
                    type="tel"
                    placeholder={userPhone}
                    ref={phoneRef}
                    className={styles.input}
                  ></input>
                </div>
                <div>
                  <h1>Correo electrónico</h1>
                  <input
                    id="correoEstudiante"
                    type="email"
                    placeholder={userEmail}
                    readOnly={true}
                    className={styles.input}
                  ></input>
                </div>
              </div>
              <div className={styles.profilePicUpload}>
                <div className={styles.customFileInput}>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    className={styles.input}
                    // onChange={handleImageUpload}
                  />
                  <label htmlFor="file">
                    <i className="fas fa-upload"></i> Subir una imagen
                    <p className={styles.pImage}>Esta será la foto de perfil</p>
                  </label>
                </div>
                <img id="preview" className={styles.profilePicPreview} />
              </div>
              <div className="button">
                <button onClick={update}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
