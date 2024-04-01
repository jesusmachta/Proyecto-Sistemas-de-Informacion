import { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faMoneyCheckDollar,
  faArrowRightFromBracket,
  faXmark,
  faPlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarAdmin.module.css";

export default function SidebarAdmin() {
  const logOut = () => {
    auth.signOut();
    nav("/signup");
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <NavLink to="/adminprofile" activeClassName={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUser}
            ></FontAwesomeIcon>
          </li>
        </NavLink>

        <NavLink to="/deletegroup" activeClassName={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faXmark}
            ></FontAwesomeIcon>
          </li>
        </NavLink>

        <NavLink to="/registergroup" activeClassName={styles.activeLink}>
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPlus}
            ></FontAwesomeIcon>
          </li>
        </NavLink>

        <NavLink to="/updategroup" activeClassName={styles.activeLink}>
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
