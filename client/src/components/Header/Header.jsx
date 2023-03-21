
import { useRef, useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import './Header.css'
import TemporaryDrawer from "../SideBar/SideBar";
import { useContext } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userContext } from "../../store/Contexts";
export const drawerContext = createContext('')




const NavItemUser = [
	{
		page: 'Home',
		path: '/'
	},
	{
		page: 'Departments',
		path: '/departments'
	},
	{
		page: 'Wallet',
		path: '/wallet'
	},
	{
		page: 'About',
		path:'/'
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
		page:'About Us',
		path:'/'
	}
]


function Header() {
	const navRef = useRef();
	const Navigate = useNavigate()
	const [open, SetOpen] = useState(false)
	const {user,SetUser} = useContext(userContext)
	const [anchorEl, setAnchorEl] = useState(null)
	const dropDown = Boolean(anchorEl);
	
	return (
		<drawerContext.Provider value={{ open, SetOpen }}>
			<>
				<header>
					<div className="logoDiv">
						<img className="logo" src="\images\e-care-high-resolution-logo-color-on-transparent-background (1).png" alt="" height={80} width={80} />
					</div>
					<nav ref={navRef} className=' navMar mx-auto' >
						{user==='user'&& NavItemUser.map((item) =>
							<a key={item.page} onClick={() => Navigate(item.path)} className='me-4' >{item.page}</a>

						)}
						{user==='doctor'&& NavItemDoctor.map((item) =>
							<a key={item.page} onClick={() => Navigate(item.path)} className='me-4' >{item.page}</a>
						)}
						{!user&& NavitemCommon.map((item) =>
							<a key={item.page} onClick={() => Navigate(item.path)} className='me-4' >{item.page}</a>
						)}

						<button
							className="nav-btn nav-close-btn"
						>
							<FaTimes />
						</button>
						<div className="">
							<p className="login"><a href="" className="">Login</a>/<a href="" className="">Register</a></p>
						</div>
					</nav>
					<button className="nav-btn" onClick={() => SetOpen(true)} >
						<FaBars />
					</button>
					{
						!user  && <div className="ms-auto login2 me-5">
							<div>
								<Button
									id="basic-button"
									aria-controls={dropDown ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={dropDown ? 'true' : undefined}
									onClick={(e)=>setAnchorEl(e.currentTarget)}
								>
									<AccountCircleOutlinedIcon style={{color:'#fff'}}/>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={dropDown}
									onClose={()=>setAnchorEl(null)}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem onClick={()=>Navigate('/signUp')}>Register</MenuItem>
									<MenuItem onClick={()=>Navigate('/signIn')}>Sign In</MenuItem>
								</Menu>
							</div>
						</div> }
						{user === 'user' && <div className="ms-auto login2 me-4">
							<div>
								<Button
									id="basic-button"
									aria-controls={dropDown ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={dropDown ? 'true' : undefined}
									onClick={(e)=>setAnchorEl(e.currentTarget)}
								>
									<AccountCircleOutlinedIcon style={{color:'#fff'}}/>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={dropDown}
									onClose={()=>setAnchorEl(null)}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem onClick={()=>{
										setAnchorEl(null)
										Navigate('/profile')
									}}>Profile</MenuItem>
									<MenuItem onClick={()=>setAnchorEl(null)}>Logout</MenuItem>
								</Menu>
							</div>
						</div>
					}
					{user === 'doctor' && <div className="ms-auto login2 me-4">
							<div>
								<Button
									id="basic-button"
									aria-controls={dropDown ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={dropDown ? 'true' : undefined}
									onClick={(e)=>setAnchorEl(e.currentTarget)}
								>
									<AccountCircleOutlinedIcon style={{color:'#fff'}}/>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={dropDown}
									onClose={()=>setAnchorEl(null)}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem onClick={()=>{Navigate('/doctor/profile')}}>Profile</MenuItem>
									<MenuItem onClick={()=>setAnchorEl(null)}>Logout</MenuItem>
								</Menu>
							</div>
						</div>
					}

				</header>
				<TemporaryDrawer />
			</>
		</drawerContext.Provider>
	);
}
export default Header