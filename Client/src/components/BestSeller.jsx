import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/useAppContext";
const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:3xl font medium">Best Seller</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
