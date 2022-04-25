import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import login from '../images/login.jpg';
import Header from '../components/Home/Header/Header';

const Login = () => {

    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, error, googleSignIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginUser(loginData?.email, loginData?.password, location, navigate)
    }

    const handleGoogleSignIn = () => {
        googleSignIn(location, navigate);
    }
    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                        <Typography variant="body1" gutterBottom sx={{ color: '#5ce7ed', fontWeight: 700, fontSize: 18 }}>Login</Typography>
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="Your Email"
                                name="email"
                                onChange={handleOnChange}
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="Your Password"
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                variant="standard" />

                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained" className="btn-grad">Sign In</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/register">
                                <Button variant="text" sx={{ color: '#5ce7ed' }}>New User? Please Register</Button>
                            </NavLink>
                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert severity="success">Login successfully!</Alert>}
                            {error && <Alert severity="error">{error}</Alert>}
                        </form>
                        <Typography>---------------------------------</Typography>
                        <Button onClick={handleGoogleSignIn} sx={{ width: '50%', m: 1 }} type="submit" variant="contained" className="btn-grad">Google Sign In</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '100%' }} src={login} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;