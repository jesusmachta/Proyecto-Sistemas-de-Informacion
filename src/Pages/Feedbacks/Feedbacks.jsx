import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import styles from "./Feedbacks.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Comment from "../../Components/Comment/Comment";

const Feedbacks = () => {
  return (
    <div className={styles.FeedbacksContainer}>
      <div className={styles.ratingContainer}>
        <div className={styles.ratingTitleContainer}>
          <p>Rating Agrupación</p>
        </div>
        <div className={styles.ratingWrapper}>
          <FaStar size={40} color="#EC9900" />
          <FaStar size={40} color="#EC9900" />
          <FaStarHalfAlt size={40} color="#EC9900" />
          <FaRegStar size={40} color="#EC9900" />
          <FaRegStar size={40} color="#EC9900" />
        </div>
      </div>
      <div className={styles.contenedorComentario}>
        <div className={styles.boton}>
          <IoMdAdd color="#667085" />
          <p>Agregar comentario</p>
        </div>
        <div className={styles.commentsList}>
          <Comment />
          <Comment />
          <Comment />
        </div>
        <div className={`${styles.boton} alignRight`}>
          <p>Ver más</p>
          <IoIosArrowRoundForward size={25} color="#667085" />
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
