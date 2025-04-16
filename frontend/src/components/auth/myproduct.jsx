import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Myproduct({ _id, name, images, description, price, onDelete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  const currentImage = images && images.length > 0
  ? `http://localhost:8000/${images[currentIndex]}`
  : null;

  const handleEdit = () => {
    navigate(`/product/create-product/${_id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/product/delete-product/${_id}`
      );
      if (response.status === 200) {
        alert("Product deleted successfully!");
        window.location.reload();
        if (onDelete) onDelete(_id); 
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  const handleDetail = () => {
    navigate(`/product-detail/${_id}`);
  };

  return (
    <div
      onClick={handleDetail}
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full max-w-sm mx-auto"
    >
      <h1 className="text-xl font-semibold mb-2 text-gray-800">{name}</h1>
      {currentImage && (
        <img
          src={currentImage}
          alt={`Image of ${name}`}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-medium text-indigo-600 mb-4">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(price)}
      </p>
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
  
}

export default Myproduct;
