import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductCard = ({ product }) => {
  const { name, description, price, stock, images } = product;

  const email = useSelector((state) => state.auth.email);
  const User_name = useSelector((state) => state.auth.name);
  const avatar = useSelector((state) => state.auth.avatar);

  const user = { email, User_name, avatar };
  console.log("Product data:", product);

  const addToCart = async () => {
    if (!email) {
        alert("Please login to add items to cart.");
        return;
    }

    if (!product || !product.id || !product.name) {
        alert("Product data is incomplete.");
        return;
    }

    const data = {
        email,
        productid: product.id,
        productname: product.name,
        quantity: 1,  // You could replace 1 with a dynamic quantity
    };


    try {
        await axios.post("http://localhost:8000/product/cart", data, { withCredentials: true });
        alert("Added to cart!");
    } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart");
    }
};


  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl mt-8 ml-8">
      <img
        src={`http://localhost:8000/${images[0]}`}
        alt={name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-green-600">${price}</span>
        <span className={`text-sm font-medium ${stock > 0 ? "text-blue-500" : "text-red-500"}`}>
          {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
        </span>
      </div>

      <button
        onClick={addToCart}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
