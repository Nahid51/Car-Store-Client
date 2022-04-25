import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";


const UpdateProduct = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});

    useEffect(() => {
        fetch('https://cryptic-oasis-68865.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const productData = products.find(productId => productId._id === id);
        setSingleProduct(productData);
    }, [id, products]);


    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch(`https://cryptic-oasis-68865.herokuapp.com/products/${id}`, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Product's informatoin has been successfully updated!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                    defaultValue={singleProduct?.name}
                    {...register("name", { required: true })}
                    style={{ width: "50%", padding: "10px", fontSize: 14 }}
                />

                <br /><br />

                <input
                    defaultValue={singleProduct?.description}
                    {...register("description", { required: true })}
                    style={{ width: "50%", padding: "10px", fontSize: 14 }}
                />

                <br /><br />

                <Button variant="contained" type="submit">
                    Update Product
                </Button>
            </form>
        </div>
    );
};

export default UpdateProduct;