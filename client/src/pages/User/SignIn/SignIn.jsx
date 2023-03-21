import React ,{ useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import SignInForm from '../../../components/SignInForm/SignInForm'
import axios from 'axios'

function SIgnIn() {
  const Navigate = useNavigate()
  return (
    <div>
      <Header/>
      <SignInForm/>
      <Footer/>  
    </div>
  )
}

export default SIgnIn
