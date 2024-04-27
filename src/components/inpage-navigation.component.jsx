import React, { useEffect, useRef } from 'react'

const InpageNavigation = ({routes,defaultActiveIndex=0,defaultHidden=[],children}) => {

  let activeTabLineRef = useRef(null)

  let activeTabRef = useRef(null)

  let [activeRoute,setActiveRoute] = React.useState(defaultActiveIndex)

  let changePageState = (btn,index)=>{
      let {offsetWidth, offsetLeft} = btn

      activeTabLineRef.current.style.width = offsetWidth+"px"
      
      activeTabLineRef.current.style.left = offsetLeft+"px"
console.log("jdjjd",index)
      setActiveRoute(index)
  }

  useEffect(()=>{
      changePageState(activeTabRef.current,defaultActiveIndex)
  },[])

  return (
    <>
        <div  className='relative mb-8 bg-white border-grey flex flex-nowrap  overfolow-x-auto'>

            {routes.map((route,index)=>{

            return(<button ref={index==defaultActiveIndex? activeTabRef:null}    onClick={(e)=> changePageState(e.target,index)}  
             key={index} className={"p-4 px-5 capitalize" +( activeRoute==index ? " text-black font-bold" : " text-black") +(defaultHidden.includes(route)?" md:hidden ":"") }>{route}</button>) 
            })}

            <hr ref={activeTabLineRef}  className='absolute bottom-0 duration-300' />
        </div>

        {Array.isArray(children) ? children[activeRoute]:children}
    </>

  )
}

export default InpageNavigation