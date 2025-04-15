import cloudinary from "../lib/cloudinary.js";
import db from "../lib/db.js"; // Assuming you have set up mysql2 connection pool

export const getAllProducts = async (req, res) => {
  try {
    const [products] = await db.promise().query("SELECT * FROM products");
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const imageUrl = uploadRes.secure_url;

    // Insert into MySQL
    const [result] = await db.promise().query(
      `INSERT INTO products (name, description, price, image, category, is_featured, created_at, updated_at)
				VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, description, price, imageUrl, category, false]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      description,
      price,
      image: imageUrl,
      category,
    });
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    // Fetch featured products from MySQL database
    const [featuredProducts] = await db
      .promise()
      .query("SELECT * FROM products WHERE is_featured = true");

    if (featuredProducts.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // Return the featured products as a response
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    // Fetch the product from MySQL
    const [product] = await db
      .promise()
      .query("SELECT * FROM products WHERE id = ?", [req.params.id]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productData = product[0];

    if (productData.image) {
      const publicId = productData.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from Cloudinary");
      } catch (error) {
        console.log("error deleting image from Cloudinary", error);
      }
    }

    // Delete the product from MySQL
    await db
      .promise()
      .query("DELETE FROM products WHERE id = ?", [req.params.id]);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get recommended products (random 4 products)
export const getRecommendedProducts = async (req, res) => {
  try {
    const [products] = await db
      .promise()
      .query(
        "SELECT id, name, description, image, price FROM products ORDER BY RAND() LIMIT 4"
      );
    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const [products] = await db
      .promise()
      .query("SELECT * FROM products WHERE category = ?", [category]);
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle featured product
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const [product] = await db
      .promise()
      .query("SELECT * FROM products WHERE id = ?", [req.params.id]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = product[0];

    // Toggle the `is_featured` value from the database
    updatedProduct.is_featured = !updatedProduct.is_featured;

    // Update the isFeatured status in MySQL
    await db
      .promise()
      .query("UPDATE products SET is_featured = ? WHERE id = ?", [
        updatedProduct.is_featured,
        req.params.id,
      ]);

    // Send response with the `isFeatured` field to match frontend expectations
    res.json({ ...updatedProduct, isFeatured: updatedProduct.is_featured });
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
