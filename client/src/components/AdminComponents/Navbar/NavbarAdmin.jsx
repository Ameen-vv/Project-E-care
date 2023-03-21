import React from 'react'
import './NavbarAdmin.css'
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
function NavbarAdmin() {
  return (
    <div className='admin-nav'>
       <div className="wrapper w-100">
        <div className="admin-search">
            <input type="text" placeholder='Search..' />
            <SearchIcon/>
        </div>
        <div className="adminNav-items">
            <div className="adminNav-item">
                <FormatListBulletedIcon/>
            </div>    
         </div>
       </div>
    </div>
  )
}

export default NavbarAdmin
