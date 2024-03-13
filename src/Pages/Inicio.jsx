import styles from './Inicio.module.css'
import Foto1 from '../../public/Foto_inicio.jpg'
import Foto2 from '../../public/Foto_inicio2.png'
import Foto3 from '../../public/FotoMetro.png'
import SectionCarrusel from '../Components/SectionCarrusel'
import 'animate.css' /*No borrar*/ 

const Inicio = () => {

  return (
    <div className={styles.conteiner}>
      <div className={styles.imageContainer}>
        <img className={styles.image1} src={Foto1} alt="Foto_inicio"/>
        <img className={styles.image2} src={Foto2} alt="Foto_inicio2"/>
      </div>
      <div className={styles.textContainer}>
        <h1 className={`${styles.text} animate__animated animate__fadeIn`}>“La realidad está esperando a que la transformes”</h1>
        <div className={styles.buttonConteiner}>
          <button className={styles.button}>Registrate</button>
          <button className={styles.button}>Explorar agrupaciones</button>
        </div>
      </div>
      <section className={styles.conteinerInformacion}>
        <div className={styles.misionVision}>
            <h3 className={`${styles.titulo} animate__animated animate__fadeIn`}>Misión</h3>
            <p className={`${styles.parrafo} animate__animated animate__fadeIn`}>Facilitar la conexión y participación activa de los estudiantes universitarios en Agrupaciones Estudiantiles, ofreciendo una plataforma intuitiva que promueva la diversidad de intereses, el trabajo en equipo y el desarrollo integral.</p>
            <h3 className={`${styles.titulo} animate__animated animate__fadeIn`}>Visión</h3>
            <p className={`${styles.parrafo} animate__animated animate__fadeIn`}>Ser la principal plataforma de búsqueda de agrupaciones dentro de la universidad Metropolitana, queremos que muchos estudiantes usen este medio para que se puedan unir a grupos en los cuales se sientan representados y así poder conocer a más gente dentro de la universidad.</p>
            <h3 className={`${styles.titulo} animate__animated animate__fadeIn`}>Objetivos de la página</h3>
            <p className={`${styles.parrafo} animate__animated animate__fadeIn`}>Desarrollar una aplicación web, que brinde a la Universidad Metropolitana herramientas efectivas para la afiliación, gestión y colaboración en Agrupaciones Estudiantiles, contribuyendo así al fortalecimiento de la comunidad universitaria.</p>
        </div>
        <img src={Foto3} alt='foto de la metro' className={styles.imagen3}/>
        </section>

        <section>
          <SectionCarrusel/>
        </section>
    </div>   
  );
};

export default Inicio;


