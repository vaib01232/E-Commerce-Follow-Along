import React from "react";

const Card = ({ name, image, price }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default Card;