import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import styles from "./FeedbacksUsuario.module.css";
import { FaChevronDown } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useUser } from "../../context/user";
import { getAgrupacionById } from "../../controllers/Agrupaciones";
import { getUserById } from "../../controllers/User";

function FeedbacksUsuario() {
  const user = useUser();
  const [agrupacionesUsuario, setAgrupacionesUsuario] = useState([]);
  useEffect(() => {
    if (user) {
        console.log(user);
      const handleGetUser = async () => {
        const currentUser = await getUserById(user.uid);
        console.log(currentUser);
        return currentUser;
      };
      const currentUser = handleGetUser();
      
      const handleGetAgrupacionessForUser = async (userMemberships) => {
        let memberships = [];
        await Promise.all(
          userMemberships.map(async (membershipId) => {
            const agrupacion = await getAgrupacionById(membershipId);
            if (agrupacion) {
              memberships.push(agrupacion);
            }
          })
        );
        setAgrupacionesUsuario(memberships);
      };
      handleGetAgrupacionessForUser(currentUser.membresias);
      console.log(agrupacionesUsuario);
    }
  }, [user]);
  return (
    <div className={styles.Contenedor}>
      <div className={styles.UsuarioHeader}>
        <IoPersonCircle size={70} />
        <div>
          <p className="username">Jane Doe</p>
          <p className="email">jane.doe@correo.unimet.edu.ve</p>
        </div>
      </div>
      <div className={styles.ParteIzquierda}>
        <p>Agrupaciones a las que perteneces:</p>
      </div>
      <div className={styles.Agrupaciones}>
        <p> Agrupaciones</p>
        <FaChevronDown size={15} color="#000" />
        {agrupacionesUsuario.map((agrupacion) => (
          <p>{agrupacion}</p>
        ))}
      </div>
      <div className="ParteDerecha">
        <div className="TextArea">
          <textarea></textarea>
        </div>
        <div className="Rating">
          <button>Pulsa para valorar la agrupación</button>
          <div className="Estrellas">
            <FaStar size={40} color="#EC9900" />
            <FaStar size={40} color="#EC9900" />
            <FaStarHalfAlt size={40} color="#EC9900" />
            <FaRegStar size={40} color="#EC9900" />
            <FaRegStar size={40} color="#EC9900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbacksUsuario;
