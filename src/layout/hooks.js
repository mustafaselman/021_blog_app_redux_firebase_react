import { onAuthStateChanged } from "firebase/auth";
import {useEffect, useState} from "react"
import { auth } from "../auth/firebase";


export const useIsLoggedIn = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(null);
   
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=> {
            console.log(user)
            setIsLoggedIn(!!user)
        });
    },[]);

    return isLoggedIn;
}