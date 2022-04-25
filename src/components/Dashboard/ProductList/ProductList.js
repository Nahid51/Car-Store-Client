import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SingleList from './SingleList';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((pd, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <SingleList
                                key={index}
                                pd={pd}
                            ></SingleList>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default ProductList;