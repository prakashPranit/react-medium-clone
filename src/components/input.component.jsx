import React from 'react'
import { User , Inbox, Lock, Eye ,EyeOff} from 'lucide-react'

const InputBox = ({name, type,id,value,placeholder,icon}) => {

    const [passwordVisible, setPasswordVisible] = React.useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
        <input className='input-box' type={ type=="password" ? passwordVisible ? "text"  :'password':type} placeholder={placeholder} id={id} name={name} defaultValue={value} />
        {icon =="user" ? <User className='input-icon' ></User> : ""}
        {icon =="email" ? <Inbox className='input-icon' ></Inbox> : ""}
        {icon =="password" ? <Lock className='input-icon' ></Lock> : ""}

        {type=="password"? passwordVisible ? <EyeOff onClick={() => setPasswordVisible(!passwordVisible)} className='input-icon left-[auto] right-4 cursor-pointer'/> : <Eye onClick={() => setPasswordVisible(!passwordVisible)} className='input-icon left-[auto] right-4 cursor-pointer'/> : ""}
    </div>
  )
}

export default InputBox