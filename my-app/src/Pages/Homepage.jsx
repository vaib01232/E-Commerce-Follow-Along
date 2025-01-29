import React from "react";
import ProductCard from "../components/ProductCard";

const productDetails = [
  {
    image: "https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY24_UP_HP_4span_D?$promotionTilesDesktop4span$&fmt=png-alpha",
    name: "Product 1",
    price: "$2",
    description: "Extremely overpriced TV",
  },
  {
    image: "https://m.media-amazon.com/images/I/61vIICn1JOL._SX522_.jpg",
    name: "Product 2",
    price: "$1",
    description: "Extremely overpriced headphones",
  },
  {
    image: "https://m.media-amazon.com/images/I/81M9g3GdjFL._SX522_.jpg",
    name: "Product 3",
    price: "$10",
    description: "Extremely overpriced home theater",
  },
  {
    image: "https://m.media-amazon.com/images/I/61nTNphSBvL._SX679_.jpg",
    name: "A Gaming Laptop",
    price: "$15",
    description: "Nice laptop but not for laps",
  },
];

const Homepage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-5 gap-4 p-4">
        {productDetails.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
