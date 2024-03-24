import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faUserPlus, faMoneyCheckDollar, faUsers, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

import styles from './SidebarStudent.module.css';



export default function SidebarStudent() {

    return(
        <div className = {styles.sidebar}>
            <ul>
                <li><FontAwesomeIcon className = {styles.icon}icon ={faUser}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon className = {styles.icon} icon ={faUsers}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon className = {styles.icon} icon ={faUserPlus}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon className = {styles.icon} icon ={faMoneyCheckDollar}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon className = {styles.logout} icon ={faArrowRightFromBracket}></FontAwesomeIcon></li>
            </ul>
        </div>
    );
};