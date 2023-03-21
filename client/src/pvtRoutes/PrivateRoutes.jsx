import { useEffect, useState, useRef } from 'react'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { userUrl } from '../../apiLinks/apiLinks'

const PrivateRoutes = () => {
  const Navigate = useNavigate()
  const [userCheck, setUserCheck] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: token }
    axios.get(`${userUrl}authenticate`, { headers }).then((response) => {
      if (response.status != 200) {
        setUserCheck(false)
        Navigate('/signIn')
      } else {
        setUserCheck(true)
      }
    }).catch(() => {
      setUserCheck(false)
      Navigate('/signIn')
    })
  }, [])

  return (
    userCheck && <Outlet />
  )


}

export default PrivateRoutes