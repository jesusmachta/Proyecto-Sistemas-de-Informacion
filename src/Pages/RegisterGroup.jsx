import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm } from "react-hook-form";
import styles from "./RegisterGroup.module.css";
import Navbar from "../components/Navbar";
import SidebarAdmin from "../components/SidebarAdmin";

const RegisterGroup = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgExtras, setImgExtras] = useState([]);
  const { register, handleSubmit } = useForm();
  const [adminData, setAdminData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminCollection = collection(db, "Administrator");
      const adminSnapshot = await getDocs(adminCollection);
      if (!adminSnapshot.empty) {
        const admin = adminSnapshot.docs[0].data();
        setAdminData(admin);
      } else {
        console.log(
          "No se encontró ningún documento en la colección Administrador"
        );
      }
    };

    fetchAdminData();
  }, []);

  const handleImgSrcChange = (event) => {
    setImgSrc(event.target.value);
  };

  const handleImgExtrasChange = (event) => {
    setImgExtras([...imgExtras, event.target.value]);
  };

  const onSubmit = async (data) => {
    try {
      data.members = data.members.split(",").map((member) => member.trim());

      data.ImgSrc = imgSrc;
      data.ImgExtras = imgExtras;

      const groupCollection = collection(db, "Agrupaciones");
      await addDoc(groupCollection, data);
      alert("Grupo registrado con éxito");
    } catch (error) {
      console.error("Error al registrar el grupo: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarAdmin />
      <div className={styles.body}>
        <div className={styles.profileInfo}>
          <img
            className={styles.profileImage}
            src="profile.jpg"
            alt="Profile"
          />
          <h2>{adminData.name}</h2>
          <p>{adminData.email}</p>
        </div>
        <h1 className={styles.updateGroup}>Registro de Agrupaciones</h1>
        <div className={styles.leftSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              {...register("name")}
              placeholder="Nombre"
              className={styles.input}
              id="nombreGroup"
            />
            <div className={styles.pair}>
              <textarea
                {...register("vision")}
                placeholder="Visión"
                className={styles.textarea}
                id="visionGroup"
              />
              <textarea
                {...register("description")}
                placeholder="Descripción"
                className={styles.textarea}
                id="descripcionGroup"
              />
            </div>
            <div className={styles.pair}>
              <textarea
                {...register("mision")}
                placeholder="Misión"
                className={styles.textarea}
                id="misionGroup"
              />
              <input
                type="text"
                {...register("members", { required: true })}
                placeholder="Miembros (separados por comas)"
                className={styles.input}
                id="miembrosGroup"
              />
            </div>
            <div className={styles.pair}>
              <input
                type="text"
                value={imgSrc}
                onChange={handleImgSrcChange}
                placeholder="Pega el enlace de la imagen principal aquí"
                className={styles.input}
                id="imagenGroup"
              />
              <input
                type="text"
                onChange={handleImgExtrasChange}
                placeholder="Pega el enlace de las imágenes extras aquí"
                className={styles.input}
                id="imagenesExtrasGroup"
              />
            </div>
            <input type="submit" value="Registrar" />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterGroup;
