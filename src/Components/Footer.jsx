import styles from './Footer.module.css'
import Foto from '../../public/logo-color.png'

const Footer = () => {
  return (
    <div className={styles.conteiner}>
      <footer>
        <img className={styles.image} src={Foto} alt='imagen de la app'/>
      </footer>
     
    </div>
  )
}

export default Footer
