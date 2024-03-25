import React, { useState } from 'react'
import "./DropdownInfo.css"
import { FaChevronDown } from "react-icons/fa";


function DropdownInfo({title, info, isList}) {

    const [show, setShow] = useState(false)

  return (
    <div className='dropdownInfo__container'>
        <div className='dropdownInfo__btn' onClick={() => setShow(!show)}>
            <p>{title}</p>
            <FaChevronDown size={20} color='#000'/>
        </div>
        {show && (
        <div className='dropdownInfo__content'>
            {!isList ? (
              <p>{info}</p>
            ):(
              <ul>
                {info.map((element,index)=>(
                  <li key={index}>
                    {element}
                  </li>     
                ))}
              </ul>
            )}
            
        </div>
        )}
    </div>
  )
}

export default DropdownInfo