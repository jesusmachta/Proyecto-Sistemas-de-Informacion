import React, { useState } from 'react'
import "./DropdownInfo.css"
import { FaChevronDown } from "react-icons/fa";


function DropdownInfo({title, info}) {

    const [show, setShow] = useState(false)

  return (
    <div className='dropdownInfo__container'>
        <div className='dropdownInfo__btn' onClick={() => setShow(!show)}>
            <p>{title}</p>
            <FaChevronDown size={20} color='#000'/>
        </div>
        {show && (
        <div className='dropdownInfo__content'>
            <p>{info}</p>
        </div>
        )}
    </div>
  )
}

export default DropdownInfo