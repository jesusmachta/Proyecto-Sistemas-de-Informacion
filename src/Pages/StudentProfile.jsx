import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useUser } from "../context/user";
export default function studentProfile() {
    const userL = useUser(); 
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userLastName, setUserLastName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);

  return (
    <div>
      <Navbar></Navbar>
      <div className="nameContainer">
        <h1 className="profileName"></h1>
        <p className="profileEmail"></p>
      </div>
      <div className="containerInputs">
        <div className="inputs">
            <h1>Nombre</h1>
            <input type="text" placeholder={userName}></input>
            <h1>Apellido</h1>
            <input type = "text" placeholder={userLastName}></input>
        </div>
        <div className = "inputs"> 
            <h1>Teléfono</h1>
            <input type="tel" placeholder={userPhone}></input>
            <h1>Correo electrónico</h1>
            <input type="email" placeholder={userEmail} readOnly ={true}></input>
        </div>
        <div className="button">
            <button>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
