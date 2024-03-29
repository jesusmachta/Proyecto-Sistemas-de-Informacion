import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm } from "react-hook-form";
import styles from './RegisterGroup.module.css';

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
        const admin = adminSnapshot.docs[0].data(); // Asume que solo hay un administrador
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
      // Convertir la cadena de miembros a un array
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
    <div className={styles.body}>
      <div className={styles.profileInfo}>
        <img className={styles.profileImage} src="profile.jpg" alt="Profile" />
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
          />
          <textarea
            {...register("vision")}
            placeholder="Visión"
            className={styles.textarea}
          />
          <textarea
            {...register("description")}
            placeholder="Descripción"
            className={styles.textarea}
          />
          <textarea
            {...register("mision")}
            placeholder="Misión"
            className={styles.textarea}
          />
          <input
            type="text"
            {...register("members", { required: true })}
            placeholder="Miembros (separados por comas)"
          />
          <input
            type="text"
            value={imgSrc}
            onChange={handleImgSrcChange}
            placeholder="Pega el enlace de la imagen principal aquí"
            style={{ width: "100%", marginTop: "10px" }}
          />
          <input
            type="text"
            onChange={handleImgExtrasChange}
            placeholder="Pega el enlace de las imágenes extras aquí"
            style={{ width: "100%", marginTop: "10px" }}
          />
          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  );
};

export default RegisterGroup;
