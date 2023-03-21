import { useContext, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {drawerContext} from '../Header/Header'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoginIcon from '@mui/icons-material/Login';
import WalletIcon from '@mui/icons-material/Wallet';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import './sideBar.css'
import { userContext } from '../../store/Contexts';
import { useNavigate } from 'react-router-dom';

const NavItems = [
    {
        page:'Home',
        path:'/'
    },
    {
        page:'Departments',
        path:'/departments'
    },
    {
        page:'Wallet',
        path:'/wallet'
    },
    {
        page:'About',
        path:'/'
    }

]
const NavitemCommon = [
	{
		page: 'Home',
		path: '/'
	},
	{
		page: 'Departments',
		path: '/departments'
	},
	{
		page:'About us',
		path:'/'
	},
    {
        page:'Register',
        path:'/signUp'
    },
    {
        page:'Sign In',
        path:'/signIn'
    }
]
const NavItemDoctor = [
	{
		page:'Home',
		path:'/doctor/home'
	},
	{
		page:'Appoinments',
		path:'/doctor/profile'

	},
	{
		page:'About Us',
		path:'/doctor/home'
	}
]
const NavItemUser = [
    {
        page:'Profile',
        path:'/profile'
    },
    {
        page:'Log Out',
        path:'/'
    }
]
const NavItemDoctor2 = [
    {
        page:'Profile',
        path:'/doctor/profile'
    },
    {
        page:'Log Out',
        path:'/'
    }
]
export default function TemporaryDrawer() {
  const {open,SetOpen} = useContext(drawerContext)
  const {user} = useContext(userContext)
  const Navigate = useNavigate()
  const list = () => (
    <Box
      sx={{ width:250 }}
      role="presentation"
      style={{padding:'10%'}}

    >
      <List>
        { user==='doctor' && NavItemDoctor.map((item, index) => (
          <ListItem key={item.page} disablePadding onClick={()=>Navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon style={{color:'#fff'}}>
                {item.page === 'Home' && <HomeIcon/>}
                {item.page === 'Appoinments' && <BookmarksIcon/>}
                {item.page === 'About Us' && <InfoIcon/>}
              </ListItemIcon>
              <ListItemText  primary={item.page}  />
            </ListItemButton>
          </ListItem>
        ))}
        { user==='user' && NavItems.map((item, index) => (
          <ListItem key={item.page} disablePadding onClick={()=>Navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon style={{color:'#fff'}}>
                {item.page === 'Home' && <HomeIcon/>}
                {item.page === 'Departments' && <VaccinesIcon/>}
                {item.page === 'Wallet' && <WalletIcon/>}
                {item.page === 'About' && <InfoIcon/>}
              </ListItemIcon>
              <ListItemText  primary={item.page}  />
            </ListItemButton>
          </ListItem>
        ))}
        { !user && NavitemCommon.map((item, index) => (
          <ListItem key={item.page} disablePadding onClick={()=>Navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon style={{color:'#fff'}}>
                {item.page === 'Home' && <HomeIcon/>}
                {item.page === 'Departments' && <VaccinesIcon/>}
                {item.page === 'About us' && <InfoIcon/>}
                {item.page === 'Sign In' && <LoginIcon/>}
                {item.page === 'Register' && <HowToRegIcon/>}
              </ListItemIcon>
              <ListItemText  primary={item.page}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      { user==='user' && NavItemUser.map((item, index) => (
          <ListItem key={item.page} disablePadding onClick={()=>Navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon style={{color:'#fff'}}>
                {item.page === 'Profile' && <AccountCircleIcon/>}
                {item.page === 'Log Out' && <LogoutIcon/>}
              </ListItemIcon>
              <ListItemText  primary={item.page}  />
            </ListItemButton>
          </ListItem>
        ))}
        { user==='doctor' && NavItemUser.map((item, index) => (
          <ListItem key={item.page} disablePadding onClick={()=>Navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon style={{color:'#fff'}}>
                {item.page === 'Profile' && <AccountCircleIcon/>}
                {item.page === 'Log Out' && <LogoutIcon/>}
              </ListItemIcon>
              <ListItemText  primary={item.page}  />
            </ListItemButton>
          </ListItem>
        ))}
    </Box>
  );

  return (
    <div>
      <Drawer
            anchor={'right'}
            open={open}
            onClose={()=>SetOpen(false)}
            PaperProps={{
                sx: {
                  backgroundColor: "#0AB3B8",
                  color:'#ffff',
                  
                      
                }
              }}
          >
            {list()}
          </Drawer>
    </div>
  )
}