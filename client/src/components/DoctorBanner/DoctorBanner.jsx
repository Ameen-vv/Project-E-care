import React from 'react'
import './DoctorBanner.css'

function DoctorBanner() {
  return (
    <section className="bg-gray-100 text-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 " style={{color:'#00468b'}}>
                Welcome Back Doctor
          </h1>
          <p className="text-md md:text-lg mb-8" style={{color:'#00468b'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend, nunc vel pretium eleifend, tellus elit condimentum turpis, a luctus felis velit sit amet dui. Sed feugiat libero id molestie fringilla.
          </p>
          <button className=" rounded-lg py-2 px-4 font-medium hover:bg-blue-600 doctor-banner-button">
            Check your Appointments
          </button>
        </div>
        <div className="hidden md:block">
          <img src="/images/doctor.jpeg" alt="Doctor" className="h-80 mx-auto" />
        </div>
      </div>
    </div>
  </section>
  )
}

export default DoctorBanner
