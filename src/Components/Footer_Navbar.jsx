import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from './Footer_Navbar.module.css'

const Footer_Navbar = () => {
  return (
    <div className='conteiner'>
      <Navbar/>
      <Outlet/>
      <Footer/>

      
    </div>
  )
}

export default Footer_Navbar
