import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const groupedProducts = products?.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 max-w-screen-xl mx-auto">
      {Object.entries(groupedProducts || {}).map(([category, items], index) => (
        <div key={category} className="mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      ))}

      {(!products || products.length === 0) && (
        <h2 className="text-3xl font-semibold text-gray-300 text-center">
          No products found
        </h2>
      )}
    </div>
  );
};

export default ProductPage;
