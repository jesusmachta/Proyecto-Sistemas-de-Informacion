import { FaStar } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import styles from './Feedbacks.module.css';
import Comment from '../Comment/Comment';
import { useUser } from '../../context/user';
import { useNavigate } from "react-router-dom";

const Feedbacks = ({feedbacksList, rating, isAMember}) => {

  const navigate = useNavigate();

  const user = useUser();
  if(feedbacksList && rating){
    return (
      <div className={styles.FeedbacksContainer}>
        <div className={styles.ratingContainer}>
          <div className={styles.ratingTitleContainer}>
            <p>Rating Agrupación</p>
          </div>
          <div className={styles.ratingWrapper}>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                  <FaStar
                    className={styles.star}
                    size={40}
                    color={
                      currentRating <= rating ? '#ffc107' : '#D0D5DD'
                    }
                    key={index}
                  />
              );
            })}
          </div>
        </div>
        {feedbacksList && (
          <div className={styles.contenedorComentario}>
            {user && isAMember && (
              <div className={styles.boton} onClick={() => navigate('/feedbacks')}>
                <IoMdAdd color='#667085' />
                <p>Agregar comentario</p>
              </div>
            )}
            
            <div className={styles.commentsList}>
              {feedbacksList?.map((feedback, index) => (
                <Comment key={index} feedback={feedback}/>
              ))}
            </div>
          </div> 
        )}
      </div>
    );
  }else{
    return(
      <p style={{textAlign: 'center', fontStyle: 'italic', color: 'gray', paddingBottom: '40px'}}>No feedback</p>
    )
  }
};

export default Feedbacks;
