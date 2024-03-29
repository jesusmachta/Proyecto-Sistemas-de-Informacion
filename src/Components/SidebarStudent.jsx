import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarStudent.module.css';


export default function SidebarStudent() {
    const logOut = () => {
        auth.signOut();
        nav("/signup");
       
      };

     
  return (
    <div className={styles.sidebar}>
      <ul>
      <NavLink
            to="/profile/:userId"
            activeClassName={styles.activeLink}
            
        >
            <li>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faUser}
                ></FontAwesomeIcon>
            </li>
        </NavLink>

        <NavLink to="/profile/afilliations" activeClassName ={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUsers}
            ></FontAwesomeIcon>
          </li>
        </NavLink>

        <NavLink to = "/profile/formulario" activeClassName ={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPenToSquare}
            ></FontAwesomeIcon>
          </li>

        </NavLink>
        <li>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faMoneyCheckDollar}
          ></FontAwesomeIcon>
        </li>
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
