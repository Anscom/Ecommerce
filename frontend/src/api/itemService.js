import axios from "axios";

const API_BASE_URL = "http://localhost:8080/item";

// Fetch All Items
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allItems`);
    return response.data.items || response.data;
  } catch (error) {
    console.error("Error fetching all items", error);
    throw error;
  }
};

// Get image IDs for a specific item
export const getItemImageIds = async (itemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${itemId}/imageAmount`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching images for item ${itemId}`, error);
    return [];
  }
};

// Get image by Image Id
export const getItemImage = (imageId) => `${API_BASE_URL}/image/${imageId}`;
