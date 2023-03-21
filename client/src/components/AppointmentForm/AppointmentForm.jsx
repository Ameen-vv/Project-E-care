import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { userUrl } from '../../../apiLinks/apiLinks'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';




const AppointmentForm = () => {

    const [doctor, setDoctor] = useState('');
    const location = useLocation()
    const [date, setDate] = useState('');
    const [day, setDay] = useState('')
    const [time, setTime] = useState('');
    const [isOpen, setOpen] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [loading,setLoading] = useState(false)
    const Navigate = useNavigate()
    const formRef = useRef(null)
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: token }


    useEffect(() => {
        const handleDay = () => {
            if (date) {
                const dateStr = date.toString()
                const dateObject = new Date(dateStr);
                const options = { weekday: 'short' };
                const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(dateObject);
                switch (dayOfWeek) {
                    case 'Sun':
                        setDay('sunday');
                        break;
                    case 'Mon':
                        setDay('monday');
                        break;
                    case 'Tue':
                        setDay('tuesday');
                        break;
                    case 'Wed':
                        setDay('wednesday');
                        break;
                    case 'Thu':
                        setDay('thursday');
                        break;
                    case 'Fri':
                        setDay('friday');
                        break;
                    case 'Sat':
                        setDay('saturday');
                        break;
                    default:
                        break;
                }
            }
        };
        setDoctor(location.state)
        handleDay();
    }, [date, setDay]);




    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const appointment = {
            date,
            time,
            doctorId: doctor._id,
        };
        axios.post(`${userUrl}bookAppoinment`, { appointment }, { headers }).then((response) => {
            if (response.data.available === 'available') {
                setOpen(true)
                setOrderId(response.data.orderId)
            }
            response.data.available === 'notAvailable' &&  toast.error('Booking For this slot is full please try to change date')
            response.data.available === 'exist' && toast.error('You have already booked for this date in same slot')
            formRef.current.reset()

        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        }).finally(()=>setLoading(false))


    }


    const cancelPayment = () => {
        setOpen(false)
    }

    const handleDate = (newDate) => {
        setDate(newDate);
    }


    const initializePayment = () => {
        setLoading(true)
        axios.get(`${userUrl}initializePayment?orderId=${orderId}`, { headers }).then((response) => {
            response.data.order ? handleRazorPay(response.data.order) : toast.error('Something Wrong')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
        }).finally(()=>setLoading(false))
    }

    const handleRazorPay = (order) => {
        setLoading(true)
        const options = {
            "key": import.meta.env.VITE_RAZORPAY_KEY_ID,
            "amount": order.amount,
            "currency": order.currency,
            "name": 'E CARE',
            "order_id": order.id,
            handler: function (response) {
                setLoading(true)
                axios.post(`${userUrl}verifyPayment?orderId=${orderId}`, response, { headers }).then((response) => {
                    response.data.signatureIsValid ? toast.success('payment success') : axios.error('error')
                }).catch((err) => {
                    err?.response?.status === 401 ? Navigate('/signIn') : toast.error('something went wrong')
                }).finally(()=>setLoading(false))
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full mt-4">
            {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>}
            <Toaster />
            <form ref={formRef} className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2">
                <div className='w-full flex justify-center'><h2 className="text-xl font-semibold mb-4 text-textBlue">Book an Appointment</h2></div>
                <h3 className='mb-2 text-lg font-semibold text-textBlue'>Doctor : Dr {doctor?.fullName}</h3>
                <h3 className='mb-2 text-md font-semibold text-textBlue mb-4'>Department : {doctor?.department?.name}</h3>


                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm text-gray-700 font-medium mb-2">Date</label>
                    <DatePicker
                        id="date"
                        showIcon
                        isClearable
                        minDate={new Date()}
                        placeholderText="Select a day"
                        selected={date}
                        onChange={handleDate}
                        dateFormat="MMMM d, yyyy"
                        className="border-gray-400 border rounded-lg w-full py-2 px-3"
                        required
                    />


                </div>
                {
                    date && <div className="mb-4">
                        <label htmlFor="time" className="block text-sm text-gray-700 font-medium mb-2">Time</label>
                        <select
                            id="time"
                            className="border-gray-400 border rounded-lg py-2 px-3 w-full"
                            onChange={(e) => setTime(e.target.value)}
                            required
                        >
                            <option value="" >Select</option>
                            {doctor?.timings?.length === 0 ? <option value="">No slots Available</option> :
                                doctor?.timings?.filter((slots) => {
                                    return slots.day === day
                                }).map((slots) => {
                                    return slots.day ? <option value={`${slots.startTime}-${slots.endTime}`}>{slots.startTime} - {slots.endTime}</option> : <option value="asds">No slots Available</option>
                                })
                            }

                        </select>
                    </div>
                }
                <div className="flex justify-center mt-3">
                    <button type="submit" onClick={handleSubmit} className="bg-mainColor hover:bg-secColor text-white py-2 px-4 rounded-lg">Submit</button>
                </div>

            </form>
            {
                isOpen && <div
                    className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${isOpen ? "" : "hidden"
                        }`}
                >
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                        <p className="text-lg mb-6">
                            Total Amount: <span className="font-bold">$700</span>
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-4"
                            >
                                Pay with Wallet
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg me-3"
                                onClick={initializePayment}
                            >
                                Pay Online
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                                onClick={cancelPayment}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default AppointmentForm