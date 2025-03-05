import React from 'react'
import "./FeaturedItems.css"
import FeatureItem1 from "../../assets/featureItem1.png"
import FeatureItem2 from "../../assets/featureItem2.png"
import FeatureItem3 from "../../assets/featureItem3.png"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const FeaturedItems = () => {
  
    // Array of items
    const items = [
      { image: FeatureItem1, name: "T-shirt with Tape Details", rating: "4",review: "Great product!", price: "$19.99", discount: "20%" },
      { image: FeatureItem2, name: "T-shirt with Tape Details",rating: "3.5",review: "Highly recommended!", price: "$29.99",discount: "10%" },
      { image: FeatureItem3, name: "T-shirt with Tape Details",rating: "4.5",review: "Amazing value!", price: "$15.99",discount: "" },
      { image: FeatureItem1, name: "T-shirt with Tape Details",rating: "5",review: "Top-notch quality!", price: "$39.99",discount: "30%" },
      { image: FeatureItem2, name: "T-shirt with Tape Details",rating: "5",review: "Worth every penny!", price: "$25.99",discount: "15%" },
      { image: FeatureItem3, name: "T-shirt with Tape Details", rating: "4.5", review: "Would buy again!", price: "$49.99",discount: "" },
    ];

    const renderStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStars = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

      return (
        <div className="star-rating-container">
        {Array.from({ length: fullStars }, (_, index) => (
          <BsStarFill key={`full-${index}`} className="yellow-star" />
        ))}
        {halfStars && <BsStarHalf key="half" className="yellow-star" />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <BsStar key={`empty-${index}`} className="yellow-star" />
        ))}
        <span className="rating-text">{`${rating}/5`}</span>
      </div>
      )
    }
  
    return (
      <div className="item-container">
        <h3>NEW ARRIVALS</h3>
        <div className='item-small-container'>
        {items.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={`Featured Item ${index + 1}`} className='' />
            <h6>{item.name}</h6>
            <div className='rating'>{renderStars(item.rating)}</div>
            <p className='item-price'>{item.price}</p>
          </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedItems;