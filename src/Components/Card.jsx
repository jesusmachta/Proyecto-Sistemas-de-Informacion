import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({agrupacion}) => {
  return (
    <div key={agrupacion.id} className={styles.cardBody}>
      <h2 className={styles.titles}>{agrupacion.nombre}</h2>
      <p className={styles.description}>{agrupacion.descripcion}</p>
      <Link to={"/agrupacion/" + agrupacion.id} className={styles.link}>
        Ver agrupación
      </Link>
    </div>
  );
};

export default Card;
