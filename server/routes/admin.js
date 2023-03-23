import express from 'express'
import { addDepartment,adminCheck,adminLogin, approveDoctor,blockDoctor, blockUser, editDepartment, getDashboardDetails, getDepartments, getDoctor,
         getNewDoctors, getSales, getUsers , listDepartment, rejectDoctor, unBlockDoctor, unBlockUser, unlistDepartment} from '../controllers/adminController.js'
import { adminAuthentication } from '../middlewares/Authentications.js'
const router = express.Router()



router.post('/logIn',adminLogin)
router.get('/getUsers',adminAuthentication,getUsers)
router.get('/blockUser/:id',adminAuthentication,blockUser)
router.get('/unBlockUser/:id',adminAuthentication,unBlockUser)
router.get('/getDoctorList',adminAuthentication,getDoctor)
router.get('/blockDoctor/:id',adminAuthentication,blockDoctor)
router.get('/unBlockDoctor/:id',adminAuthentication,unBlockDoctor)
router.get('/getNewDoctors',adminAuthentication,getNewDoctors)
router.get('/approve/:id',adminAuthentication,approveDoctor)
router.post('/reject',adminAuthentication,rejectDoctor)
router.post('/addDepartment',adminAuthentication,addDepartment)
router.get('/departments',adminAuthentication,getDepartments)
router.get('/unListDepartment/:id',adminAuthentication,unlistDepartment)
router.get('/listDepartment/:id',adminAuthentication,listDepartment)
router.get('/authenticate',adminAuthentication,adminCheck)
router.post('/editDepartment/:id',adminAuthentication,editDepartment)
router.get('/getDashboardDetails',adminAuthentication,getDashboardDetails)
router.get('/getSales',adminAuthentication,getSales)


export default router