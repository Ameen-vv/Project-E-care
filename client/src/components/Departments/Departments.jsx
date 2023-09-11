import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../redux/Slices/departmetnSlice";
import "./Departments.css";
import { userUrl } from "../../../apiLinks/apiLinks";
import { toast } from "react-hot-toast";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${userUrl}getTopDep`)
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((err) => {
        err?.response?.status === 401
          ? Navigate("/signIn")
          : toast.error("something wrong");
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setSelectedDepartment(departments && departments[0]);
  }, [departments]);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <section className="departmentSection mt-5 ">
      
      <div className="w-100 flex justify-content-center mt-3">
        <h1 className="department-head">Top Departments</h1>
      </div>
      {loading && (
        <div className="w-full flex justify-center h-96 items-center">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      )}
      {!loading && <div className="department-container">
        <div className="department-list mt-2 text-sm">
          <ul>
            {departments.slice(0, 4).map((department) => (
              <li
                key={department.id}
                onClick={() => handleDepartmentClick(department)}
                className={
                  selectedDepartment?._id === department._id ? "active" : ""
                }
              >
                {department.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="department-details ">
          <div className="department-header">
            <h3>
              {selectedDepartment
                ? selectedDepartment.name
                : "Select a department"}
            </h3>
          </div>
          <div className="department-content">
            {selectedDepartment ? (
              <>
                <div className="department-image mb-3">
                  <img
                    src={selectedDepartment.imageUrl}
                    alt={selectedDepartment.name}
                  />
                </div>
                <div className="department-description mt-3 text-sm ">
                  <p>{selectedDepartment.description}</p>
                  <button
                    className="btn book-btn mt-3 p-2 text-sm flex"
                    onClick={() =>
                      Navigate("/doctorList", {
                        state: { departmentId: selectedDepartment._id },
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 my-auto me-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    Find a Doctor
                  </button>
                </div>
              </>
            ) : (
              <p>Click on a department to see details</p>
            )}
          </div>
        </div>
      </div>}
    </section>
  );
};

export default Departments;
