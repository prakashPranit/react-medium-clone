import React from 'react'
import {XIcon} from "lucide-react"
import { EditorContext } from '../pages/editor.pages'

const Tag = ({tag,tagIndex}) => {

    let {setBlog,blog:{tags},blog} = React.useContext(EditorContext)
const handleTagDelete = ()=>{
    tags= tags.filter(t=>t!=tag)
    setBlog({...blog,tags})
}


const handleTagEdit = (e)=>{
    if(e.keyCode==13 || e.keyCode==188){
     e.preventDefault()
     //inner text and not target.value as it is a paragraph
      tags[tagIndex]=e.target.innerText
      setBlog({...blog,tags})
          //Making the tag paragraph non -editable on click of the tag
      e.target.setAttribute(contentEditable,"false")

}}

const handleTagClick = (e)=>{
    //Making the tag paragraph editable on click of the tag
    e.target.setAttribute(contentEditable,"true")
    e.target.focus()
}

  return (
    <div className='relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10'  >
        {/* editable paragraph */}
        <p  onKeyDown={handleTagEdit} onClick={handleTagClick}     className='outline-none text-medium'>
            {tag}
        </p>
        <button onClick={handleTagDelete}   className='mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2 ' >
        <XIcon className=' pointer-events-none ml-2' />
        </button>
        </div>
  )
}

export default Tag