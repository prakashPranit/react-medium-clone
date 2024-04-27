import React from 'react'
import logo from '../imgs/logo.png'
import {Link,Outlet} from "react-router-dom"
import { Search ,FileEdit,Bell} from "lucide-react"
import { UserContext } from '../App'
import UserNavigationPanel from './user-navigation.component'


 const Navbar = () => {

const [searchBoxVisibility, setSearchBoxVisibility] = React.useState(false)
const [userNavPanel,setUserNavPanel] = React.useState(false)
const {userAuth} = React.useContext(UserContext)
let access_token = userAuth?.user?.access_token
console.log(userAuth.user)
let profile_img = userAuth.user?.profile_img

//close the user panel on outside click,as onBlur triggeres when the displayed element is not in focus
const handleOutsideClickUserPanel = () => {
  //delays the closing of the user panel if clicked on navigation panel links so that navigation can occur before the user panel is closed
  setTimeout(() => {
    setUserNavPanel(false)
  },200)

}


  return (
    <>
      <nav className='navbar'>
       <Link to={"/"} className='flex-none w-10'  >
       <img src={logo} className='w-full' ></img> 
       </Link>
       <div className={'absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show '  + (searchBoxVisibility ? 'show' : 'hide')}>
        <input type="text" placeholder='Search' className=' placeholder:text-dark-grey  w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 md:pl-12 rounded-full ' >
        
        </input>
        <Search  className='absolute right-[10%] md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey' />
       </div>

       <div className='flex items-center gap-3 md:gap-6 ml-auto' >
        <button onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}   className=' border-2 md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center   '>
       <Search className='text-xl ' ></Search>
        </button>

        <Link to={'/editor'} className='hidden md:flex gap-2 link ' > <FileEdit></FileEdit>   <p>Write</p></Link>

        {access_token?<><Link to="/dashboard/notification">
        <button className="w-12 h-12 rounded-full bg-grey relative border-2 hover:bg-black/10" >
         <Bell className='text2xl block mt-1 center  ' ></Bell>
        </button>

        </Link>
        <div onClick={() => setUserNavPanel(!userNavPanel)} onBlur={handleOutsideClickUserPanel}   className='relative mt-1'>
            <button   className='relative'>
              <img src={profile_img} className='w-12 h-12 object-cover rounded-full border-2' ></img>
            </button>

            {
              userNavPanel ? <UserNavigationPanel ></UserNavigationPanel> : null
            }
        </div>
        
        </>: <>
        <Link className='btn-dark py-2 ' to={'/signin'}> Sign In</Link>
        <Link className='btn-light py-2 hidden md:block ' to={'/signup'}> Sign Up</Link>
        </>}
        
       </div>
       
     
    
    </nav>
    {/* for rendering nested routes */}
    <Outlet></Outlet>
    </>
  
  )
}

export default Navbar
