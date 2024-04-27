import React from 'react'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'
import BlogEditor from '../components/blog-editor.component'
import PublishForm from '../components/publish-form.component'
import defaultBanner from "../imgs/blogBanner.png"

const blogStructure = {
    title:'',
    banner:defaultBanner,
    content:[],
    tags:[],
    desc:'',
    author:{
        personal_info:{
            
        }
    }
}

export const EditorContext =React.createContext({})
const Editor = () => {
    const [blog,setBlog] = React.useState(blogStructure)
    const [editorState,setEditorState] = React.useState("editor")
    ///editor js specific state

    const [textEditor ,setTextEditor] = React.useState({
      isReady:false
    })

    let {userAuth,setUserAuth} = React.useContext(UserContext)
    let access_token = userAuth.user?.access_token
  return (
    <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor,setTextEditor}}>

    {access_token===null?<Navigate to="/signin"/>:editorState==="editor"?<BlogEditor/>:<PublishForm/>}
    </EditorContext.Provider>

  )
}

export default Editor