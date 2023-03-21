import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import { toast, Toaster } from 'react-hot-toast';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('adminToken')
    const headers = {authorization:token}
    axios.get(`${adminUrl}authenticate`,{headers}).then((response)=>{
      response.status === 200 ? Navigate('/admin/home') : Navigate('/admin')
    }).catch((err)=>{
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
    })
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${adminUrl}logIn`,{email,password}).then((response)=>{
        response.data.token && localStorage.setItem('adminToken',response.data.token)
        response.data.logIn ? Navigate('/admin/home') : toast.error('Invalid Email or Password')
        
    }).catch(()=>{
        toast.error('some unexpected error please try after sometime')
    })
  };

  return (
    <>
    <Toaster/>
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url('./images/Banner.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'background.paper' : '#424242',
            p: 4,
          }}
        >
          <Avatar
            sx={{
              margin: (theme) => theme.spacing(1),
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            {/* <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={() => navigate('/ForgotPassword')}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => navigate('/Register')}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
          </StyledForm>
        </Paper>
      </Container>
    </Box>
    </>
  );
};

export default AdminLogin;
