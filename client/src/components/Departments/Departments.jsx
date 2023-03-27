import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDepartments } from '../../redux/Slices/departmetnSlice'
import './Departments.css'



const Departments = () => {
    const departmentsData = useSelector(state => state.department)
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const Navigate = useNavigate()
    const distpatch = useDispatch()
    useEffect(() => {
        distpatch(fetchDepartments({ search: '' }))
    }, [])
    useEffect(()=>{
        setSelectedDepartment(departmentsData?.departments?.departments && departmentsData?.departments?.departments[0])
    },[departmentsData.loading])
    
    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    return (
        <section className='departmentSection mt-5 '>
            {departmentsData.loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>}
            <div className='w-100 flex justify-content-center mt-3'><h1 className='department-head'>Top Departments</h1></div>
            <div className="department-container">
                <div className="department-list mt-2 text-sm">
                    <ul>
                        {departmentsData?.departments?.departments?.slice(0, 4).map((department) => (

                            <li key={department.id} onClick={() => handleDepartmentClick(department)} className={selectedDepartment?._id === department._id ? "active" : ""}>
                                {department.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="department-details ">
                    <div className="department-header">
                        <h3>{selectedDepartment ? selectedDepartment.name : "Select a department"}</h3>
                    </div>
                    <div className="department-content">
                        {selectedDepartment ? (
                            <>
                                <div className="department-image mb-3">
                                    <img src={selectedDepartment.imageUrl} alt={selectedDepartment.name} />
                                </div>
                                <div className="department-description mt-3 text-sm ">
                                    <p>{selectedDepartment.description}</p>
                                    <button className='btn book-btn mt-3 p-2 text-sm flex' onClick={() => Navigate('/doctorList', { state: { departmentId: selectedDepartment._id } })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 my-auto me-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                        Find a Doctor</button>
                                </div>
                            </>
                        ) : (
                            <p>Click on a department to see details</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Departments;
