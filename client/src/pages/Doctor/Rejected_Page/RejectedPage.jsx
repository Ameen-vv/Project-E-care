import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaRegClock } from "react-icons/fa"; // import clock icon from react-icons/fa
import {  useNavigate,useLocation } from 'react-router-dom';
import { doctorUrl } from '../../../../apiLinks/apiLinks';
import ErrorPage from '../../../components/ErrorPage/ErrorPage';

function RejectedPage() {
   const Navigate = useNavigate()
   const location = useLocation()
   const [reason,setReason] = useState('')
   useEffect(()=>{
        axios.get(`${doctorUrl}rejectedUser/${location.state.id}`).then((response)=>{
            response.status === 200 && setReason(response.data.details)          
        }).catch(()=>toast.error('internal error please try after sometime'))
   },[])
   const resendApplication = ()=>{
    axios.get(`${doctorUrl}resendForm/${location.state.id}`).then((response)=>{
        response.status === 200 && (response.data.status ? Navigate('/doctor/verification') : toast.error('cannot resend please try after sometime'))
    }).catch(()=>toast.error('internal error please try after sometime'))
   } 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Toaster/>
       <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center space-y-6">
        <div className="text-5xl text-blue-500">
          <FaRegClock />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Sorry,you profile has been rejected
        </h1>
        <p className="text-lg text-center">
        You can resend the application we will verify your profile again
        </p>
        <p className="text-lg text-center">
          the reason for your rejection is {reason}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={resendApplication}
        >
          Resend the application
        </button>
      </div>
    </div>
  )
}

export default RejectedPage
