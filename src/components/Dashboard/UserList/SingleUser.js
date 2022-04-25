import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const SingleUser = ({ user }) => {
    const { email, displayName } = user;
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default SingleUser;