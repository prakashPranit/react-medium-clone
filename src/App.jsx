import { Routes,Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import React ,{ useEffect } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";

export const UserContext = React.createContext({})
const App = () => {

    const [userAuth,setUserAuth] = React.useState({})
    
    useEffect(()=>{
       let userInSession = lookInSession("user")
       userInSession? setUserAuth(userInSession) : setUserAuth({access_token:null}) 
    },[])

    return (
        <UserContext.Provider  value={{userAuth,setUserAuth}} >
          <Routes>


            <Route path="/editor" element={<Editor/>}/>
            <Route path='/' element={<Navbar/>} >
            <Route index element={<HomePage/>}/>
            <Route path='/signin' element={<UserAuthForm type={"sign-in"} />} />
            <Route path='/signup' element={<UserAuthForm type={"sign-up"} />} />
            </Route>
            
         </Routes>
   
        </UserContext.Provider>
    
    )
}

export default App;