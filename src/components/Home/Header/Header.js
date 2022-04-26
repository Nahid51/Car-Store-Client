import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Header.css';
import { Container } from '@mui/material';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar className='responsive'>
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}>
                                    Car Store
                                </Typography>
                            </NavLink>
                            <Box sx={{ ml: 'auto', display: 'flex' }}>
                                <NavLink to="/" style={{ textDecoration: "none" }}>
                                    <Button sx={{ color: 'white' }}>Home</Button>
                                </NavLink>
                                <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                                    <Button sx={{ color: 'white' }}>Dashboard</Button>
                                </NavLink>

                                {user.email ?
                                    <Button variant="contained" onClick={logOut} sx={{ color: 'white' }}>logout</Button>
                                    :
                                    <NavLink to="/login" style={{ textDecoration: "none" }}>
                                        <Button variant="contained" sx={{ color: 'white' }}>Login</Button>
                                    </NavLink>
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;