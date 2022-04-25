import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SingleList from './SingleList';
import { CircularProgress, Stack } from '@mui/material';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <h2 style={{ marginBottom: "10px" }}>All Product List</h2>
            {
                !products.length
                    ?
                    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="secondary" />
                    </Stack>
                    :
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {products.map((pd, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <SingleList
                                        key={index}
                                        pd={pd}
                                    ></SingleList>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
            }

        </div>
    );
};

export default ProductList;