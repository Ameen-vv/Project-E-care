import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { doctorUrl } from '../../../../apiLinks/apiLinks'
import DoctorBanner from '../../../components/DoctorBanner/DoctorBanner'
import DoctorDetails from '../../../components/DoctorDetails/DoctorDetails'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'

function DoctorHome() {
  const token = localStorage.getItem('doctorToken')
  const headers = {Authorization:token}


  return (
    <div>
      <Header/>  
      <DoctorBanner/>
      <DoctorDetails/>
      <Footer/>
    </div>
  )
}

export default DoctorHome
