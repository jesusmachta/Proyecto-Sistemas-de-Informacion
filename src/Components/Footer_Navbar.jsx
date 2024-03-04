import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

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
