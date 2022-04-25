import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import register from '../images/register.jpg';
import Header from '../components/Home/Header/Header';
import Swal from 'sweetalert2';

const Register = () => {

    const [loginData, setLoginData] = useState({});
    const { user, userRegistration, isLoading, error } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);

    }

    const handleRegisterButton = e => {
        e.preventDefault();
        if (loginData.password !== loginData.password2) {
            Swal.fire({
                icon: 'error',
                title: 'Your password did not match!',
                showConfirmButton: false,
                timer: 2000
            });
            return
        }
        userRegistration(loginData?.email, loginData?.password, loginData.name, location, navigate);
    }

    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                        <Typography variant="body1" gutterBottom sx={{ color: '#5ce7ed', fontSize: 18, fontWeight: 700 }}>Register</Typography>
                        {!isLoading && <form onSubmit={handleRegisterButton}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="Your Name"
                                name="name"
                                type="text"
                                onBlur={handleOnBlur}
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="Your Email"
                                name="email"
                                type="email"
                                onBlur={handleOnBlur}
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="Your Password"
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                label="ReType Your Password"
                                type="password"
                                name="password2"
                                onBlur={handleOnBlur}
                                variant="standard" />

                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained" className="btn-grad">Register</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/login">
                                <Button variant="text" sx={{ color: '#5ce7ed' }}>Already Registered? Please Login</Button>
                            </NavLink>
                        </form>}
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '100%' }} src={register} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Register;