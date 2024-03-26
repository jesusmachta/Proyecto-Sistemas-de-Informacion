import { useState, useEffect } from "react";
import styles from "./ImagesCarrusel.module.css";
import { storage } from '../firebase';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImagesCarrusel = () => {

    const [images, setImages] = useState([]);
    const [imageData, setImageData] = useState([]);
    const imageListRef = ref(storage, 'Carrusel/');
    const db = getFirestore();

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const response = await listAll(imageListRef);
                const downloadURLPromises = response.items.map((item) => getDownloadURL(item));
                const urls = await Promise.all(downloadURLPromises);
                setImages(urls);
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
            }
        };

        fetchImageURLs();
    }, [imageListRef]);

    // useEffect(() => {
    //     const fetchImageData = async () => {
    //         if (images.length === 0) return;
    
    //         try {
    //             // Crear un array de URLs de imágenes para la consulta
    //             const imageUrls = images.map((imageUrl) => imageUrl);

    //             // Verificar si imageUrls es un array no vacío
    //             if (Array.isArray(imageUrls) && imageUrls.length > 0) {
    //                 // Realizar la consulta en Firestore con el operador 'in' y el array de URLs
    //                 const q = query(collection(db, 'Agrupaciones'), where('urlimagen', 'in', imageUrls));

    //                 const querySnapshot = await getDocs(q);
    
    //                 // Mapear los datos obtenidos de Firestore
    //                 const imageData = querySnapshot.docs.map((doc) => doc.data());
    
    //                 // Actualizar el estado con los datos obtenidos
    //                 setImageData(imageData);
    //             } else {
    //                 console.warn('El array de URLs de imágenes está vacío o no es válido.');
    //             }
    //         } catch (error) {
    //             console.error('Error al obtener la información:', error);
    //         }
    //     };
    
    //     fetchImageData();
    // }, [db, images]);

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
                <div className={`${styles.card} slide`} key={index}>
                    <img src={image} alt="imagen de carrusel" className={styles.images} />
                    <div className={styles.textContainer}>
                        {name && <h3>{name}</h3>}
                        {description && <p>{description}</p>}
                    </div>
                    
                </div>
            );
        })}
    </Slider>
    );
};

export default ImagesCarrusel;

