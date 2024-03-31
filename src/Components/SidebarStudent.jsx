import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faPenToSquare, faUsers, faMoneyCheckDollar,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarStudent.module.css';
import { useUser } from '../context/user';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";


export default function SidebarStudent() {
   const nav = useNavigate();
  const userL = useUser(); 
    const logOut = () => {
        auth.signOut();
        nav("/signup");
       
      };

     
  return (
    <div className={styles.sidebar}>
      <ul>
      <NavLink
            to={userL? `/profile/${userL.uid}`: '/signup'}
            activeClassName={styles.activeLink}
            
        >
            <li>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faUser}
                ></FontAwesomeIcon>
            </li>
        </NavLink>

        <NavLink to={ userL? `/profile/afilliations/${userL.uid}`: '/signup'} activeClassName ={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUsers}
            ></FontAwesomeIcon>
          </li>
        </NavLink>

        <NavLink to = {userL? `/profile/formulario/${userL.uid}`: '/signup'} activeClassName ={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPenToSquare}
            ></FontAwesomeIcon>
          </li>

        </NavLink>
    
        <li>
          <FontAwesomeIcon
            className={styles.logout}
            icon={faArrowRightFromBracket}
            onClick={logOut}
          ></FontAwesomeIcon>
        </li>
      </ul>
    </div>
  );
}
