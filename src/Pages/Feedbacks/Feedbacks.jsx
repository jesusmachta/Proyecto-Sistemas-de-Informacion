import styles from "./Feedbacks.module.css";
import FeedbacksUsuario from "../FeedbacksUsuario/FeedbacksUsuario";


function Feedbacks() {
  return (
    <div className={styles.FeedbacksContainer}>
      <FeedbacksUsuario />
    </div>
  )
}

export default Feedbacks