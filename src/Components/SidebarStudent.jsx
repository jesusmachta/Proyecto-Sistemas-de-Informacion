import { Link , NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faMoneyCheckDollar,
  faUsers,
  faArrowRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./SidebarStudent.module.css";

export default function SidebarStudent() {
    const logOut = () => {
        auth.signOut();
        nav("/signup");
       
      };
  return (
    <div className={styles.sidebar}>
      <ul>
        <Link to="/profile/:userId">
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUser}
            ></FontAwesomeIcon>
          </li>
        </Link>

        <Link to="/profile/afilliations" >
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faUsers}
            ></FontAwesomeIcon>
          </li>
        </Link>

        <Link to = "/profile/formulario">
          <li>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faPenToSquare}
            ></FontAwesomeIcon>
          </li>

        </Link>
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
