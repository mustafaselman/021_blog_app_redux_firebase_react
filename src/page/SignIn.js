import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        BreakingNews
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

    const navigate = useNavigate();
    const [loginEmail,setLoginEmail]=React.useState("");
    const [loginPassword,setLoginPassword]=React.useState("");
    
    const login = async () => {
      try{
         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          toast.success('Login Successfully', {position: toast.POSITION.TOP_RIGHT})
          console.log(user)
         navigate("/home");
      }
      catch(error){
        console.log(error.massage);
        toast.error("Not Valid Email or Password ...", {
          position: toast.POSITION.TOP_RIGHT
        });
        
      }
    }
  
  
   const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Login Successfully', {position: toast.POSITION.TOP_RIGHT})
      navigate("/home");
    }
    catch(error){
      console.log(error.message)
      toast.error("Sign in Google errors ...", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
   }
    const sendNewPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, loginEmail)
        console.log("message send")
        toast.success('Mail has been send for reset password to your email account...', {position: toast.POSITION.TOP_RIGHT})
      } 
      catch(error) {
        console.log(error.message)
        toast.error("Please enter email adress...", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{setLoginEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>{setLoginPassword(event.target.value)}}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={sendNewPassword} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}