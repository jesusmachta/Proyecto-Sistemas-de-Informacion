import styles from './Navbar.module.css'
import logo from '../../public/Logo.png'
import lupa from "../../Icons/search_black_36dp.svg"
import user from "../../Icons/account_circle_black_24dp.svg"
import { Link,useLocation } from'react-router-dom'
import { useUser } from '../context/user'
import {collection, query, where, getDocs, getDoc, doc} from 'firebase/firestore'
import { useState, useEffect } from 'react'; 
import { db } from '../firebase'; 


const Navbar = () => {
  const location = useLocation(); 
  const userL = useUser(); 
  const [userRole, setUserRole] = useState(null);

  useEffect(()=>{
    const findUserRole = async()=>{
      const studentDoc = await getDoc(doc(db, 'Students', userL.uid));
      const adminQuery = query(collection(db, 'Administrator'), where("email", '==', userL.email));
      const adminSnapshot = await getDocs(adminQuery);

      if(studentDoc.exists()){
        setUserRole('student');
      }else if(!adminSnapshot.empty){
        setUserRole('admin');
      }
    }; 
    if(userL){
      findUserRole();
    }
  },[userL]); 

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo_conectaUnimet" />
      </div>

      <div className={styles.navbar}>
        <nav className={styles.list}>
          <Link
            className={`${styles.link} ${
              location.pathname === "/" ? styles.ubi : ""
            }`}
            to="/"
          >
            Inicio
          </Link>
          <Link
            className={`${styles.link} ${
              location.pathname === "/agrupaciones" ? styles.ubi : ""
            }`}
            to="/agrupaciones"
          >
            Agrupaciones
          </Link>
          <Link
            className={`${styles.link} ${
              location.pathname === "/feedbacks" ? styles.ubi : ""
            }`}
            to="/feedbacks"
          >
            Feedbacks
          </Link>
        </nav>
      <div className={styles.icons}>
        <img className={styles.icon} src={lupa} alt="lupa" />
        <Link to={userL ? (userRole === 'admin' ? `/adminprofile` : `/profile/${userL.uid}`) : '/loginadmin'}>
          <img className={styles.icon} src={user} alt="user" />
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
// /adminprofile