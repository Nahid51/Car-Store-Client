import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        if (!image) {
            return;
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        fetch('http://localhost:5000/products', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'A product has been successfully added!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '50%' }}
                    onBlur={e => setName(e.target.value)}
                    label="Name"
                    type="text"
                    required
                    variant="standard" />
                <br /><br />
                <TextField
                    sx={{ width: '50%' }}
                    onBlur={e => setDescription(e.target.value)}
                    label="Description"
                    type="text"
                    required
                    variant="standard" />
                <br /><br />
                <Input
                    onBlur={e => setImage(e.target.files[0])}
                    accept="image/*"
                    type="file" />
                <br /><br />
                <Button variant="contained" type="submit">
                    Add Product
                </Button>
                <Button sx={{ ml: 2 }} variant="contained" type="reset">
                    Reset
                </Button>
            </form>
        </div>
    );
};

export default AddProduct;