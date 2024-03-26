import React, { useEffect, useState } from "react";
import "./Agrupacion.css";
import BannerAgrupacion from "../../Components/BannerAgrupacion/BannerAgrupacion";
import { useParams } from "react-router-dom";
import CarouselAgrupacion from "../../Components/CarouselAgrupacion/CarouselAgrupacion";
import DropdownInfo from "../../Components/DropdownInfo/DropdownInfo";
import { getAgrupacionById } from "../../controllers/Agrupaciones";
import Feedbacks from "../Feedbacks/Feedbacks";

function Agrupacion() {
  const [agrupacion, setAgrupacion] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      const buscarId = async () => {
        const currentAgrup = await getAgrupacionById(id);
        console.log(currentAgrup);
        if (currentAgrup) {
          setAgrupacion(currentAgrup);
        }
      };
      buscarId();
    }
  }, []);

  return (
    agrupacion && (
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
          <button className="buttonUnirse"> Unirse a Agrupación </button>
        </div>

        <Feedbacks />
      </div>
    )
  );
}

export default Agrupacion;
