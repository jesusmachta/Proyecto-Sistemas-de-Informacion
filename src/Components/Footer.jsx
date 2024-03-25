import styles from './Footer.module.css'
import foto from '../../public/logo-color-sinfondo.png'
import {SiInstagram,SiX,SiFacebook,SiTiktok} from "react-icons/si"
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

const Footer = () => {
  return (
    <div className={styles.conteiner}>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <img src={foto} alt='imagen de conecta unimet' className={styles.logo} />
          <ul className={styles.unorderlist}>
            <li className={styles.list}>Enlaces</li>
            <li className={styles.list}>Inicio</li>
            <li className={styles.list}>Nosotros</li>
            <li className={styles.list}>Contacto</li>
          </ul>
        </div>
        
        <div className={styles.redesSociales}>
          <div className={styles.containerRedes}>
            <p className={styles.titles}>¡Subscríbete para ser notificado de nuevas agrupaciones!</p>
<<<<<<< Updated upstream
            <input type='text' className={styles.input}/>
            <button className={styles.button}>Suscribe</button>
=======
            <div className={styles.formConteiner}>
              <input type='text' className={styles.input}/>
              <button className={styles.button}>Suscribe</button>
            </div>
>>>>>>> Stashed changes
          </div>

          <div className={styles.nose}>
            <p className={styles.redes}>Redes Sociales</p>
            <div className={styles.iconos}>
              <SiInstagram className={styles.icon} />
              <SiFacebook className={styles.icon}/>
              <SiX className={styles.icon}/>
              <SiTiktok className={styles.icon}/>
            </div>  
          </div>
<<<<<<< Updated upstream
                
=======
                 
>>>>>>> Stashed changes
        </div>
      </footer>
     
    </div>
  )
}

export default Footer
