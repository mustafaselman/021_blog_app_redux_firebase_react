import React, { useState } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from "react-redux"
import { addPost, deletePost, setPostDescription, setPostDisplayName, setPostTime, setPostTitle, setPostUserId, setReactions, setReactionsReverse, updatePost, updatePostMinus, updatePostPlus } from '../post/postsSlice'
import { auth, db, usePostsListener } from '../auth/firebase'
import { Button, Card, CardActions, CardContent, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, ThemeProvider, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from '../context/AuthContext'

export default function Home() {
const user = React.useContext(UserContext);
usePostsListener();
const dispatch = useDispatch();
const posts = useSelector((state)=> state.posts.posts.slice().sort((a, b) => b.time.localeCompare(a.time)))
const theme = createTheme();
const [reaction,setReaction] = useState(false)
const [editDialogOpen,setEditDialogOpen] = React.useState(false)
const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [id,setId] = useState("")
const editHandle = (post) => {
setTitle(post.title)
setId(post.id)
setDescription(post.description)
}
const handleTitleChange = (e) => {
  setTitle(e.currentTarget.value)
}
const handleContextChange = (e) => {
  setDescription(e.currentTarget.value)
}
return (

    <div>
        <Navbar/>
        <ThemeProvider theme={theme}>
        <Container component="main">
        <CssBaseline />
        <Box 
          sx={{
            
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        {
        posts.map((post)=>(
          
        <Card key={post.id} sx={{ width: '80%', maxWidth: 800 , mt:1}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {post.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
        {post.description}
        </Typography>
       
      </CardContent>
      <CardContent>
         <Box align="right">
         <Typography variant="overline" color="red">
        Created Time:{post.time}
        </Typography>
        <br/>
        <Typography variant="overline"  color="red" >
        Created By: {post.displayName}
        </Typography>
        </Box>
      </CardContent>
      <CardActions >
      <Box style={{margin: '0 auto', display: "flex"}}>
        {
          post.userId === auth.currentUser.uid &&  
          <> 
          <Button size="small" variant='contained' sx={{marginRight: 2}} onClick={()=>{
            setEditDialogOpen(true)
            editHandle(post)
          }}>Edit</Button>
          <Button onClick={()=> {
            dispatch(deletePost(post.id))
           }}size="small" variant='contained'  >Delete</Button>
          </>
        }  
          
           <Button onClick={()=>{
          
      
              dispatch(updatePostPlus(post))
            
           }}>
          {
            post.reactPerson?.find(id => id === auth.currentUser.uid) ? <FavoriteIcon style={{ fill: 'red' }}/> : <FavoriteBorderIcon style={{ fill: 'red' }}/>
          }
          </Button>

          <Typography fontSize={25}>{post.reactions}</Typography>
          
        </Box>
      </CardActions>
    </Card>
 
        ))
      }
      <Dialog open={editDialogOpen} onClose={()=>{
            setEditDialogOpen(false)
          }}>
            <DialogTitle>
              Edit Post
            </DialogTitle>
            <DialogContent>
              
              <TextField
              label="Title"
              fullWidth
              margin="normal"
              size="small"
              value={title}
              onChange={handleTitleChange}
              ></TextField>
             
              <TextField
              label="Context"
              margin="normal"
              value={description}
              onChange={handleContextChange}
              multiline
              fullWidth
              rows={4}
              
             ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{
                dispatch(setPostTitle(title))
                dispatch(setPostDescription(description))
                dispatch(setPostTime());
                dispatch(setPostDisplayName());
                dispatch(setPostUserId());
                dispatch(addPost())
                dispatch(deletePost(id))
                setEditDialogOpen(false)
                dispatch(setPostTitle(""))
                dispatch(setPostDescription(""))

              }}>ADD</Button>
              <Button
              onClick={()=>{
                setEditDialogOpen(false)
              }}>CANCEL</Button>
            </DialogActions>
          </Dialog>
      </Box>
      </Container>
      </ThemeProvider>
    </div>
  )
}
