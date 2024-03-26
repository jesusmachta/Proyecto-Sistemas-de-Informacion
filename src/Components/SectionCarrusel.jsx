
import styles from "./SectionCarrusel.module.css"
import ImagesCarrusel from "./ImagesCarrusel"


const SectionCarrusel = () => {
  
  return (
    <div className={styles.conteiner}>

      <h2>Te presentamos nuestras principales agrupaciones</h2>
      <ImagesCarrusel/>
    </div>
  )
}

export default SectionCarrusel
