import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
function DoctorDetails() {


    const Navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState("");

    function handleDateChange(event) {
      setSelectedDate(event.target.value);
    }

    const doctor = {
        name:'doctor',
        specialty:'cardiology',
        email:'doctor@email.com',
        phone:'8623487353',
        education:'mbbs',
        hospital:'govt hospital',
        address:'addresss'
    }
  return (
    <div className=" " style={{backgroundColor:'#F2F6FF'}}>
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
    <div className='text-center w-full department-head mb-4'><h1>Your Details</h1></div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-medium text-gray-900">
              Dr. Jane Smith
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Cardiologist
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  (555) 555-5555
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  123 Main St, Anytown, USA
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Available Dates</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border rounded-md"
                  />
                </dd>
              </div>
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainColor hover:bg-secColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={()=>Navigate('/doctor/profile')}
       >
            Go to your profile
        </button>
       
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default DoctorDetails
