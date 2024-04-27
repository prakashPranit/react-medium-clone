import React, { useContext } from 'react'
import AnimationWrapper from '../common/page-animation'
import { Toaster,toast } from 'react-hot-toast'
import {XIcon} from "lucide-react"
import Tag from './tags.component'
import { EditorContext } from '../pages/editor.pages'
import { UserContext } from '../App'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const PublishForm = () => {
let { setEditorState,blog:{title,banner,content,tags,desc},setBlog ,blog} = React.useContext(EditorContext) ;
let {userAuth} = useContext(UserContext)
let access_token = userAuth?.user?.access_token
const navigate = useNavigate()
let handleCloseEvent=  (e)=>{
  e.preventDefault()
  setEditorState("editor")
}

let handlebLogTitleChange = (e)=>{
  setBlog({...blog,title:e.target.value})
}

let handleBlogDescChange = (e)=>{
  setBlog({...blog,desc:e.target.value})
}

 //Handle default behaviour of text area on enter key press
 const  handleDescKeyDown = (e)=>{
  if(e.keyCode==13){
    e.preventDefault()
  }
}
let tagLimit=10
const handleTagKeyDown = (e)=>{
  if(e.keyCode==13 || e.keyCode==188){
    e.preventDefault()
    let tag = e.target.value;

    if(tags.length<tagLimit){
        if(!tags.includes(tag) && tag.length){
             setBlog({...blog,tags:[...tags,tag]})
        }
    }else{
      toast.error("Tag limit of 10 reached")
    }

    e.target.value=""
  }
}

let characterLimit = 200


const publishBlog = async (e)=>{

  e.preventDefault()

  if(e.target.className.includes("disable")){
    return;
  }


if(!title.length){
  return toast.error("Title is required")
}
if(!desc.length || desc.length>characterLimit){
  return toast.error("Description of 200 characters or less is required")
}
if(!tags.length){
  return toast.error("Enter atleast 1 tag to rank your blog")
}

let loadingToast = toast.loading("Publishing blog....")
let blogPayload = {
  title,
  banner,
  content,
  tags,
  desc,
  draft:false
}
 axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",blogPayload,{
  headers:{
    'Authorization':`Bearer ${access_token}`
}}).then((res)=>{
  e.target.classList.remove('disable');

  toast.dismiss(loadingToast)
  toast.success("Blog published successfully")
  setTimeout(()=>navigate("/"),500)
}).catch(({response})=>{
  e.target.classList.remove("disable")
  toast.dismiss(loadingToast)
  return toast.error(response.data.error)
})
}






  return (
   <AnimationWrapper>
    <section  className='w-scren min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-6'>
      <Toaster></Toaster>
      <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"    onClick={handleCloseEvent}>
      <XIcon />
      </button>
      <div  className='max-w-[550px] center'>
        <p className='text-dark-grey mb-1' >Preview </p>
        <div className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4' > 

        <img src ={banner}/>
        </div>
         <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2'  >{title}</h1>
         <p  className='line-clamp-2 text-xl font-gelasio leading-7 mt-4' >{desc}</p>
      </div>

<div>
  <p className='text-dark-grey mt-3' >Blog Title</p>
  <input className='input-box pl4 '  type="text" placeholder='Enter blog title' defaultValue={title}  onChange={handlebLogTitleChange} ></input>
  <p className='text-dark-grey mt-9' >Blog Description</p>
 <textarea maxLength={characterLimit} defaultValue={desc} className='h-40 resize-none leading-7 input-box pl-4'onChange={handleBlogDescChange} onKeyDown={handleDescKeyDown}    ></textarea>

 <p className='mt-1 text-dark-grey text-sm text-right'>{characterLimit - desc.length} characters left</p>
 <p>Topics -(Helps in searching and ranking your blogs)</p>
 <div className='relative input-box pl-2 py-2 pb-4'>
   <input type='text' placeholder='topics' className='sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white '   onKeyDown={handleTagKeyDown} ></input>
{
  tags.map((tag,index)=>{
    return <Tag key={index} tagIndex={index}  tag={tag} />
  })
}
</div>
<p className='mt-1 text-dark-grey text-sm text-right'>{tagLimit - tags.length} characters left</p>
 <p>Tags -(Helps in searching your blogs)</p>

  </div>
  <button onClick={publishBlog}   type='submit' className='btn-dark mt-4' > Publish</button>
  </section>
   </AnimationWrapper>
  )
}

export default PublishForm