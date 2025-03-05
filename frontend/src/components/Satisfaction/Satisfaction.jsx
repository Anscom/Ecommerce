import React from 'react';
import './Satisfaction.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons

const NextArrow = ({ onClick }) => (
  <button className="slick-arrow next" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow prev" onClick={onClick}>
    <FaChevronLeft />
  </button>
);


const testimonials = [
  {
    name: "John Doe",
    rating: 5,
    comment: "This service is amazing! Highly recommend to everyone.",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great experience, but there's room for improvement.",
  },
  {
    name: "Alice Johnson",
    rating: 5,
    comment: "Absolutely loved it! Will use it again for sure.",
  },
];

const Satisfaction = () => {
  var settings = {
    dots: false, // Disable dots (remove pagination)
    infinite: true, // Allow infinite looping
    speed: 500,
    slidesToShow: 3, // Show 3 slides for better centering
    slidesToScroll: 1, // Scroll one at a time
    centerMode: true, // Centers the active slide
    centerPadding: "50px", // Adds space around slides
    nextArrow: <NextArrow />, // Add custom next arrow
    prevArrow: <PrevArrow />, // Add custom previous arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
    ],
  };
  
  

  return (
    <div className="satisfaction-container">
      <h3 className='title'>OUR HAPPY CUSTOMERS</h3>
      <div className='slider-container'>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} >
            <div className="stars">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <BsStarFill key={i}/>
              ))}
            </div>
            <h6>{testimonial.name}</h6>
            <p>"{testimonial.comment}"</p>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default Satisfaction;