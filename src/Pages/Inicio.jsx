import styles from './Inicio.module.css'
import Foto1 from '../../public/Foto_inicio.jpg'
import Foto2 from '../../public/Foto_inicio2.png'
import Foto3 from '../../public/FormulaSAE.png'
const Inicio = () => {

  return (
    <div className={styles.conteiner}>
      <div className={styles.imageContainer}>
        <img className={styles.image1} src={Foto1} alt="Foto_inicio"/>
        <img className={styles.image2} src={Foto2} alt="Foto_inicio2"/>
      </div>
      <div>
        <h1>“La realidad está esperando a que la transformes”</h1>
        <button>Registrate</button>
        <button>Explorar agrupaciones</button>
      </div>
    </div>   
  );
};

export default Inicio;


