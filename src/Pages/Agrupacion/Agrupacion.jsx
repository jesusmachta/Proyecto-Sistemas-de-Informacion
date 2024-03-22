import React, { useEffect, useState } from "react";
import "./Agrupacion.css";
import BannerAgrupacion from "../../Components/BannerAgrupacion/BannerAgrupacion";
import { useParams } from "react-router-dom";
import CarouselAgrupacion from "../../Components/CarouselAgrupacion/CarouselAgrupacion";

function Agrupacion() {
  const [agrupName, setAgrupName] = useState("");
  const [agrupImgSrc, setAgrupImgSrc] = useState("");
  const [description, setDescription] = useState("");
  const [mision, setMision] = useState("");
  const [vision, setVision] = useState("");
  const [imgsList, setImgsList] = useState([]);

  const ejemplosImgs = [
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
    "https://mmedia.eluniversal.com/18127/prototipo-unimet-31284.jpg",
  ];

  let { id } = useParams();

  useEffect(() => {
    if (id === "1") {
      // BUSCAR ID EN LA BD

      // Set valores de la bd
      setAgrupName("Formula Sae");
      setAgrupImgSrc(
        "https://meditron.com.ve/home/wp-content/uploads/2023/03/meditron_sae.jpg"
      );
      setDescription(
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro itaque repellendus voluptatibus modi ipsam atque rerum temporibus molestias doloremque non?"
      );
    }
  }, []);

  return (
    <div className="agrupacion__container">
      <BannerAgrupacion title={agrupName} imgSrc={agrupImgSrc} />
      <div className="description__wrapper">
        <p>{description}</p>
      </div>
      <CarouselAgrupacion imgsList={ejemplosImgs}/>
    </div>
  );
}

export default Agrupacion;
