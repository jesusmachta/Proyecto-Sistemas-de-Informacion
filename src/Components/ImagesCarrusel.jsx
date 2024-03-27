import { useState, useEffect } from "react";
import styles from "./ImagesCarrusel.module.css";
import { db, storage } from "../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage"; 
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImagesCarrusel = () => {
    const [images, setImages] = useState([]);
    const [imageData, setImageData] = useState([]);
    const imageListRef = ref(storage, 'Carrusel/');

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const response = await listAll(imageListRef);
                const downloadURLPromises = response.items.map((item) => getDownloadURL(item));
                const urls = await Promise.all(downloadURLPromises); //aca obtengo las url de las imagenes en el storage 
                setImages(urls);
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
            }
        };

        fetchImageURLs();
    }, []);


    useEffect(() => {
        const fetchImageData = async () => {
            if (images.length === 0) return;
            try {
                const imageDataPromises = images.map(async (imageUrl) => {
                    const q = query(collection(db, 'Agrupaciones'), where('urlimagen', '==', imageUrl));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map((doc) => doc.data()); // Verificamos qué datos se están obteniendo
                    return { imageUrl, data };
                });
                const imageData = await Promise.all(imageDataPromises);
                setImageData(imageData);
            } catch (error) {
                console.error('Error al obtener la información:', error);
            }
        };
    
        fetchImageData();
    }, [images]);
    
    const settings = {
        arrows:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    
    return (

        <Slider {...settings} className={styles.container}>
        {images.map((image, index) => {
            const imageDataForImage = imageData.find((item) => item.imageUrl === image);
            const description = imageDataForImage ? imageDataForImage.data[0]?.description : "";
            const name = imageDataForImage ? imageDataForImage.data[0]?.name : "";
            return (
                <div className={`${styles.imageContainer} slide`} key={index}>
                    <div className={styles.aver}>
                        <img src={image} alt="imagen de carrusel" className={styles.images} />
                        <div className={styles.textContainer}>
                            {name && <h2>{name}</h2>}
                            {description && <p>{description}</p>}
                        </div>
                    </div>
                    
                </div>
            );
        })}
      </Slider>
    );
};

export default ImagesCarrusel;

