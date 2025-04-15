import { useEffect } from "react";
import greenplants from "../../assets/greenplants.jpg";
import IconSlogan from "../components/IconSlogan";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div>
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
        style={{ backgroundImage: `url(${greenplants})`, height: "70vh" }}
      >
        <p className="tracking-widest text-sm mb-2 font-light">
          WELCOME TO URBAN JUNGLE CO.
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 px-4">
          Discover the Beauty of <br className="hidden sm:block" />
          Nature at Your Fingertips
        </h1>
        <Link to="/products">
          <button className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-2 rounded-full font-semibold transition">
            Shop Now
          </button>
        </Link>
      </div>
      <IconSlogan />
      <FeaturedProducts featuredProducts={products} />
    </div>
  );
};

export default HomePage;
