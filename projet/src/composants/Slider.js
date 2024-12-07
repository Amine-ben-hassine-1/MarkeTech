import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SwipeCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Spinner from './Spinner';


// Configurer Swiper
SwipeCore.use([EffectCoverflow, Pagination]);

const Slider = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Récupérer les annonces depuis Firestore
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);

        const listingsData = [];
        querySnapshot.forEach((doc) => {
          listingsData.push({ id: doc.id, ...doc.data() });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    };

    fetchListings();
console.log(listings===null ?"loading":listings);
  }, [listings]);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="slider-container">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing.id} onClick={() => navigate(`/listing/${listing.id}`)}>
            <div className="slide-content">
              <img src={listing.imgUrls[0]} alt={listing.name} className="slide-image" />
              <h3>{listing.name}</h3>
              <p>Price: {listing.price} €</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
