import userModel from "../model/userSchema.js";
import doctorModel from "../model/doctorSchema.js";
import adminModel from "../model/adminSchema.js";
import { generateToken } from "../jwtAuth/generateJwt.js";
import departmentModel from "../model/departmentModel.js";
import cloudinary from "../utils/cloudinary.js";
import { getAppointmentCountGraph, getUserCountGraph, titleCase } from './helpers/helpers.js'
import jwt from "jsonwebtoken"
import { response } from "express";
import appointmentModel from "../model/appointmentSchema.js";




export const getUsers = (req, res) => {
    try {
        userModel.find({}, { password: 0 }).then((users) => {
            res.status(200).json(users)
        })
    }
    catch (err) {
        res.status(500)
    }

}


export const blockUser = (req, res) => {
    try {
        const userId = req.params.id
        userModel.updateOne({ _id: userId }, { $set: { block: true } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const unBlockUser = (req, res) => {
    try {
        const userId = req.params.id
        userModel.updateOne({ _id: userId }, { $set: { block: false } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const getDoctor = (req, res) => {
    try {
        doctorModel.find({ verification: 'success' }, { password: 0 }).populate('department').then((doctors) => {
            res.status(200).json(doctors)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const blockDoctor = (req, res) => {
    try {
        const doctorId = req.params.id
        doctorModel.updateOne({ _id: doctorId }, { $set: { block: true } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const unBlockDoctor = (req, res) => {
    try {
        const doctorId = req.params.id
        doctorModel.updateOne({ _id: doctorId }, { $set: { block: false } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const getNewDoctors = (req, res) => {
    try {
        doctorModel.find({ verification: 'pending' }, { password: 0 }).then((doctors) => {
            res.status(200).json(doctors)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const approveDoctor = (req, res) => {
    try {
        let doctorId = req.params.id
        doctorModel.findOneAndUpdate({ _id: doctorId }, { $set: { verification: 'success' } }).then((doctor) => {
            departmentModel.updateOne({ _id: doctor.department }, { $push: { doctors: doctor._id } }).then((data) => {
                data.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
            })
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const rejectDoctor = (req, res) => {
    try {
        const doctorId = req.body.doctorId
        const reason = req.body.reject
        doctorModel.updateOne({ _id: doctorId }, { $set: { verification: 'rejected', rejectReason: reason } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const adminLogin = (req, res) => {
    try {
        let { email, password } = req.body
        let response = {}
        adminModel.findOne({ email: email }).then((result) => {
            if (result) {
                if (result.email === email && result.password === password) {
                    response.logIn = true
                    const token = generateToken({ adminId: result._id, email: email, type: 'admin' })
                    response.token = token
                    res.status(200).json(response)
                } else {
                    res.status(200).json(response)
                }
            } else {
                res.status(200).json(response)
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const addDepartment = async (req, res) => {
    try {
        const data = req.body.departmentData
        const image = req.body.imageData
        let response = {}
        let departmentName = await titleCase(data.department)
        departmentModel.findOne({ name: departmentName }).then((department) => {
            if (department) {
                response.status = 'exist'
                res.status(200).json(response)
            } else {
                cloudinary.uploader.upload(image, { upload_preset: 'Ecare' }).then(async (imageData) => {
                    let diseases = await data.diseases.split(',')
                    let newDepartment = new departmentModel({
                        name: departmentName,
                        commonDiseases: diseases,
                        description: data.description,
                        imageUrl: imageData.secure_url
                    })
                    newDepartment.save().then(() => {
                        response.status = 'success'
                        res.status(200).json(response)
                    })
                })
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const getDepartments = (req, res) => {
    try {
        departmentModel.find().then((deparments) => {
            res.status(200).json(deparments)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const unlistDepartment = (req, res) => {
    try {
        const departmentId = req.params.id
        departmentModel.updateOne({ _id: departmentId }, { $set: { list: false } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    } catch (err) {
        res.status(500)
    }
}


export const listDepartment = (req, res) => {
    try {
        const departmentId = req.params.id
        departmentModel.updateOne({ _id: departmentId }, { $set: { list: true } }).then((result) => {
            result.acknowledged ? res.status(200).json({ status: true }) : res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const adminCheck = (req, res) => {
    try {
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if (err) {
                res.status(401)
            } else {
                adminModel.findOne({ _id: result.adminId }).then((admin) => {
                    admin ? res.status(200).json({ status: true }) : res.status(401)
                })
            }
        })
    }
    catch (err) {
        res.status(500)
    }
}


export const editDepartment = async (req, res) => {
   try{
    const data = req.body.departmentDetails
    const image = req.body?.imageData
    const depId = req.params.id
    let departmentName = await titleCase(data.name)
    departmentModel.findOne({ name: departmentName }).then(async (department) => {
        if (department) {
            res.status(200).json({ status: 'exist' })
        } else {
            let diseases = await data.diseases.split(',')
            if (image) {
                cloudinary.uploader.upload(image, { upload_preset: 'Ecare' }).then((imageData) => {
                    departmentModel.updateOne({ _id: depId }, {
                        $set: {
                            name: departmentName,
                            commonDiseases: diseases,
                            description: data.description,
                            imageUrl: imageData.secure_url
                        }
                    }).then((result) => {
                        result.acknowledged ? res.status(200).json({ status: 'success' }) : res.status(200).json({ status: 'error' })

                    })
                })
            } else {

                departmentModel.updateOne({ _id: depId }, {
                    $set: {
                        name: departmentName,
                        commonDiseases: diseases,
                        description: data.description,
                    }
                }).then((result) => {
                    result.acknowledged ? res.status(200).json({ status: 'success' }) : res.status(200).json({ status: 'error' })


                })
            }

        }
    })
   }
   catch(err){
    res.status(500)
   }
}


export const getDashboardDetails = (req, res) => {
    try {
        let response = {}
        let userGraph = [{
            name:'Users',
        }]
        let appointmentGraph = [{
            name:'Appointments',
        }]
        getUserCountGraph().then(userCount => {
            userGraph[0].data = userCount
            response.userGraph = userGraph
            getAppointmentCountGraph().then(appointmentCount => {
                appointmentGraph[0].data = appointmentCount
                response.appointmentGraph = appointmentGraph
                userModel.count().then(count=>{
                    response.users = count
                    doctorModel.count().then(count=>{
                        response.doctors = count
                        appointmentModel.count().then(count=>{
                            response.appointments = count
                            res.status(200).json(response)
                        })
                    })
                })
            })

        })
    } catch (err) {
        res.status(500)
    }
}


export const getSales = (req,res)=>{
    try{
        appointmentModel.find().populate('patientId','fullName email _id').populate('doctorId','fullName ').sort({createdAt:1}).then((appointments)=>{
            res.status(200).json(appointments)
        })
    }
    catch(err){
        res.status(500)
    }
}