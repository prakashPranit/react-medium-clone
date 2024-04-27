import React from 'react'
import AnimationWrapper from '../common/page-animation'
import { Link } from 'react-router-dom'
import {FileEdit } from "lucide-react"
import { UserContext } from '../App'
import { removeFromSession } from '../common/session'

const UserNavigationPanel = () => {

    const {userAuth,setUserAuth } = React.useContext(UserContext)
    const username = userAuth.user?.username

    const signout = () => {
        removeFromSession("user")
        setUserAuth({
            access_token:null
        })
    }
  return (
    <AnimationWrapper className="absolute right-0 z-50 "  transition={{duration:0.2}}>
 <div className='bg-white absolute right-0 border-grey border-2  w-60 overflow-hidden duration-200  mt-2'>
    <Link to={"/editor"} className="flex gap-2  link md:hidden pl-8 py-4 " >
    <FileEdit></FileEdit>   <p>Write</p>
    </Link>
    <Link to={`/user/${username}`} className=" link pl-8 py-4 " > Profile</Link>
    <Link to={`/dashboard/blogs`} className=" link pl-8 py-4 " > Dashboard</Link>
    <Link to={`/setting`} className=" link pl-8 py-4 " > Settings</Link>
    <span className='absolute border-t border-grey  w-[100%]' ></span>
    <button onClick={signout}   className='text-left p-4 hover:bg-grey w-full pl-8 py-4' >
        <h1 className='font-bold text-xl mb-1' >Sign Out</h1>
        <p>@{username}</p>
    </button>
 </div>
    </AnimationWrapper>
   
  )
}

export default UserNavigationPanel