import { useState,useEffect } from "react"
import { db, storage } from "../firebase"
import { collection,getDocs } from "firebase/firestore"
import { listAll, ref, getDownloadURL } from "firebase/storage";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";


const Card = () => {
    const [agrupaciones, setAgrupaciones] = useState([]);
    const imagenesRef = ref(storage,"Agrupaciones/")
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
        } catch (error) {
            console.error('Error al obtener las agrupaciones:', error);
        }
        };

        obtenerAgrupaciones();
    }, []);

  return (
    <div className={styles.card}>
        {agrupaciones.map((agrupacion) => (
          <div key={agrupacion.id} className={styles.cardBody}>
                <h2 className={styles.titles}>{agrupacion.nombre}</h2>
                <p className={styles.description}>{agrupacion.descripcion}</p> 
                <Link to={"/agrupacion/"+agrupacion.id} className={styles.link}>Ver agrupación</Link>
          </div>
        ))}
    </div>
  )
}

export default Card
