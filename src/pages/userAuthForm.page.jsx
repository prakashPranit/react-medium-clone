import React, { useContext, useRef } from 'react'
import InputBox from '../components/input.component'
import googleIcon from "../imgs/google.png"
import { Link,Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import { Toaster, toast } from "react-hot-toast"
import axios from 'axios'
import { storeInSession } from '../common/session'
import { UserContext } from '../App'
import { authWithGoogle } from '../common/firebase'

const UserAuthForm = ({ type }) => {
  const authForm = useRef()
  
  let { userAuth,setUserAuth } = useContext(UserContext)
  
let access_token = userAuth?.user?.access_token

const handleGoogleAuth = async (e) => {
  e.preventDefault()
  try{
    const user = await authWithGoogle()
    console.log("userrr",user)
    let serverRoute = "/google-auth"
    let formData ={
      access_token:user.accessToken
    }

    userAuthServer(serverRoute,formData)
  }catch(err){
   console.log('errrrrr',err)
  }



}
  let serverRoute = type == "sign-in" ? "/signin" : "/signup"
  const userAuthServer = async (serverRoute, payload) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, payload)
      console.log(data)
      storeInSession("user", data)
      setUserAuth(data)
      toast.success(type == "sign-in" ? "Logged in successfully" : "Account created successfully")

    } catch (err) {

      toast.error(err.response?.data.message||err.message)
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let form = new FormData(formElement)
    let formData = {}
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    for (let [key, value] of form.entries()) {
      formData[key] = value
    }

    //form validation
    let { fullname, email, password } = formData
    //valide the data from frontend
    if (fullname) {
      if (fullname.length < 3) {
        toast.error(
          "Fullname must be atleast 3 characters long"
        )

      }
    }

    if (!email.length) {
      toast.error(
        "Email is required"
      )

    }
    if (!emailRegex.test(email)) {
      toast.error(
        "Email is not valid"
      )

    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be at least 6 characters long and contain at least one number, one uppercase and one lowercase letter"
      )
      return
    }
    await userAuthServer(serverRoute, formData)

  }


 

  return (

    access_token?<Navigate to="/" />: (<AnimationWrapper keyValue={type}>
        <section className='h-cover flex items-center justify-center' >
          <Toaster />
          <form id='formElement' onSubmit={handleSubmit} ref={authForm} className='w-[80%] max-w-[400px] '>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24' >
              {type == "sign-in" ? "Welcome Back" : "Join us today"}
            </h1>
            {
              type != "sign-in" ? <InputBox name={"fullname"} placeholder={"Fullname"} type={"text"} icon={"user"} /> : ""
            }
  
            <InputBox name={"email"} placeholder={"Email"} type={"email"} icon={"email"} />
            <InputBox name={"password"} placeholder={"Password"} type={"password"} icon={"password"} />
  
            <button type='submit' className='btn-dark center mt-14' > {type.replace("-", " ")}</button>
            <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold center ' >
              <hr className='w-1/2 border-black' ></hr>
              <p>Or</p>
              <hr className='w-1/2 border-black' ></hr>
            </div>
            <button onClick={handleGoogleAuth} className='btn-dark center mt-14 flex items-center justify-center gap-4 w-[90%] center' > <img src={googleIcon} className='w-5 '  ></img>  {"Continue with Google"}</button>
            {
              type == "sign-in" ? <p className='mt-6 text-dark-grey text-xl text-center' > Dont have an account <Link to={"/signup"} className='underline text-black text-xl ml-1' > Join us today </Link>  </p> : <p className='mt-6 text-dark-grey text-xl text-center' > Already a member? <Link to={"/signin"} className='underline text-black text-xl ml-1' > Sign in here </Link>  </p>
            }
  
          </form>
        </section>
      </AnimationWrapper>) 
    
    

  )
}

export default UserAuthForm