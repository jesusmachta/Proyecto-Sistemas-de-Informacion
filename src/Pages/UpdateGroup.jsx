import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm } from "react-hook-form";
import styles from "./UpdateGroup.module.css";

const UpdateGroup = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const [adminData, setAdminData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchGroups = async () => {
      const groupCollection = collection(db, "Agrupaciones");
      const groupSnapshot = await getDocs(groupCollection);
      const groupList = groupSnapshot.docs.map((doc) => {
        console.log("Group data: ", doc.data()); // Agregado para depuración
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setGroups(groupList);
    };

    const fetchAdminData = async () => {
      const adminCollection = collection(db, "Administrator");
      const adminSnapshot = await getDocs(adminCollection);
      if (!adminSnapshot.empty) {
        const admin = adminSnapshot.docs[0].data(); // Asume que solo hay un administrador
        setAdminData(admin);
      } else {
        console.log(
          "No se encontró ningún documento en la colección Administradores"
        );
      }
    };

    fetchGroups();
    fetchAdminData();
  }, []); // Añadido el cierre del useEffect

  const handleGroupChange = (event) => {
    const group = groups.find((group) => group.name === event.target.value);
    console.log("Selected group: ", group); // Agregado para depuración
    setSelectedGroup(group);
    for (const field in group) {
      setValue(field, group[field]);
    }
  };

  const handleLinkChange = (event) => {
    setImgUrl(event.target.value);
  };

  const handleAdd = async () => {
    const groupRef = doc(db, "Agrupaciones", selectedGroup.id);
    const newImgExtras = [...selectedGroup.ImgExtras, imgUrl];
    await updateDoc(groupRef, { ImgExtras: newImgExtras });
    setImgUrl(""); // Limpiar el input después de agregar
  };

  const handleDelete = async (imgUrl) => {
    const groupRef = doc(db, "Agrupaciones", selectedGroup.id);
    const newImgExtras = selectedGroup.ImgExtras.filter(
      (url) => url !== imgUrl
    );
    await updateDoc(groupRef, { ImgExtras: newImgExtras });
  };

  const onSubmit = async (data) => {
    console.log("Form data: ", data); // Agregado para depuración
    try {
      // Convertir la cadena de miembros a un array y contar la cantidad de miembros
      const membersArray = JSON.parse(data.members);
      data.members = membersArray.length;

      const groupRef = doc(db, "Agrupaciones", selectedGroup.id);
      await updateDoc(groupRef, data);
      alert("Grupo actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el grupo: ", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.profileInfo}>
        <img className={styles.profileImage} src="profile.jpg" alt="Profile" />
        <h2>{adminData.name}</h2>
        <p>{adminData.email}</p>
      </div>
      <h1 className={styles.updateGroup}>Actualización de Agrupaciones</h1>
      <div className={styles.leftSection}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <select onChange={handleGroupChange} className={styles.select}>
            <option>Selecciona un grupo</option>
            {groups.map((group, index) => (
              <option key={index} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
          {selectedGroup && (
            <>
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
              <img src={selectedGroup.ImgSrc} alt="Imagen del grupo" />
              <textarea
                value={selectedGroup.members
                  .map((member, index) => `${index + 1}. ${member}`)
                  .join("\n")}
                placeholder="Miembros"
                readOnly
                className={styles.textarea}
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {selectedGroup.ImgExtras.map((imgUrl, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Imagen extra ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <button
                      onClick={() => handleDelete(imgUrl)}
                      style={{ width: "200px", height: "200px" }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={imgUrl}
                onChange={handleLinkChange}
                placeholder="Pega el enlace de la imagen aquí"
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                  marginLeft: "35%",
                }}
              >
                <button
                  type="button"
                  onClick={handleAdd}
                  style={{ margin: "10px auto" }}
                >
                  Agregar
                </button>
                <button
                  type="submit"
                  className={styles.button}
                  style={{ margin: "10px auto" }}
                >
                  Actualizar
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateGroup;