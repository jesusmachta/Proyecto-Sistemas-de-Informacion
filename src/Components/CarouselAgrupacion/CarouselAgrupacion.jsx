import React from "react";
import "./CarouselAgrupacion.css";

function CarouselAgrupacion({imgsList}) {
  return (
    <div className="carouselAgrupacion__container">
        {imgsList.map((imgSrc, index) => (
            <img key={index} src={imgSrc}/>
        ))}
    </div>
  );
}

export default CarouselAgrupacion;
