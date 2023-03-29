import React, { createContext, useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import List from '../../../components/DoctorsViewUser/DoctorsViewUser'
import Filter from '../../../components/Filter/Filter'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { fetchDoctors } from '../../../redux/Slices/doctorSlice'
export const drPaginationContext = createContext()

const DoctorList = () => {
  const location = useLocation()
  const [department, setDepartment] = useState('')
  let result = useSelector(state => state.doctor)
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
 
  useEffect(() => {
    
    location?.state?.departmentId && setDepartment(location?.state?.departmentId)
    dispatch(fetchDoctors({ department, sort, filter, page, search }))
  }, [department, sort, filter, page, search])
  

  return (
    <drPaginationContext.Provider value={{ page, setPage, setDepartment, setSort, sort, filter, setFilter, setSearch }}>
      <div>
        <Toaster />
        {result.loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-20 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
        <Header />
        <div className='w-full justify-center flex department-heading mt-5 '><h1 className=''>Our Doctors</h1></div>
        <Filter />
        <List data={result.doctors} />
        <Footer />
      </div>
    </drPaginationContext.Provider>
  )
}

export default DoctorList
