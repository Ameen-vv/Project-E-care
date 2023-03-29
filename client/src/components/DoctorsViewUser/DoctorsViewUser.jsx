import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';  
import { drPaginationContext } from "../../pages/User/DoctorViewingPage/DoctorList";

const List = ({ data }) => {

  const {page,setPage} = useContext(drPaginationContext)
  let pageCount = Math.ceil(data.count/8)


  const Navigate = useNavigate()

  return (
    <div>
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12 justify-center w-full flex">
          <div class="flex flex-wrap -mx-1 lg:-mx-4 lg:w-4/5 sm:w-full">
            { data.doctors?.length === 0 && <h1 className="text-lg">No Doctors Available </h1>}
            {data?.doctors?.map((doctor) => (
              <div onClick={()=>Navigate('/doctorView',{state:doctor})} class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-3 lg:w-1/3  xl:w-1/4 lg:my-4 lg:px-4  cursor-pointer hover:scale-105 ease-in-out duration-200 mb-3">
                <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4" >
                    <a href="#">
                      <img
                        alt="Placeholder"
                        class="block h-48 w-48 rounded-full object-cover"
                        src={doctor.profilePic ?? 'https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png'}
                      />
                    </a>
                  </div>

                  <div class="flex items-center justify-center leading-tight text-textBlue">
                    <h1 class="text-lg">
                      <p class="no-underline  font-semibold ">Dr {doctor?.fullName}</p>
                    </h1>
                  </div>

                  <div class="flex items-center justify-center text-sm text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>{doctor?.department?.name} | {doctor?.experience}yrs</p>
                  </div>
                  <div class="flex items-center justify-start ms-5 text-sm text-gray-500 text-center leading-tight p-2 md:p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="ms-2">{doctor.hospital}</p>
                  </div>

                  <div class="flex items-center justify-start ms-5 text-sm text-gray-500 text-center leading-tight p-2 md:p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>

                    <p className="ms-2">{doctor.qualification}</p>
                  </div>

                  <div class="flex items-center justify-start ms-5 text-sm text-gray-500 text-center leading-tight p-2 md:p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>


                    <p className="ms-2">{doctor.priceOffline}</p>
                  </div>

                  <hr className="opacity-20 mt-1" />

                  <div className="flex items-center justify-start leading-tight p-2 md:p-4 mb-3  " onClick={()=>Navigate('/doctorView',{state:doctor})}>
                    <div className="w-full flex items-center justify-center mt-1 hover:text-secColor focus:text-secColor">
                      <p className="mt-2 text-textBlue hover:text-secColor focus:text-secColor">View Profile</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                    </div>

                  </div>
                </article>
              </div>
            ))}
            <div className={`w-full flex justify-center mt-5 `} >
              <Stack spacing={2}>
                <Pagination 
                  count={pageCount} 
                  shape="rounded"
                  page={page}
                  onChange={(e,p)=>setPage(p)}
                  />
              </Stack>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
