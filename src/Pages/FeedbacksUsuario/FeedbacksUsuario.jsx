import React, { useEffect, useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import styles from './FeedbacksUsuario.module.css';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { getAllAgrupaciones } from '../../controllers/Agrupaciones';
import { useUser } from '../../context/user';
import { createFeedback, getUserFeedbacks } from '../../controllers/feedbacks';
import { getStudentById } from '../../controllers/updateUser';

function FeedbacksUsuario() {
  const [data, setData] = useState([]);
  const [myFeedBacks, setMyFeedbacks] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [feedbackInput, setFeedBackInput] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();

  var disabled = false;

  const handleSelectData = (event) => {
    const selectedId = event.target.value;
    setSelectedData(selectedId);
  };

  useEffect(() => {
    setLoading(true);
    if(user){
      const handleGetStudentAgrupaciones = async () => {
        const agrupacionesList = await getAllAgrupaciones();
  
        if (agrupacionesList) {
          const student = await getStudentById(user.uid);
          setStudentData(student)
          const myAgrupaciones = student.afiliaciones.map(afiliacion => {
            const found = agrupacionesList.find(agrupacion => agrupacion?.name === afiliacion?.nombre)
            if(found){
              return found
            }
          });
          setData(myAgrupaciones)
        }
      }
  
      const handleGetMyFeedbacks = async() => {
        const myFeedbacksList = await getUserFeedbacks(user.email)
  
        if(myFeedbacksList){
          setMyFeedbacks(myFeedbacksList)
        }
      }
  
      handleGetStudentAgrupaciones()
      handleGetMyFeedbacks();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedData) {
      if(myFeedBacks.length !== 0){
        const currentFeedback = myFeedBacks.find(feeedback => feeedback.agrupacion === selectedData)
        if(currentFeedback){
          setFeedBackInput(currentFeedback.content);
          setRating(currentFeedback.rating);
        }else{
          setFeedBackInput('');
          setRating(null);
          setHover(null);
        }
      }else{
        setFeedBackInput('');
        setRating(null);
        setHover(null);
      }
    }
  }, [selectedData]);

  const handleCreateFeedback = async () => {
    if (user) {
      const feedback = await createFeedback(
        feedbackInput,
        user.email,
        selectedData,
        rating
      );
      if (feedback) {
        alert('Feedback enviado con exito!');
      } else {
        alert('Error al enviar feedback, intente nuevamente.');
      }
    }
  };

  if(loading && !user && !studentData){
    return (
      <p>Loading...</p>
    )
  }else{
    return (
      <div className={styles.Contenedor}>
        <div className={styles.UsuarioHeader}>
          <IoPersonCircle size={70} />
          <div>
            <p className={styles.username}>{`${studentData?.name} ${studentData?.lastName}`}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className={styles.feedbacksWrapper}>
          <div className={styles.ParteIzquierda}>
            <p>Agrupaciones a las que perteneces:</p>
            <select
              className={styles.Agrupaciones}
              value={selectedData}
              onChange={handleSelectData}
              disabled={disabled}
            >
              <option disabled value=''>
                Agrupaciones
              </option>
              {data?.map((element, index) => (
                <option key={index} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.ParteDerecha}>
            <textarea
              className={styles.textArea}
              value={feedbackInput}
              id = "feedback"
              onChange={(e) => setFeedBackInput(e.target.value)}
            ></textarea>
            <div className={styles.Rating}>
              <button onClick={handleCreateFeedback}>
                Pulsa para valorar la agrupación
              </button>
              <div className={styles.Estrellas}>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1
                  return (
                    <label key={index}>
                      <input type='radio' name='rating' value={currentRating} onClick={() => setRating(currentRating)}/>
                      <FaStar className={styles.star} size={40} color={currentRating <= (hover || rating) ? '#ffc107' : '#D0D5DD'} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(null)}/>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default FeedbacksUsuario;
