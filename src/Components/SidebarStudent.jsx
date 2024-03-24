import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faUserGraduate, faUserTie, faUserCog, faUserShield, faUserFriends, faUserPlus, faMoneyCheckDollar, faUsers, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';





export default function SidebarStudent() {

    return(
        <div className = 'sidebar'>
            <ul>
                <li><FontAwesomeIcon icon ={faUser}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon icon ={faUsers}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon icon ={faUserPlus}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon icon ={faMoneyCheckDollar}></FontAwesomeIcon></li>
                <li><FontAwesomeIcon icon ={faArrowRightFromBracket}></FontAwesomeIcon></li>
            </ul>
        </div>
    );
};