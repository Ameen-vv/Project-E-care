import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './DoctorDetails.css'

const DoctorSinglePage = () => {
  const [doctor, setDoctor] = useState('')
  const location = useLocation()
  const Navigate = useNavigate()
  useEffect(() => {
    setDoctor(location.state)
  }, [])


  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl sm:w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-start sm:w-full bg-gray-50 px-6 py-5">
            <div className="flex items-center mb-3 sm:mb-0 drProfilView">
              <img
                className="h-28 w-28 rounded-full"
                src={doctor.profilePic ?? 'https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png'}
                alt="Doctor's profile picture"
              />
              <div className="ml-12 mt-3 ">
                <h1 className="text-xl font-semibold text-textBlue text-gray-900 mb-1 ">
                  Dr. {doctor?.fullName}
                </h1>
                <div>
                  <div>
                    <p className="text-sm text-gray-500 mb-4  ">{doctor?.department?.name}</p>
                    <p className="text-sm text-gray-500 mb-2">{doctor.experience} years of experience</p>
                    <p className="text-sm text-gray-500 mb-2 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                      : {doctor.hospital}</p>
                    <p className="text-sm text-gray-500 mb-2 flex "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      : ${doctor.priceOffline} Consultant</p>
                    <p className="text-sm text-gray-500 mb-2 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      : ${doctor.priceOnline} Video Appointment</p>

                  </div>
                  <div>

                  </div>
                </div>


              </div>
            </div>

          </div>
          <div className="px-6 py-4">
            <h2 className="text-lg font-medium text-textBlue mb-2">
              Available Dates for Consulting
            </h2>
            {
              doctor?.timings?.length === 0 && <h1>No Slots Available</h1>
            }
            <ul className="divide-y divide-gray-200">
              {
                doctor?.timings?.map((timing) => {
                  return(
                    <li className="py-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {timing.day}    {timing.startTime} to {timing.endTime}
                        </span>
                      </div>

                    </div>
                  </li>
                  )
                })
              }

            </ul>
          </div>
          <div className="flex items-center justify-end mb-3 me-3 drProfileButtonDiv mt-2">

            <button
              type="button"
              className="ml-3  px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-secColor hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2 sm:mb-0 drProfileButtons bg-mainColor text-white"
              onClick={()=>Navigate('/book',{state:doctor})}
            >
              Book Now
            </button>
            <button
              type="button"
              className="ml-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-secColor hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2 sm:mb-0 drProfileButtons"
            >
              Message
            </button>
            <button
              type="button"
              className="flex ml-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-mainColor hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2 sm:mb-0 bg-secColor text-white drProfileButtons"
            >Book Video Consultant
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ms-2 my-auto">
                <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>


            </button>
          </div>
        </div>
      </div>
    </div>






  );
}

export default DoctorSinglePage;
