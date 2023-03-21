import express from 'express'
const router = express.Router()
import {bookAppoinment, forgotPassOtp, getDepartment, getDoctors, initializePayment, resendOtp, resetPass, saveGoogleUser, sendOtp, signIn, userCheck, verifyOtpAndSignUp, verifyPayment} from '../controllers/userControllers.js'
      
import { userAuthentication } from '../middlewares/Authentications.js'

router.post('/getOtp',sendOtp)
router.post('/signUp',verifyOtpAndSignUp)
router.post('/signIn',signIn)
router.get('/authenticate',userCheck)
router.post('/resendOtp',resendOtp)
router.post('/forgotPass',forgotPassOtp)
router.post('/resetPass',resetPass)
router.post('/googleUserDetails',saveGoogleUser)
router.get('/getDepartments/',getDepartment)
router.get('/getDoctors',getDoctors)
router.post('/bookAppoinment',userAuthentication,bookAppoinment)
router.get('/initializePayment',userAuthentication,initializePayment)
router.post('/verifyPayment',userAuthentication,verifyPayment)


export default router