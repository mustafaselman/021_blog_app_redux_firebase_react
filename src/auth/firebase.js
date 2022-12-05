
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , onSnapshot} from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPosts } from "../post/postsSlice";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const postsRef = collection (db, "posts");


export const usePostsListener = () => {
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    
    return onSnapshot(postsRef, (snapshot) => {

      const docs = snapshot.docs.map((doc)=>{
        const data = doc.data();
      
        return {id:doc.id, ...data};
      });
      console.log(docs)
      dispatch(setPosts(docs))
    });
  },[dispatch])
}


