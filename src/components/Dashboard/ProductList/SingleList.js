import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';


const SingleList = ({ pd }) => {
    const { _id, image, description, name } = pd;

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this file!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://cryptic-oasis-68865.herokuapp.com/products/${id}`, {
                        method: 'DELETE',
                        headers: { 'content-type': 'application/json' },
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'The product has been successfully deleted!',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                if (Swal) {
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000);
                                }
                            }
                        })
                }
            })
    }
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/*;base64,${image}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <NavLink style={{ textDecoration: 'none' }} to={`/dashboard/products/update/${_id}`}>
                        <Button size="small">Update</Button>
                    </NavLink>
                    <Button onClick={() => handleDelete(_id)} size="small">Delete</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default SingleList;