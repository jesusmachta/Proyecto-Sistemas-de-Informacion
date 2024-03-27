import styles from "./SectionCarrusel.module.css"
import ImagesCarrusel from "./ImagesCarrusel"
import {Link} from "react-router-dom"

const SectionCarrusel = () => {
  
  return (
    <div className={styles.conteiner}>
      <h2 className={styles.titles}>Te presentamos nuestras principales agrupaciones</h2>
       <ImagesCarrusel/>
       <div className={styles.buttonConteiner}>
        <Link className={styles.button} to="/agrupaciones">Click acá para ver más</Link>
      </div>
    </div>
  )
}

export default SectionCarrusel
