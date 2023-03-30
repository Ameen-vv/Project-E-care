import React, { useState, useEffect, useContext } from 'react'
import './SignUpForm.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userUrl, doctorUrl } from '../../../apiLinks/apiLinks'
import { toast, Toaster } from 'react-hot-toast'
import { userContext } from '../../store/Contexts'


const SignUpForm = () => {
    const Navigate = useNavigate()
    const [signUpForm, setSignUpForm] = useState('client')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState()
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [doctorFullname, setDoctorFullName] = useState('')
    const [doctorEmail, setDoctorEmail] = useState('')
    const [doctorPhone, setDoctorPhone] = useState('')
    const [doctorDateOfBirth, setDoctorDateOfBirth] = useState('')
    const [doctorQualification, setDoctorQualification] = useState('')
    const [doctorAddress, setDoctorAddress] = useState('')
    const [doctorHospital, setDoctorHospital] = useState('')
    const [doctorPassword, setDoctorPassword] = useState('')
    const [doctorDepartment, setDoctorDepartment] = useState('')
    const [doctorConfirmPass, setDoctorConfirmPass] = useState('')
    const [otp, setOtp] = useState('')
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [loading, setLoading] = useState(false)
    const [departmentDetails, setDepartmentDetails] = useState([])
    const {user,setUser} = useContext(userContext)

    useEffect(()=>{
        userCheck()
    },[])
   
    useEffect(() => {
        if (signUpForm === 'otp' || signUpForm === 'doctor-otp') {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                    } else {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    }
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [seconds, signUpForm])


    useEffect(() => {
        if (signUpForm === 'doctor') {
            setLoading(true)
            axios.get(`${doctorUrl}getDepartments`).then((response) => {
                response.status === 200 && setDepartmentDetails(response.data)
            }).catch(() => {
                toast.error('some unexpected errors please try after some time')
            }).finally(() => setLoading(false))
        }
    }, [signUpForm])

    const userCheck = ()=>{
        user === 'user' ? Navigate('/') : (user === 'doctor' ? Navigate('/doctor/profile') : Navigate('/signUp') )
   }

    const userData = {
        fullName,
        phone,
        email,
        dateOfBirth,
        password
    }

    const doctorData = {

        fullName: doctorFullname,
        email: doctorEmail,
        phone: doctorPhone,
        dateOfBirth: doctorDateOfBirth,
        qualification: doctorQualification,
        address: doctorAddress,
        hospital: doctorHospital,
        password: doctorPassword,
        department: doctorDepartment

    }

    const sentOtp = (e) => {
        e.preventDefault()
        if (password === confirmPass) {
            setLoading(true)
            axios.post(`${userUrl}getOtp`, userData).then((response) => {
                response.data.userExist ? toast.error('User Already Exist') : setSignUpForm('otp')
            }).catch((err) => {
                toast.error('some unexpected errors please try after some time')
            }).finally(() => setLoading(false))
        } else {
            toast.error("Passwords doesnt match")
        }
    }

    const verifyOtpAndSignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${userUrl}signUp`, { userData, otp }).then((response) => {
            response.data.status ? Navigate('/signIn') : toast.error('Incorrect otp')
        }).catch(() => {
            toast.error('some unexpected errors please try after some time')
        }).finally(() => setLoading(false))
    }

    const resendOtp = () => {
        setMinutes(0)
        setSeconds(30)
        axios.post(`${userUrl}resendOtp`, { email }).then((response) => {
            response.data.status && toast.success('otp has sent to email')
        })
    }

    const doctorSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        let imageData
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {          
            imageData = reader.result
            axios.post(`${doctorUrl}signUp`, { doctorData, otp, imageData }).then((response) => {                
                response.data.signUp ? Navigate('/signIn') : toast.error('Invalid otp')
            }).catch(()=>{
                toast.error('some unexpected errors please try after some time')
            }).finally(() => setLoading(false))
        }

    }

    const doctorOtp = (e) => {
        e.preventDefault()
        if (doctorConfirmPass === doctorPassword) {
            setLoading(true)
            axios.post(`${doctorUrl}getOtp`, { doctorEmail }).then((response) => {
                !response.data.userExist ? setSignUpForm('doctor-otp') : toast.error("Email Already Exists")
            }).catch(()=>{
                toast.error('some unexpected errors please try after some time')
            }).finally(() => setLoading(false))
        } else {
            toast.error("Passwords doesnt match")
        }
    }

    const resendOtpForDr = () => {
        setMinutes(0)
        setSeconds(30)
        axios.post(`${doctorUrl}resendOtp`, { doctorEmail }).then((response) => {
            response.data.otpSent && toast.success('Otp has sent to email')
        }).catch(()=>{
            toast.error('some unexpected errors please try after some time')
        })
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <Toaster />
            {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>} <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('/images/Banner.jpg')" }}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Get your account now.
                        </h1>

                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                        </p>

                        <div className={`mt-6 ${signUpForm === 'otp' && 'hide-acount-type'} ${signUpForm === 'doctor-otp' && 'hidden'}`}>
                            <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button className={`flex justify-center w-full px-6 py-3  ${signUpForm === 'client' ? "sign-up" : "border border-blue-500 text text-blue-300"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={() => setSignUpForm('client')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">
                                        Client
                                    </span>
                                </button>

                                <button className={`flex justify-center w-full px-6 py-3   ${signUpForm === 'doctor' ? 'sign-up' : "border border-blue-500 text-blue-300"} worker rounded-md md:mt-0 md:w-auto md:mx-2   focus:outline-none`} onClick={() => setSignUpForm('doctor')} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        Doctor
                                    </span>
                                </button>
                            </div>
                        </div>
                        {
                            signUpForm === 'client' && <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={sentOtp}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Full Name</label>
                                    <input type="text" placeholder="John" onChange={(e) => setFullName(e.target.value)} required className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Phone number</label>
                                    <input type="text" placeholder="XXX-XX-XXXX-XXX" onChange={(e) => setPhone(e.target.value)} required className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} required className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">DOB</label>
                                    <input type="date" max="2003-12-31" onChange={(e) => setDateOfBirth(e.target.value)} required className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">Confirm password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => {
                                        setConfirmPass(e.target.value)
                                    }} required className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <button
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    <span>Sign Up </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        }
                        {
                            signUpForm === 'doctor' && <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={doctorOtp}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Full Name</label>
                                    <input type="text" placeholder="Doctor" required onChange={(e) => setDoctorFullName(e.target.value)} className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Phone number</label>
                                    <input type="text" placeholder="XXX-XX-XXXX-XXX" required onChange={(e) => setDoctorPhone(e.target.value)} className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" required onChange={(e) => setDoctorEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">DOB</label>
                                    <input type="date" max="2000-12-31" required onChange={(e) => setDoctorDateOfBirth(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Qualification</label>
                                    <input type="text" required placeholder="MBBS,MD, etc" onChange={(e) => setDoctorQualification(e.target.value)} className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Department</label>
                                    <select onChange={(e) => setDoctorDepartment(e.target.value)} required className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                                        <option value="">Select department</option>
                                        {
                                            departmentDetails.map((department) => {
                                                return <option value={department._id} key={department._id}>{department.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Address</label>
                                    <input type="text" placeholder="Address" onChange={(e) => setDoctorAddress(e.target.value)} className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Hospital</label>
                                    <input type="text" placeholder="MBBS,MD, etc" onChange={(e) => setDoctorHospital(e.target.value)} className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Upload Certificates</label>
                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="MBBS,MD, etc" className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" accept="image/*"/>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setDoctorPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400 ">Confirm password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setDoctorConfirmPass(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <button
                                    className="flex items-center justify-between w-full px-6 py-3 h-3/4 mt-4 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" >
                                    <span>Sign Up </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        }
                        {
                            signUpForm === 'otp' && <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={verifyOtpAndSignUp}>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Otp</label>
                                    <input type="text" required placeholder="XXX-XXX" className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setOtp(e.target.value)} />
                                </div>

                                <button
                                    className="flex items-center justify-between w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" >
                                    <span>Verify Otp </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className='w-full justify-center'>
                                    {seconds > 0 || minutes > 0 ? (
                                        <p className='text-danger'>
                                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <p className='text-primary text-sm' onClick={resendOtp} style={{ cursor: 'pointer' }}>Resend Otp</p>
                                    )}
                                </div>
                            </form>
                        }
                        {
                            signUpForm === 'doctor-otp' && <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={doctorSignUp}>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-400">Otp</label>
                                    <input type="text" required placeholder="XXX-XXX" className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setOtp(e.target.value)} />
                                </div>

                                <button
                                    className="flex items-center justify-between w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" >
                                    <span>Verify Otp </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className='w-full justify-center'>
                                    {seconds > 0 || minutes > 0 ? (
                                        <p className='text-danger'>
                                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <p className='text-primary' onClick={resendOtpForDr} style={{ cursor: 'pointer' }}>Resend Otp</p>
                                    )}
                                </div>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm
