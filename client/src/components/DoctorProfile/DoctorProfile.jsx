import { useState, useEffect, useRef } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PhotographIcon, PencilAltIcon, BellIcon, CalendarIcon } from "@heroicons/react/outline";
import './DoctorProfile.css';
import { useContext } from "react";
import { docDetailsContext } from "../../pages/Doctor/Doctor_Profile/Doctor_Profile";
import axios from "axios";
import { doctorUrl, userUrl } from "../../../apiLinks/apiLinks";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Card, Container, Grid, Typography, useTheme, } from "@mui/material";
import { FaUserAlt, FaStethoscope, FaBook } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";



const DoctorProfile = () => {
    
    const { docDetails, SetDocDetails } = useContext(docDetailsContext)
    const [activeTab, setActiveTab] = useState("dashboard")
    const timeFormRef = useRef('')
    const editFormRef = useRef('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [bio, setBio] = useState('')
    const [slots, setSlots] = useState('')
    const [experience, setExperience] = useState('')
    const [day, setDay] = useState('')
    const [resetPage, setResetPage] = useState(false)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState('')
    const [priceOnline, setPriceOnline] = useState('')
    const [priceOffline, setPriceOffline] = useState('')
    const [appointments, setAppointment] = useState([])
    const [loading, setLoading] = useState(false)
    const [patientCount, setPatientCount] = useState('')
    const [revenue, setRevenue] = useState('')
    const [pending, setPending] = useState('')
    const [appointmentGraph,setAppointmentGraph] = useState([])
    const [sales,setSales] = useState([])
    let token = localStorage.getItem('doctorToken')
    const headers = { Authorization: token }


    const Navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`${doctorUrl}getDocDetails`, { headers }).then((response) => {
            response.status === 200 && SetDocDetails(response.data)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something wrong')
        }).finally(() => setLoading(false))
    }, [resetPage])

    useEffect(() => {
        if (activeTab === 'appointments') {
            setLoading(true)
            axios.get(`${doctorUrl}getAppointments`, { headers }).then((response) => {
                setAppointment(response.data)
            }).catch((err) => {
                err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something wrong')
            }).finally(() => setLoading(false))
        } else if (activeTab === 'dashboard') {
            setLoading(true)
            axios.get(`${doctorUrl}getDashboardDetails`, { headers }).then((response) => {
                setPatientCount(response.data.patientCount)
                setRevenue(response.data.totalRevenue)
                setPending(response.data.upcomingAppointments)
                setAppointmentGraph(response.data.appointmentGraph)
            }).catch((err) => {
                err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something wrong')
            }).finally(() => setLoading(false))
        }else if(activeTab === 'sales'){
            setLoading(true)
            axios.get(`${doctorUrl}getSales`,{headers}).then((response)=>{
                setSales(response.data)
            }).catch((err) => {
                err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something wrong')
            }).finally(() => setLoading(false))
        }
    }, [activeTab, resetPage])


    const handleDayOfWeekChange = (e) => {
        setDay(e.target.value);
    };

    const optionsSales = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Sales by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    }


    const handleStartTimeChange = (e) => {
        if (endTime) {
            const check = checkTimeValidity(e.target.value, endTime)
            if (!check) {
                toast.error('please select proper time')
                timeFormRef.current.reset()
                setEndTime(null)
                setStartTime(null)
            } else {
                setStartTime(e.target.value)
            }
        } else {
            setStartTime(e.target.value)
        }
    };


    const handleEndTimeChange = (e) => {
        if (startTime) {
            const check = checkTimeValidity(startTime, e.target.value)
            if (!check) {
                toast.error('please select proper time')
                timeFormRef.current.reset()
                setEndTime(null)
                setStartTime(null)
            } else {
                setEndTime(e.target.value)
            }
        } else {
            setEndTime(e.target.value)
        }
    };


    const editProfile = (e) => {
        e.preventDefault()
        setLoading(true)
        let doctorData = {
            email: email === '' ? docDetails?.email : email,
            phone: phone === '' ? docDetails?.phone : phone,
            address: address === '' ? docDetails?.address : address,
            bio: bio === '' ? docDetails?.bio : bio,
            experience: experience === '' ? docDetails?.experience : experience,
            priceOnline: priceOnline === '' ? docDetails?.priceOnline : priceOnline,
            priceOffline: priceOffline === '' ? docDetails?.priceOffline : priceOffline
        }
        const headers = { Authorization: token }
        axios.post(`${doctorUrl}editProfile`, { doctorData }, { headers }).then((response) => {
            response.status === 200 && (response.data.status ? toast.success('edited successfully') : toast.error('something went wrong'))
            editFormRef.current.reset()
            response.status === 200 && setResetPage(resetPage => !resetPage)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        }).finally(() => setLoading(false))


    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const timeData = {
            day,
            startTime,
            endTime,
            slots
        }
        const headers = { Authorization: token }
        axios.post(`${doctorUrl}editTime`, { timeData }, { headers }).then((response) => {
            response.status === 200 && (response.data.status ? toast.success('added successfully') : toast.error('the timing is already registered'))
            timeFormRef.current.reset()
            response.status === 200 && setResetPage(resetPage => !resetPage)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        }).finally(() => setLoading(false))

    };


    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    const deleteSlot = (index) => {
        setLoading(true)
        const headers = { Authorization: token }
        let data = docDetails.timings[index]
        axios.post(`${doctorUrl}deleteSlot`, { data }, { headers }).then((response) => {
            response.status === 200 && (response.data.status ? toast.success('deleted successfully') : toast.error('some unexpected error try again'))
            response.status === 200 && setResetPage(resetPage => !resetPage)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        }).finally(() => setLoading(false))
    }


    const editProfilePic = (e) => {
        let image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            let imageData = reader.result
            let token = localStorage.getItem('doctorToken')
            const headers = { Authorization: token }
            axios.post(`${doctorUrl}editProfilePic`, { imageData }, { headers }).then((response) => {
                response.status === 200 && setResetPage(resetPage => !resetPage)
                response.status === 200 && toast.success('profile pic changed')

            }).catch((err) => {
                err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
            })
        }
    }

    function checkTimeValidity(startTime, endTime) {
        const start = new Date(`01/01/2000 ${startTime}`);
        const end = new Date(`01/01/2000 ${endTime}`);
        let check
        if (start >= end) {
            return check = false
        } else if (end <= start) {
            return check = false
        }
        return check = true;
    }


    const appointmentVisited = (appointmentId) => {
        axios.get(`${doctorUrl}visitedAppointment?appointmentId=${appointmentId}`, { headers }).then((response) => {
            response.data.update ? setResetPage(resetPage => !resetPage) : toast.error('error')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        })
    }


    const appointmentUnVisited = (appointmentId) => {
        axios.get(`${doctorUrl}UnVisitedAppointment?appointmentId=${appointmentId}`, { headers }).then((response) => {
            response.data.update ? setResetPage(resetPage => !resetPage) : toast.error('error')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        })
    }


    const appointmentCancel = (appointmentId) => {
        axios.get(`${doctorUrl}cancelAppointment?appointmentId=${appointmentId}`, { headers }).then((response) => {
            response.data.cancel ? setResetPage(resetPage => !resetPage) : toast.error('error')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        })
    }


    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className=" " >
                        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                            <div className='text-center w-full department-head mb-4'><h1>Your Details</h1></div>
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h1 className="text-2xl font-medium text-gray-900">
                                            {docDetails?.fullName}
                                        </h1>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            {docDetails?.department?.name}
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {docDetails?.phone}
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {docDetails?.address}
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {docDetails?.bio}
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {docDetails?.qualification}
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {docDetails?.experience} years
                                                </dd>
                                            </div>
                                            {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Available Dates</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input
                                                        type="date"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md"
                                                    />
                                                </dd>
                                            </div> */}
                                        </dl>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse ">
                                        <button
                                            type="button"
                                            className=" inline-flex bg-mainColor hover:bg-secColor items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white edit-profile-doctor  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setActiveTab('edit-profile')}
                                        >
                                            Edit Profile
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "sales":

                return (
                    sales.length === 0 ? <div className="flex flex-col items-center">
                        <BellIcon className="h-24 w-24 text-gray-300 mb-4 mt-4" />
                        <p className="text-lg leading-7 text-gray-500">You have no sales.</p>
                    </div> :
                        <div className="bg-gray-100 p-4 md:max-w-full mx-auto">
                            <h2 className="text-xl font-bold mb-4">Sales</h2>
                            {sales.map(sale => (
                                <div className="mb-2 bg-white rounded-lg p-3 flex items-center justify-between" key={sale._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg><p className="text-gray-600 flex-grow  tracking-wide	text-textBlue text-sm"> Date: <a className="text-textBlue font-semibold me-3">{sale?.date.substring(0, 10)}</a>  Time:  <a className="text-textBlue font-semibold me-3"> {sale?.slot}</a> booked on: <a className="text-textBlue font-semibold me-3">{sale?.createdAt.substring(0, 10)}</a>
                                    status:{
                                        sale?.status === 'visited' && <a className="text-textBlue font-semibold me-3">Consulted</a>
                                    }
                                    {
                                        sale?.status === 'unVisited' && <a className="text-textBlue font-semibold me-3">not consulted</a>
                                    }
                                    {
                                        sale?.status === 'cancelled' && <a className="text-textBlue font-semibold me-3">Cancelled</a>
                                    }
                                     {
                                        sale?.status === 'booked' && <a className="text-textBlue font-semibold me-3">upcoming</a>
                                    } 
                                    amount:<a className="text-textBlue font-semibold me-3">{sale?.price}</a>
                                    </p>
                                    
                                </div>
                            ))}
                        </div>
                );
            case "appointments":
                return (
                    appointments.length === 0 ? <div className="flex flex-col items-center">
                        <BellIcon className="h-24 w-24 text-gray-300 mb-4" />
                        <p className="text-lg leading-7 text-gray-500">You have no appointments scheduled.</p>
                    </div> : <div className="bg-gray-100 p-4 md:max-w-full mx-auto">
                        <h2 className="text-xl font-bold mb-4">Your appointments</h2>
                        {appointments.map(appointment => (
                            <div className="mb-2 bg-white rounded-lg p-3 flex flex-col md:flex-row items-center justify-between" key={appointment._id}>
                                <div className="flex-grow text-gray-600 text-sm flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    <p className="text-textBlue">
                                        <a className="font-semibold">{appointment.patientId?.fullName}</a> have booked an appointment on <a className="font-semibold">{appointment?.date.substring(0, 10)}</a> at slot <a className="font-semibold">{appointment.slot}</a>
                                    </p>
                                </div>
                                <div className="flex justify-center mt-2">
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold md:py-1 lg:py-2 px-2 lg:px-4 rounded mr-2 text-sm" onClick={() => appointmentVisited(appointment._id)}>
                                        Visited
                                    </button>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold md:py-1 lg:py-2 px-2 lg:px-4 rounded mr-2 text-sm" onClick={() => appointmentUnVisited(appointment._id)}>
                                        Unvisited
                                    </button>
                                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold md:py-1 lg:py-2 px-2 lg:px-4 rounded text-sm" onClick={() => appointmentCancel(appointment._id)}>
                                        Cancel
                                    </button>
                                </div>


                            </div>

                        ))}
                    </div>
                );

            case "edit-profile":
                return (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={editProfile} ref={editFormRef}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="email" id="email" name="email" placeholder={docDetails?.email} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="tel" id="phone" name="phone" placeholder={docDetails?.phone} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="address" name="address" placeholder={docDetails?.address} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Bio
                                </label>
                                <input onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="address" name="address" placeholder={docDetails?.bio} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Experience
                                </label>
                                <input onChange={(e) => setExperience(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="number" id="address" name="address" placeholder={docDetails?.experience} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Price(online)
                                </label>
                                <input onChange={(e) => setPriceOnline(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="number" id="address" name="address" placeholder={docDetails?.priceOnline} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Price(offline)
                                </label>
                                <input onChange={(e) => setPriceOffline(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="number" id="address" name="address" placeholder={docDetails?.priceOffline} />
                            </div>
                            <button className="save-button text-white py-2 px-4 rounded-full bg-mainColor hover:bg-secColor  focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                Save Changes
                            </button>
                        </form>
                    </div>
                );

            case 'timings':
                return (
                    <>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto" ref={timeFormRef}>
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="text-2xl font-bold mb-6">Add Timing</h2>
                                <div className="flex flex-wrap -mx-2 mb-4">
                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="day_of_week" className="block text-gray-700 font-bold mb-2 mt-2 ">
                                            Day of Week:
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                id="day_of_week"
                                                name="day_of_week"
                                                onChange={handleDayOfWeekChange}

                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Please select</option>
                                                <option value="monday">Monday</option>
                                                <option value="tuesday">Tuesday</option>
                                                <option value="wednesday">Wednesday</option>
                                                <option value="thursday">Thursday</option>
                                                <option value="friday">Friday</option>
                                                <option value="saturday">Saturday</option>
                                                <option value="sunday">Sunday</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="start_time" className="block text-gray-700 font-bold mb-2 mt-2">
                                            Start Time:
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                id="start_time"
                                                name="start_time"
                                                onChange={handleStartTimeChange}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Please select</option>
                                                <option value="07:00 AM">07:00 AM</option>
                                                <option value="08:00 AM">08:00 AM</option>
                                                <option value="09:00 AM">09:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="12:00 PM">12:00 PM</option>
                                                <option value="01:00 PM">01:00 PM</option>
                                                <option value="02:00 PM">02:00 PM</option>
                                                <option value="03:00 PM">03:00 PM</option>
                                                <option value="04:00 PM">04:00 PM</option>
                                                <option value="05:00 PM">05:00 PM</option>
                                                <option value="06:00 PM">06:00 PM</option>
                                                <option value="07:00 PM">07:00 PM</option>
                                                <option value="08:00 PM">08:00 PM</option>
                                                <option value="09:00 PM">09:00 PM</option>
                                                <option value="10:00 PM">10:00 PM</option>
                                                <option value="11:00 PM">11:00 PM</option>
                                                <option value="12:00 AM">12:00 AM</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="end_time" className="block text-gray-700 font-bold mb-2 mt-2">
                                            End Time:
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                id="end_time"
                                                name="end_time"
                                                onChange={handleEndTimeChange}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Please select</option>
                                                <option value="07:00 AM">07:00 AM</option>
                                                <option value="08:00 AM">08:00 AM</option>
                                                <option value="09:00 AM">09:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="12:00 PM">12:00 PM</option>
                                                <option value="01:00 PM">01:00 PM</option>
                                                <option value="02:00 PM">02:00 PM</option>
                                                <option value="03:00 PM">03:00 PM</option>
                                                <option value="04:00 PM">04:00 PM</option>
                                                <option value="05:00 PM">05:00 PM</option>
                                                <option value="06:00 PM">06:00 PM</option>
                                                <option value="07:00 PM">07:00 PM</option>
                                                <option value="08:00 PM">08:00 PM</option>
                                                <option value="09:00 PM">09:00 PM</option>
                                                <option value="10:00 PM">10:00 PM</option>
                                                <option value="11:00 PM">11:00 PM</option>
                                                <option value="12:00 AM">12:00 AM</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2 mt-2">
                                            Slots
                                        </label>
                                        <input
                                            required
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter slots"
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => setSlots(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="border border-gray-400 rounded-lg px-6 py-4">
                            <h3 className="text-lg font-bold mb-4">Availability</h3>
                            {docDetails?.timings.length === 0 ? (
                                <p>No availability found.</p>
                            ) : (
                                <ul className="list-disc pl-4">
                                    {docDetails?.timings.map((time, index) => (
                                        <li key={index} className="mb-3">
                                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                                                <p className="text-lg font-semibold mb-2 sm:mr-4">
                                                    <span className="text-gray-700 mr-2">{time?.day}:</span>
                                                    <span>{time?.startTime} - {time?.endTime}</span>
                                                </p>
                                                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                                                    onClick={() => deleteSlot(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <p className="text-gray-700">
                                                <span className="font-semibold mr-2">Slots:</span>
                                                {time.slots}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                    </>



                );
            case 'dashboard':
                return (
                    <Container maxWidth="lg" sx={{ mt: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        boxShadow: theme.shadows[4],
                                        borderRadius: theme.shape.borderRadius,
                                        padding: theme.spacing(2),
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <FaUserAlt size={40} />
                                        <Typography variant="h6" className="mx-auto" sx={{fontSize:'16px' }}>Total Patients Treated</Typography>
                                    </Box>
                                    <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                                        {patientCount}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main,
                                        color: theme.palette.common.white,
                                        boxShadow: theme.shadows[4],
                                        borderRadius: theme.shape.borderRadius,
                                        padding: theme.spacing(2),
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <FaStethoscope size={40} />
                                        <Typography variant="h6" className="mx-auto" sx={{fontSize:'16px' }}>Total Revenue</Typography>
                                    </Box>
                                    <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                                        {revenue}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} sx={{ marginLeft: "20px" }}>
                                <Card
                                    sx={{
                                        backgroundColor: theme.palette.warning.main,
                                        color: theme.palette.common.white,
                                        boxShadow: theme.shadows[4],
                                        borderRadius: theme.shape.borderRadius,
                                        padding: theme.spacing(2),
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <FaBook size={40} />
                                        <Typography variant="h6" className="mx-auto" sx={{fontSize:'16px' }}>Upcoming Bookings</Typography> 
                                    </Box>
                                    <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                                        {pending}
                                    </Typography>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card
                                    sx={{
                                        boxShadow: theme.shadows[4],
                                        borderRadius: theme.shape.borderRadius,
                                        padding: theme.spacing(5),
                                    }}
                                >
                                    <ReactApexChart options={optionsSales} series={appointmentGraph} type="line" height={350} />
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                );
            default:
                return null;
        }
    };

    const theme = useTheme();

    return (
        <>
            <Toaster />
            {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>}
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden ">
                <div className="w-full md:w-1/4 bg-gray-50 p-4 border-r border-gray-200 mb-5">
                    <div className="flex flex-col items-center">
                        <img src={docDetails?.profilePic} alt="Doctor" className="w-32 h-32 rounded-full my-8" />
                        <label htmlFor="fileInput" className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-full mb-4 cursor-pointer">
                            <PencilAltIcon className="h-6 w-6 mr-2" />
                            <span>Edit Profile</span>
                        </label>
                        <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={editProfilePic} />

                        <h2 className="text-2xl font-semibold mb-2">{docDetails?.fullName}</h2>
                        <span className="text-gray-500 text-lg mb-4">{docDetails?.department?.name}</span>
                        <div className="mt-8">
                            <button
                                className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "dashboard" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("dashboard")}>

                                <PhotographIcon className="h-6 w-6 mr-2" />
                                <span>Dashboard</span>
                            </button>
                            <button
                                className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "profile" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("profile")}>

                                <PhotographIcon className="h-6 w-6 mr-2" />
                                <span>Profile</span>
                            </button>
                            <button
                                className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "sales" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("sales")}
                            >
                                <BellIcon className="h-6 w-6 mr-2" />
                                <span>Sales</span>
                            </button>
                            <button
                                className={`flex items-center text-lg py-2 px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "appointments" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("appointments")}
                            >
                                <CalendarIcon className="h-6 w-6 mr-2" />
                                <span>Appointments</span>
                            </button>
                            <button
                                className={`flex items-center text-lg py-2  px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "timings" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("timings")}
                            >
                                <PencilAltIcon className="h-6 w-6 mr-2" />
                                <span>Timings</span>
                            </button>
                            <button
                                className={`flex items-center text-lg py-2  px-4 rounded-md mb-2 doctor-profile-nav ${activeTab === "edit-profile" ? "active-nav" : "text-gray-600"}`}
                                onClick={() => handleTabClick("edit-profile")}
                            >
                                <PencilAltIcon className="h-6 w-6 mr-2" />
                                <span>Edit Profile</span>
                            </button>  
                        </div >
                    </div >
                </div  >
                <div className="w-full md:w-3/4 p-4">{renderTabContent()}</div>
            </div >
        </>

    );
};

export default DoctorProfile;



