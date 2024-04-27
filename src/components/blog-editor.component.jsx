import React, {useContext, useEffect, useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../imgs/logo.png'
import AnimationWrapper from '../common/page-animation'
import { uploadImage } from '../common/aws'
import {Toaster,toast} from "react-hot-toast"
import { EditorContext } from '../pages/editor.pages'
import EditorJs from '@editorjs/editorjs'
import { tools } from './tools.component'
import { UserContext } from '../App'

import axios from 'axios'


const BlogEditor = () => {
  let {userAuth} = useContext(UserContext)
  let access_token = userAuth?.user?.access_token
 

let {blog,blog:{title,banner,content,tags,desc},setBlog,textEditor,setTextEditor,setEditorState} = useContext(EditorContext)

  //editor js creation on first render
  useEffect(()=>{

    if(!textEditor.isReady){
      setTextEditor(new EditorJs({
        holder:"textEditor",
        data:content,
        placeholder:"Lets write a awesome story",
        tools:tools 
    }))
    }
  

  },[])

  const handleSaveDraft = async (e)=>{


    e.preventDefault()
  
    if(e.target.className.includes("disable")){
      return;
    }
  
  
  if(!title.length){
    return toast.error("Title is required")
  }
 

  
  let loadingToast = toast.loading("Saving draft blog....")

  if(textEditor.isReady){

    textEditor.save().then(content=>{
     if(content.blocks.length){
       setBlog({...blog,content:content})
    
  let blogPayload = {
    title,
    banner,
    content,
    tags,
    desc,
    draft:true
  }
   axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",blogPayload,{
    headers:{
      'Authorization':`Bearer ${access_token}`
  }}).then((res)=>{
    e.target.classList.remove('disable');
  
    toast.dismiss(loadingToast)
    toast.success("Blog published successfully")
   
  }).catch(({response})=>{
    e.target.classList.remove("disable")
    toast.dismiss(loadingToast)
    return toast.error(response.data.error)
  })
     }else{
       return toast.error("Write something in your blog to publish it ")
     }
    })
}










  }
  

    const handleBanner = async  (e) => {

        try{
            let img = e.target.files[0];
            if(img){
                let loadingToast = toast.loading("Uploading image....")
                const response = await uploadImage(img)
                console.log("response",response)
                if(response){
                  toast.dismiss(loadingToast)
                  toast.success("Banner uploaded successfully")
            
              setBlog({...blog,banner:response})
                }
            }
        }catch(err){
            toast.dismiss(loadingToast)
            return toast.error(err)
        }    
    }
    //Handle default behaviour of text area on enter key press
   const  handleTitleKeyDown = (e)=>{
     if(e.keyCode==13){
       e.preventDefault()
     }
   }
   const handleTitleChange = (e)=>{
       let input = e.target

       //Reset height of text area in case of title change
       input.style.height='auto'
       input.style.height= input.scrollHeight + 'px'

       setBlog({...blog,title:input.value})
   }

   //Handle publish button

   const handlePublish = ()=>{
       if(!banner.length){
        return toast.error("Banner is required")
       }
       if(!title.length){
        return toast.error("Title is required")
       }
       if(textEditor.isReady){

           textEditor.save().then(content=>{
            if(content.blocks.length){
              setBlog({...blog,content:content})
              setEditorState("publish")
            }else{
              return toast.error("Write something in your blog to publish it ")
            }
           })
       }
   }





  return (
    <>
     <nav className='navbar' >
        <Toaster/>
      <Link to={"/"} className='flex-none w-10'  >
       <img src={logo} className='w-full' ></img> 
       </Link>
       <p className='max-md:hidden text-black line-clamp-1 w-full'  >{title.length ? title:"New Blog"}  </p>
       <div  className='flex gap-4 ml-auto'>
        <button onClick={handlePublish} className='btn-dark py-2' >
            Publish
        </button>
        <button onClick={handleSaveDraft}  className='btn-light py-2' >
            Save Draft
        </button>
       </div>
   </nav>
     <AnimationWrapper>
        <section>
            <div className='mx-auto max-w-[900px] w-full'>
               <div className='relative aspect-video bg-white border-4 border-grey hover:opacity-80' > 
               <label  htmlFor='uploadBanner'>
                <img src={banner}
                  className='z-20'
                />
               <input onError={e=>e.target.src=defaultBanner}  onChange={handleBanner} type="file" className='absolute w-full h-full opacity-0' id='uploadBanner'accept='.png,.jpeg,.jpg' hidden  />
               </label>

               </div>
              {/*  The outline class in text area removes the border of the text area  and the resize -none class disable resizing of the text area */}
               <textarea placeholder='Blog Title' className='text-3xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                 onKeyDown={handleTitleKeyDown}
                 onChange={handleTitleChange}
                 defaultValue={title}
               >
                
                </textarea> 

                <hr  className='w-full opacity-20 margin-5 '/>

                <div id='textEditor' className='font-gelasio' >

                </div>
            </div>
        </section>
     </AnimationWrapper>
    </>
  
  )
}

export default BlogEditor