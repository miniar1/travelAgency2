import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import paris from "./assets/paris.jpg";
import bali from "./assets/bali.jpg";
import tur from "./assets/tur.jpg";
import bckg from "./assets/bckg.jpg";
import "./bestDestination.css";

const BestDestination = () => {
  const images = [paris, bali, tur, bckg, paris, bali, tur, bckg];
  const links = [
    "https://www.paris.com",
    "https://www.bali.com",
    "https://www.turkey.com",
    "https://www.background.com",
    
  ];
  const titles = [
    "Paris",
    "Bali",
    "Turkey",
    "Background",
    "Paris",
    "Bali",
    "Turkey",
    "Background"
  ];
  return (
    <div className="bestD">
      <h1>The Best Season Destinations</h1>
      <h2>explore the best offre and hotels in yoour next destinations</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3} // Nombre d'images visibles
        navigation
        pagination={{ clickable: true }}
        loop={true} // Permet un défilement infini
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-slide">
            <a href="Links[index]">
              <div className="cart">
                <img src={image} alt={`Destination ${index}`} />
                <h3>{titles[index]}</h3>
              </div>
              </a>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestDestination;
