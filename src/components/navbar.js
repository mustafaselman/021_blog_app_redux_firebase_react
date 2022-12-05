import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { toast } from 'react-toastify';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, setPostDescription, setPostDisplayName, setPostTime, setPostTitle, setPostUserId } from '../post/postsSlice';

export default function Navbar() {
    const navigate = useNavigate();
    const user = React.useContext(UserContext);
    const title = useSelector((state)=>(state.posts.post.title))
    const context = useSelector((state)=>(state.posts.post.description))
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
      dispatch(setPostTitle(e.currentTarget.value))
    }
    const handleContextChange = (e) => {
      dispatch(setPostDescription(e.currentTarget.value))
    }
    const logout = async () =>
  {
    await signOut(auth)
    toast.success("Signout successful...", {
      position: toast.POSITION.TOP_RIGHT
    });
    localStorage.removeItem("searchedAdress");
     
  }
  const [addPostDialogOpen,setAddPostDialogOpen] = React.useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar 
          sx={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          <Typography variant="h6" component="div" sx={{ display: { xs:"none", sm:"block"}}}>
            <Typography variant="h6" component="span" sx={{ color: 'yellow' }}>Blog</Typography>Live
          </Typography>
          
          <RssFeedTwoToneIcon sx={{display: { xs:"block", sm:"none"}}}/>
          
          {user ? (
            <div>
              <Typography component="label" sx={{ color: 'yellow' }} >{user?.displayName ? ("Welcome  " + user.displayName) : user.email}</Typography>
              
              <Button onClick={()=>{setAddPostDialogOpen(true)}} color="inherit" >Add Post</Button>
              <Button onClick={logout} color="inherit" >Sign Out</Button>
            </div>
          ) : (<div>
            <Button onClick={()=>{navigate("/")}} color="inherit">Login</Button>
            <Button onClick={()=>{navigate("/register")}} color="inherit">Register</Button>
          </div>)
          }
          <Dialog open={addPostDialogOpen} onClose={()=>{
            setAddPostDialogOpen(false)
          }}>
            <DialogTitle>
              Add New Post
            </DialogTitle>
            <DialogContent>
              
              <TextField
              label="Title"
              fullWidth
              margin="normal"
              size="small"
              value={title}
              onChange={handleTitleChange}></TextField>
             
              <TextField
              label="Context"
              margin="normal"
              multiline
              fullWidth
              rows={4}
              value={context}
              onChange={handleContextChange}
             ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{
                dispatch(setPostTime());
                dispatch(setPostDisplayName());
                dispatch(setPostUserId());
                dispatch(addPost());
                setAddPostDialogOpen(false)
                dispatch(setPostTitle(""))
                dispatch(setPostDescription(""))
              }}>ADD</Button>
              <Button
              onClick={()=>{
                setAddPostDialogOpen(false)
              }}>CANCEL</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}