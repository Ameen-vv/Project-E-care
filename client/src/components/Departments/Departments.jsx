import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Departments.css'



function Departments() {
    const departments = [{ id: 1, name: "Emergency", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna sit amet odio feugiat tincidunt. Praesent egestas porta tincidunt. Duis sit amet nisl et elit faucibus sagittis. Nullam dignissim libero purus, a consectetur sapien mattis ac. Sed mattis elit urna, eget rhoncus tortor aliquam nec. Duis hendrerit massa vitae leo blandit, sit amet auctor nulla interdum. ",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREENt1N0BOZygIyVuHKr4m2ogUMaHyt_yRSQ&usqp=CAU' },
    { id: 2, name: "Cardiology", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna sit amet odio feugiat tincidunt. Praesent egestas porta tincidunt. Duis sit amet nisl et elit faucibus sagittis. Nullam dignissim libero purus, a consectetur sapien mattis ac. Sed mattis elit urna, eget rhoncus tortor aliquam nec. Duis hendrerit massa vitae leo blandit, sit amet auctor nulla interdum. ",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREENt1N0BOZygIyVuHKr4m2ogUMaHyt_yRSQ&usqp=CAU' },
    { id: 3, name: "Neurology", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna sit amet odio feugiat tincidunt. Praesent egestas porta tincidunt. Duis sit amet nisl et elit faucibus sagittis. Nullam dignissim libero purus, a consectetur sapien mattis ac. Sed mattis elit urna, eget rhoncus tortor aliquam nec. Duis hendrerit massa vitae leo blandit, sit amet auctor nulla interdum. " ,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREENt1N0BOZygIyVuHKr4m2ogUMaHyt_yRSQ&usqp=CAU'},];
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
    const Navigate = useNavigate()

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    return (
        <section className='departmentSection mt-5 '>
            <div className='w-100 flex justify-content-center mt-3'><h1 className='department-head'>DEPARTMENTS</h1></div>
            <div className="department-container">
            <div className="department-list mt-5">
                <ul>
                    {departments.map((department) => (
                        
                        <li key={department.id} onClick={() => handleDepartmentClick(department)} className={selectedDepartment?.id === department.id ? "active" : ""}>
                            {department.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="department-details">
                <div className="department-header">
                    <h3>{selectedDepartment ? selectedDepartment.name : "Select a department"}</h3>
                </div>
                <div className="department-content">
                    {selectedDepartment ? (
                        <>
                            <div className="department-image">
                                <img src={selectedDepartment.image} alt={selectedDepartment.name}  />
                            </div>
                            <div className="department-description mt-3">
                                <p>{selectedDepartment.description}</p>
                                <button className='btn book-btn mt-3 ' onClick={()=>Navigate('/book')}>Book an appointment</button>
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
