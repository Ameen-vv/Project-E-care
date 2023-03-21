import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { adminUrl } from '../../apiLinks/apiLinks'

function AdminRoutes() {
    const Navigate = useNavigate()
    const [adminCheck,setAdminCheck] = useState(false)

    useEffect(()=>{
      const token = localStorage.getItem('adminToken')
      const headers = {authorization:token}
      axios.get(`${adminUrl}authenticate`,{headers}).then((response)=>{
          response.status === 200 ? setAdminCheck(true) : Navigate('/admin')
      }).catch((err)=>{
        Navigate('/admin')
      })
    })

  return (
    adminCheck && <Outlet/>
  )
}

export default AdminRoutes
