import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const drawerWidth = 200;

function DashboardMain(props) {
    const { user, logOut } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ marginLeft: '50px' }}>
            <NavLink to="/" >
                <Typography sx={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'none', color: 'black', margin: "20px 0" }}>CarStore</Typography>
            </NavLink>
            <List>
                <NavLink style={{ textDecoration: 'none', color: '#322A62' }} to="/dashboard">User List</NavLink>
                <br /><br />
                <NavLink style={{ textDecoration: 'none', color: '#322A62' }} to="/dashboard/bookinglist">Product List</NavLink>
                <br /> <br />
                <NavLink style={{ textDecoration: 'none', color: '#322A62' }} to="/dashboard/addProduct">Add Product</NavLink>

                {user.email ?
                    <Button onClick={logOut} variant='contained' sx={{ mt: 5 }}>Logout</Button> :
                    <NavLink to='/login'>
                        <Button variant='contained' sx={{ mt: 5 }}>Login</Button>
                    </NavLink>
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: 'white' }}>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ color: '#322A62' }} variant="h6" noWrap component="div">
                        <NavLink style={{ textDecoration: 'none', color: '#322A62' }} to="/">Home</NavLink>
                    </Typography>
                    <Typography sx={{ color: '#322A62', ml: 'auto' }} variant="h6" noWrap component="div">
                        {user.displayName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet></Outlet>
            </Box>
        </Box>
    );
}

DashboardMain.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DashboardMain;