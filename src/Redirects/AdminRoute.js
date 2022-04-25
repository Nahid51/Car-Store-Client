import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, admin, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) {
        return <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
        </Stack>
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;