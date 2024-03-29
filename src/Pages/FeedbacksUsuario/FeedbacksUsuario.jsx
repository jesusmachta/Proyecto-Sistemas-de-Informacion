import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import styles from "./FeedbacksUsuario.css";
import { FaChevronDown } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

function FeedbacksUsuario() {
  return (
    <div className="Contenedor">
      <div className="UsuarioHeader">
        <IoPersonCircle size={70} />
        <p>Jane Doe</p>
        {/* <p2>jane.doe@correo.unimet.edu.ve</p2> */}
      </div>
      <div className="ParteIzquierda">
        <p>Agrupaciones a las que perteneces:</p>
      </div>
      <div className="Agrupaciones">
        <p> Agrupaciones</p>
        <FaChevronDown size={15} color="#000" />
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
