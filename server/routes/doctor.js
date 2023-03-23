import express from 'express'
import {  SignIn,doctorSignUp,doctorAuth, sendOtp, resendOtp, rejectedUser, resendApplication, 
          getDepartment, getDocDetails, editProfile, timeSlots, deleteSlot, editProfilePic, getAppointmentsDoctor, appointmentUnVisited, appointmentVisited, cancelAppointment, getDoctorDashboard } from '../controllers/doctorController.js'
import { doctorAuthentication } from '../middlewares/Authentications.js'
const router = express.Router()


router.post('/getOtp',sendOtp)
router.post('/signUp',doctorSignUp)
router.post('/signIn',SignIn)
router.post('/resendOtp',resendOtp)
router.get('/authenticate',doctorAuth)
router.get('/rejectedUser/:id',rejectedUser)
router.get('/resendForm/:id',resendApplication)
router.get('/getDepartments',getDepartment)
router.get('/getDocDetails',doctorAuthentication,getDocDetails)
router.post('/editProfile',doctorAuthentication,editProfile)
router.post('/editTime',doctorAuthentication,timeSlots)
router.post('/deleteSlot',doctorAuthentication,deleteSlot)
router.post('/editProfilePic',doctorAuthentication,editProfilePic)
router.get('/getAppointments',doctorAuthentication,getAppointmentsDoctor)
router.get('/visitedAppointment',doctorAuthentication,appointmentVisited)
router.get('/UnVisitedAppointment',doctorAuthentication,appointmentUnVisited)
router.get('/cancelAppointment',doctorAuthentication,cancelAppointment)
router.get('/getDashboardDetails',doctorAuthentication,getDoctorDashboard)


export default router