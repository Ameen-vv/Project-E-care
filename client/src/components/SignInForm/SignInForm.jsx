import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignInForm.css'
import axios from 'axios'
import { userUrl, doctorUrl } from '../../../apiLinks/apiLinks'
import { firebaseContext, userContext } from '../../store/Contexts'
import { toast, Toaster } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc";


const SignInForm = () => {
    const {user,setUser} = useContext(userContext)
    const Navigate = useNavigate()
    const [signInForm, setSignInForm] = useState('client')
    const { signInWithGoogle } = useContext(firebaseContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [doctorEmail, setDoctorEmail] = useState('')
    const [doctorPass, setDoctorPass] = useState('')
    const [reject, setReject] = useState(false)
    const [otp, setOtp] = useState('')
    const [loading,setLoading] = useState(false)
    const userCheck = ()=>{
        user === 'user' ? Navigate('/') : (user === 'doctor' ? Navigate('/') : Navigate('/signIn') )
   }
   useEffect(() => {
       userCheck()
    }, [])

    let userData = {
        email,
        password
    }
    let doctorData = {
        email: doctorEmail,
        password: doctorPass
    }
    const userSignIN = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${userUrl}signIn`, userData).then((response) => {
            if (response.data.logIn) {                
                localStorage.setItem('userToken',response.data?.token)
                setUser('user')
                Navigate('/')
            }
            response.data.incPass && toast.error('Invalid password')
            response.data.block  &&  toast.error('Your acount is blocked')
            response.data.noUser && toast.error('No user in this email please sign up')
        }).catch(()=>{
            toast.error('some unexpected errors please try after some time')
        }).finally(()=>{
            setLoading(false)
        })

    }
    const doctorSignIn = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${doctorUrl}signIn`, doctorData).then((response) => {
            if(response.data.status === 'success'){
                localStorage.setItem('doctorToken',response.data.token)
                setUser('doctor')
                Navigate('/doctor/profile')
            }
            response.data.status === 'pending' && Navigate('/doctor/verification')
            response.data.status === 'rejected' && Navigate('/doctor/rejected',{state:{id:response.data.id}})
            response.data.status === 'error' &&  toast.error('invalid password')
            response.data.status === 'noUser' && toast.error('no user with this email')
            response.data.status === 'block' && toast.error('Your acount is blocked')
        }).catch(()=>{
            toast.error('some unexpected errors please try after some time')
        }).finally(()=>setLoading(false))

    }
    const forgotPass = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${userUrl}forgotPass`, { email }).then((response) => {
            response.data.otpSent ? setSignInForm('reset-pass') : (response.data.userErr ? toast.error('invalid email') :
             toast.error('sending otp failed'))             
        }).catch(()=>{
            toast.error('some unexpected errors please try after some time')
        }).finally(()=>setLoading(false))

    }
    const resetPass = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${userUrl}resetPass`, { otp, email, password }).then((response) => {
            response.data.reset ? setSignInForm('client') : toast.error('invalid otp')
        }).catch(()=>{
            toast.error('some unexpected errors please try after some time')
        }).finally(()=>setLoading(false))
    }
    const googleLogin = () => {
        signInWithGoogle().then((result) => {
            setLoading(true)
            axios.post(`${userUrl}googleUserDetails`, result.user).then((response) => {
                if (response.data.logIn) {
                    localStorage.setItem('userToken',response.data.token)
                    setUser('user')
                    Navigate('/')
                }
                response.data.block && toast.error('your acount is blocked')
            }).catch((err)=>{
                toast.error('some unexpected errors please try after some time')
            }).finally(()=>setLoading(false))
        })
    }
    const doctorNavigate = ()=>{
        
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <Toaster/>
            {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div> }
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('/images/Banner2.jpg')" }}>
                </div>

                <div className="flex items-start w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">


                        <h3 className="mt-3 text-gray-500 dark:text-gray-400">
                            Welcome Back
                        </h3>

                        <div className={`mt-6 ${signInForm === 'forgot-pass' && 'hidden'} ${signInForm === 'reset-pass' && 'hidden'} `}>
                            <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button className={`flex justify-center w-full px-6 py-3  ${signInForm === 'client' ? "sign-up" : "border border-blue-500 text text-blue-300"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={() => setSignInForm('client')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">
                                        client
                                    </span>
                                </button>

                                <button className={`flex justify-center w-full px-6 py-3  ${signInForm === 'doctor' ? "sign-up" : "border border-blue-500 text text-blue-300"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={() => setSignInForm('doctor')}>
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
                            signInForm === 'client' && <> <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={userSignIN}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block  text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    <p className='text-textBlue cursor-pointer text-sm mb-1' onClick={() => setSignInForm('forgot-pass')}>forgot password ?</p>
                                </div>
                                
                                <button
                                    className="flex sign-in items-center justify-between w-full md:w-3/4 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Sign In </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                               </form>
                               
                               <hr className='mt-3 w-full md:w-3/4' />
                                <button
                                    onClick={googleLogin}
                                    className="mt-3 mb-3 flex items-center justify-center  w-full md:w-3/4 px-6 py-3 text-sm font-medium text-gray-800 transition-colors duration-300 transform  border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none   focus:ring-blue-500"
                                >
                                    <FcGoogle className='h-5 w-5 me-2'/>
                                    <span>Sign in with Google</span>
                                </button>
                                <p className='text-textBlue cursor-pointer text-sm mb-1' onClick={()=>Navigate('/signUp')}>Don't have an acount ? <a className='text-primary'>Register</a></p>
                            </>
                        }
                        {
                            signInForm === 'doctor' &&
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={doctorSignIn}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="doctor@example.com" onChange={(e) => setDoctorEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    
                                    
                                    {reject &&
                                        <p className='text-danger'>Sorry, your profile is rejected</p>}

                                </div>


                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setDoctorPass(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>



                                <button
                                    className="flex sign-in items-center justify-between w-full md:w-3/4 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Sign In </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <p className='text-textBlue cursor-pointer text-sm mb-1' onClick={()=>Navigate('/signUp')}>Don't have an acount ? <a className='text-primary'>Register</a></p>
                            </form>
                            
                        }{
                            signInForm === 'forgot-pass' &&
                            <form className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-1 " onSubmit={forgotPass} >
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Get Otp </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                               

                            </form>
                        }
                        {signInForm === 'reset-pass' &&
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={resetPass}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Otp recieved in given email</label>
                                    <input type="text" placeholder="000-000" onChange={(e) => setOtp(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Type new Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Reset </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                              
                            </form>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignInForm
