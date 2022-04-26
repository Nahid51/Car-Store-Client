import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Container, createTheme, ThemeProvider, Typography } from '@mui/material';

import { Autoplay, Pagination, Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/virtual';


const Hero = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch("https://cryptic-oasis-68865.herokuapp.com/products")
            .then(res => res.json())
            .then(data => setProductData(data))
    }, []);

    const theme = createTheme();

    theme.typography.h1 = {
        fontSize: '2rem',
        '@media (min-width:480px) and (max-width:600px)': {
            fontSize: '2rem',
        },
        '@media (max-width:480px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '3rem',
        },
    };

    return (
        <Container>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, Virtual]}
                className="mySwiper"
            >
                {
                    productData?.map((data, index) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <div>
                                <img src={`data:image/*;base64,${data?.image}`} alt="Poster" />
                                <div className="setPosition">
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h1">{data?.name}</Typography>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Container>
    );
};

export default Hero;