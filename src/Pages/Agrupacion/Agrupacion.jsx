import React, { useEffect, useState } from "react";
import "./Agrupacion.css";
import BannerAgrupacion from "../../Components/BannerAgrupacion/BannerAgrupacion";
import { useParams } from "react-router-dom";
import CarouselAgrupacion from "../../Components/CarouselAgrupacion/CarouselAgrupacion";
import DropdownInfo from "../../Components/DropdownInfo/DropdownInfo";
import { getAgrupacionById } from "../../controllers/Agrupaciones";
import Feedbacks from "../../Components/Feedbacks/Feedbacks";
import Navbar from '../../Components/Navbar';
import { useUser } from "../../context/user";
import {addSubscriptionFunction} from '../../controllers/agregarAfiliacion'; 
import { getStudentById } from "../../controllers/updateUser";
import { geFeedbacksByAgrupacion } from "../../controllers/feedbacks";

function Agrupacion() {
  const [agrupacion, setAgrupacion] = useState(null);
  const [isUserAMember, setIsUserAMember] = useState(false);
  const [submittedAfiliacion, setSubmittedAfiliacion] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);
  const [avgRating, setAvgRating] = useState(null);

  let { id } = useParams();
  const userL = useUser();

  useEffect(() => {
    if (id) {
      const buscarId = async () => {
        const currentAgrup = await getAgrupacionById(id);
        if (currentAgrup) {
          setAgrupacion(currentAgrup);
        }
      };
      buscarId();
    }
  }, []);

  const handleSetAvgFeedbacks = (feedbacksList) => {
    var avg = 0
    if(feedbacksList?.length > 0){

      feedbacksList.map((feedback) => {
        avg += feedback.rating
      })
  
      avg = avg / feedbacksList.length
      setAvgRating(avg)
    }else{
      setAvgRating(null)
    }
  }

  useEffect(() => {
    if(agrupacion){
      const handleGetFeedback = async () => {
        const feedbacksList = await geFeedbacksByAgrupacion(agrupacion.name)
        if(feedbacksList){
          setFeedbacks(feedbacksList)
          handleSetAvgFeedbacks(feedbacksList)
        }
      }

      handleGetFeedback()
    }
  }, [agrupacion])
  

  const handleJoinClick = async()=>{
    const submitted = await addSubscriptionFunction(userL.uid, agrupacion.name, id);

    if (submitted) {
      setSubmittedAfiliacion(true)
    }else{
      setSubmittedAfiliacion(false)
    }
  }; 

  useEffect(() => {
    const checkMembership = async () => {
      const student = await getStudentById(userL.uid);
      const isMember = student.afiliaciones.some(afiliacion => afiliacion.nombre === agrupacion.name);
      setIsUserAMember(isMember);
    };
  
    if (userL && agrupacion) {
      checkMembership();
    }
  }, [agrupacion, userL]);

  return (
    agrupacion && (
      <div>
        <Navbar></Navbar>
        <div className="space"></div>
      <div className="agrupacion__container">
        <BannerAgrupacion
          title={agrupacion?.name}
          imgSrc={agrupacion?.ImgSrc}
        />
        <div className="description__wrapper">
          <p>{agrupacion?.description}</p>
        </div>
        <CarouselAgrupacion imgsList={agrupacion?.ImgExtras} />
        <div className="btns_list">
          <DropdownInfo title="Mision" info={agrupacion?.mision} />
          <DropdownInfo title="Vision" info={agrupacion?.vision} />
          <DropdownInfo
            title="Integrantes"
            info={agrupacion?.members}
            isList={true}
          />
        </div>
        <div className="buttonUnirseWrapper">
          {userL && !isUserAMember && !submittedAfiliacion && <button className="buttonUnirse" onClick={handleJoinClick}> Unirse a Agrupación </button>}
        </div>

        {userL && <Feedbacks isAMember={isUserAMember} rating={avgRating} feedbacksList={feedbacks}/>}
      </div>
      </div>
      
    )
  );
}

export default Agrupacion;
