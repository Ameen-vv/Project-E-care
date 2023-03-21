import React,{useState} from 'react'
import { PhotographIcon, PencilAltIcon, BellIcon, CalendarIcon } from "@heroicons/react/outline";

import './Profile.css'

function Profile() {
    const [activeSection, setActiveSection] = useState('editProfile');
    const appointments = [{
        id: 1,
        message: 'You have an appointment with Dr John on 15-02-2023 5:00pm'
    }]

    const handleNavigationClick = (section) => {
      setActiveSection(section);
    }
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex-none md:w-56 bg-gray-100 px-4 py-6 md:py-8 ">
                <div className="w-full h-auto mb-4 md:mb-8 ">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjE5GRou8C-M5VXPpYSpJQnCuA38_TMIgAeAnJNY_5w&s" alt="User profile picture" className="w-full h-auto rounded-full" />
                </div>
                <button className="w-full save-button text-white py-2 rounded-full  focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                    Change Profile
                </button>
                <nav className="mt-6 md:mt-8 mb-5">
                    <ul>
                        <li className={`py-2 px-4 md:px-6 text-sm md:text-base font-medium ${activeSection === 'editProfile' ? 'active-link' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`} onClick={() => handleNavigationClick('editProfile')}>
                            Edit Profile
                        </li>
                        <li className={`py-2 px-4 md:px-6 text-sm md:text-base font-medium ${activeSection === 'notifications' ? 'active-link' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`} onClick={() => handleNavigationClick('notifications')}>
                            Notifications
                        </li>
                        <li className={`py-2 px-4 md:px-6 text-sm md:text-base font-medium ${activeSection === 'appointments' ? 'active-link' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`} onClick={() => handleNavigationClick('appointments')}>
                            Appointments
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex-grow px-4 py-6 md:py-8">
                {activeSection === 'editProfile' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="email" id="email" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="text" id="address" name="address" placeholder="Enter your address" />
                            </div>
                            <button className="save-button text-white py-2 px-4 rounded-full  focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}
                {activeSection === 'notifications' && (
                     <div className="flex flex-col items-center">
                     <BellIcon className="h-24 w-24 text-gray-300 mb-4 mt-4" />
                     <p className="text-lg leading-7 text-gray-500">You have no notifications.</p>
                 </div>
                )}
                {activeSection === 'appointments' && (
                    <div className="bg-gray-100 p-4 md:max-w-full mx-auto">
                    <h2 className="text-xl font-bold mb-4">Your appointments</h2>
                    {appointments.map(appointment => (
                        <div className="mb-2 bg-white rounded-lg p-3 flex items-center justify-between" key={appointment.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-gray-600 flex-grow">{appointment.message}</p>
                            <button className="text-gray-600 font-bold py-2 px-4 rounded border border-gray-400">Cancel</button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>



    )
}

export default Profile
