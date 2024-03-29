import styles from "./Agrupaciones.module.css";
import Card from "../Components/Card";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import SearchBar from "../Components/SearchBar/SearchBar";

const Agrupaciones = () => {
  const [agrupaciones, setAgrupaciones] = useState([]);
  const [filteredAgrupaciones, setFilteredAgrupaciones] = useState([]);
  const imagenesRef = ref(storage, "Agrupaciones/");
  const agrupacionesRef = collection(db, "Agrupaciones");

  useEffect(() => {
    const obtenerAgrupaciones = async () => {
      try {
        const querySnapshot = await getDocs(agrupacionesRef);

        const listAgrupaciones = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().name,
          descripcion: doc.data().description,
        }));
        setAgrupaciones(listAgrupaciones);
        setFilteredAgrupaciones(listAgrupaciones);
      } catch (error) {
        console.error("Error al obtener las agrupaciones:", error);
      }
    };

    obtenerAgrupaciones();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Agrupaciones</h1>
      <SearchBar agrupaciones={agrupaciones} setFilteredAgrupaciones={setFilteredAgrupaciones}/>
      <div className={styles.card}>
        {filteredAgrupaciones.map((agrupacion) => (
          <Card key={agrupacion.id} agrupacion={agrupacion} />
        ))}
      </div>
    </div>
  );
};

export default Agrupaciones;
