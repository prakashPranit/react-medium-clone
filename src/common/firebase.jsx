// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
import {GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjCz6O4LxG4Nzd2FvOGnIvEk13bbzUPQc",
  authDomain: "mern-blogging-4d19a.firebaseapp.com",
  projectId: "mern-blogging-4d19a",
  storageBucket: "mern-blogging-4d19a.appspot.com",
  messagingSenderId: "285683226704",
  appId: "1:285683226704:web:fe364df7c600c5d6861955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
const auth = getAuth()

export const authWithGoogle = async () => {
    let user = null

    const result = await signInWithPopup(auth, provider)
    user = result.user
    console.log("usefirerrr",user)
    return user
}