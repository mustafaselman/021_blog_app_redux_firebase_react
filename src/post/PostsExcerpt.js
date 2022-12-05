import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { UserContext } from "../context/AuthContext";

const PostsExcerpt = ({ post }) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    
   
return (
        <Grid
  container
  direction="column"
  justifyContent="flex-start"
  alignItems="center"
>

    <Card sx={{ maxWidth: 600, alignItems: 'center', marginTop: '40', m:1}}>
        
      <CardMedia
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {post.publishedAt}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {post.author}
        </Typography>
      </CardContent>
      <CardActions>
        
    <Button onClick={()=>{
        user ? window.location.href = post.url : (toast.warn("Firstly you must login", {position: toast.POSITION.TOP_RIGHT})) && (navigate("/login"))
           
            
    }    
    }size="small">View Detail</Button>
        
      </CardActions>
    </Card>
    </Grid>    
)}
export default PostsExcerpt