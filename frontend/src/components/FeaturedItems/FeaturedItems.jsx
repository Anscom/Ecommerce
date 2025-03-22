import React, { useState, useEffect } from "react";
import "./FeaturedItems.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import axios, { all } from "axios";
import {
  getAllItems,
  getItemImage,
  getItemImageIds,
} from "../../api/itemService";

const FeaturedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const allItems = await getAllItems();
        const lastFiveItems = allItems.sort((a, b) => b.id - a.id).slice(0, 5);
        // Step 3. Fetch image IDs only if there's image
        // Fetch image IDs for each item with images
        const itemsWithImages = await Promise.all(
          lastFiveItems.map(async (item) => {
            const imageList =
              item.imageCount > 0 ? await getItemImageIds(item.id) : [];
            return { ...item, imageId: imageList[0]?.id || null }; // Use first image ID
          })
        );
        setItems(itemsWithImages);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchItems();
  }, []);

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
    );
  };

  return (
    <div className="item-container">
      <h3>NEW ARRIVALS</h3>
      <div className="item-small-container">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              <img src={getItemImage(item.imageId)} alt={item.name} />
              <h6>{item.name}</h6>
              <div className="rating">{renderStars(item.rating || 0)}</div>
              <p className="item-price">${item.price}</p>
            </div>
          ))
        ) : (
          <p>Loading items...</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedItems;
