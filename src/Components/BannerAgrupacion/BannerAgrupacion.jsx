import React from 'react'
import './BannerAgrupacion.css'

function BannerAgrupacion({title, imgSrc}) {
  return (
    <div className='bannerAgrupacion__container'>
        <img src={imgSrc}/>
        <div className='bannerAgrupacion__title'>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default BannerAgrupacion