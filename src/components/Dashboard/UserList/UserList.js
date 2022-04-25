import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SingleUser from './SingleUser';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <div>
            <h2 style={{ marginBottom: "10px" }}>All User List</h2>
            {
                !users.length
                    ?
                    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="secondary" />
                    </Stack>
                    :
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {users.map((user, index) => (
                                <Grid item xs={4} sm={4} md={3} key={index}>
                                    <SingleUser
                                        key={index}
                                        user={user}
                                    ></SingleUser>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
            }

        </div>
    );
};

export default UserList;