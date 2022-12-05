import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';
import { addDoc, arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {auth, db, postsRef} from "../auth/firebase"

export const addPost = createAsyncThunk("posts/addPost",
    async (_, {getState}) => {
        await addDoc(postsRef, getState().posts.post );
        
    }
);


export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    
 await deleteDoc(doc(postsRef,id))
 })

export const updatePostPlus = createAsyncThunk("posts/updatePostPlus", async (post) => {
    const reactionRef = doc(db,"posts",post.id)
    const existingUserId = post.reactPerson.find(id =>  id === auth.currentUser.uid)
   console.log(existingUserId)
    if(!existingUserId)
    {
        await updateDoc(reactionRef, {
            reactions: increment(1),
            reactPerson: arrayUnion(auth.currentUser.uid)
        })
    }
    else
    {
        await updateDoc(reactionRef, {
            reactions: increment(-1),
            reactPerson: arrayRemove(auth.currentUser.uid)
        })
    }

    
    
    
})
export const updatePostMinus = createAsyncThunk("posts/updatePostMinus", async (reactionRef,reactions,reactPerson,user) => {

    const existingUserId = reactPerson.find(id =>  id === auth.currentUser.uid)
    if(existingUserId)
    {
        await updateDoc(reactionRef, {
            reactions: increment(-1),
            reactPerson: arrayRemove(auth.currentUser.uid)
        })
    }
})

const initialState = {

    post: {
        
        title: "",
        description:"",
        userId:"",
        displayName:"",
        time:"",
        reactions: 0,
        reactPerson: []
    },
    posts: [],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        setPosts : (state,action) => {
            state.posts = action.payload
        },
        setPostTitle : (state,action) => {
            state.post.title = action.payload
        },
        setPostDescription : (state,action) => {
            state.post.description = action.payload
        },
        setPostUserId : (state,action) => {
            state.post.userId = auth.currentUser.uid
        },
        setPostDisplayName : (state,action) => {
            state.post.displayName = auth.currentUser.displayName
        },
        setPostTime : (state,action) => {
            state.post.time = new Date().format('m-d-Y h:i:s');
        },
        setReactions : (state,action) => {
            
            const {postId} = action.payload 
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions++
            }
        },
        setReactionsReverse : (state,action) => {
            
            const {postId} = action.payload 
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions--
            }
        },
    }
    
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {setPosts, setPostDescription, setPostTitle,setPostUserId,setPostDisplayName,setPostTime,setReactions,setReactionsReverse} = postsSlice.actions

export default postsSlice.reducer