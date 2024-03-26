import Navbar from "../Components/Navbar";
import {useEffect, useRef, useState} from "react";
import {useUser} from "../context/user";
import {collection, where, query, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {ref, uploadBytes, getStorage, getDownloadURL} from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Afiliaciones(){
    const navigation = useNavigate();
    const userL = useUser();
    const [userEmail, setUserEmail] = useState(null); 
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [agrupaciones, setAgrupaciones] = useState([]); 
    const [image, setImage] = useState(null); 

    useEffect(()=>{
        if(userL){
            setUserEmail(userL.email); 
        }
        const findUser = async ()=>{
            try{
                const querySnapshot = await getDocs(
                    query(collection(db, "Students"), where("email", "==", userL.email))
                );
                querySnapshot.forEach((doc)=>{
                    setUserId(doc.id); 
                    setUserName(doc.data().name); 
                    setAgrupaciones(doc.data().agrupaciones); 
                    console.log(agrupaciones);
                    setDataLoaded(true); 
                    setIsLoading(false); 
                });
            }catch(error){
                console.log("Error getting documents: ", error);
            }
            if(userId){
                const storageRef = ref(storage, `profilePictures/${userId}`);
                try{
                  const url = await getDownloadURL(storageRef);
                  setImage(url); 
                }
                catch(error){
                  console.log(error); 
                }
              }

        };
        findUser(); 


    },[navigation, userL, userId, userEmail, userName, agrupaciones, image, dataLoaded, isLoading]);
    if(isLoading){
        return <div>Loading...</div>
    }
    if(dataLoaded){
        return(
            <div>
                <Navbar/>
                <div className="nameContainer">
                    <div className="profilePic"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                    </div>
                    <div> 
                        <h1 className="profileName">{userName}</h1>
                        <p className="profileMail">{userEmail}</p>
                    </div>
                </div>
                {!agrupaciones ? (
              <div>
                <p>Todavía no estás afiliado a ninguna agrupación.</p>
                <button onClick={() => navigation('/ruta-a-agrupaciones')}>Ver agrupaciones</button>
              </div>
            ) : (
                <div>Aqui va la tabla</div>  )}   
    
                
            </div>
        ); 
    }
    
}