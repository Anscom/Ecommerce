import React from "react";
import { CreditCard, Truck, Package, Heart } from "lucide-react";
import { motion } from "framer-motion";

const slogans = [
  {
    icon: <CreditCard className="w-6 h-6 text-black" />,
    title: "Secure Payment",
    subtitle: "Elementum feugiat diam",
  },
  {
    icon: <Truck className="w-6 h-6 text-black" />,
    title: "Free Shipping",
    subtitle: "For $50 order",
  },
  {
    icon: <Package className="w-6 h-6 text-black" />,
    title: "Delivered with Care",
    subtitle: "Lacinia pellentesque leo",
  },
  {
    icon: <Heart className="w-6 h-6 text-black" />,
    title: "Excellent Service",
    subtitle: "Blandit gravida viverra",
  },
];

const IconSlogan = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b pb-10">
        {slogans.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-lime-100 rounded-full p-4">{item.icon}</div>
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IconSlogan;
