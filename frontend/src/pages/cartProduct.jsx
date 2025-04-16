import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { useSelector } from "react-redux";  // Don't forget to import useSelector

export default function CartProduct({ _id, name, images, quantity, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);

    // Getting user email from the Redux store
    const userEmail = useSelector((state) => state.auth.email);  

    // Side effect for image carousel
    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images]);

    const handleIncrement = () => {
        const newQuantityVal = quantityVal + 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const handleDecrement = () => {
            const newQuantityVal = quantityVal - 1;
            setQuantityVal(newQuantityVal);
            updateQuantityVal(newQuantityVal);
            if (newQuantityVal===0){
                window.location.reload();
            }
        
    };
    

    const updateQuantityVal = (quantity) => {
        fetch('https://e-commerce-follow-along-78v4.onrender.com/product/cartproduct/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                productid: _id,
                quantity:quantity,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Quantity updated:', data);
            })
            .catch((err) => {
                console.error('Error updating quantity:', err);
            });
    };

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;

    return (
        <div className="h-max w-full p-4 flex justify-between border-b border-neutral-300 bg-neutral-100 rounded-lg">
            <div className="flex flex-col gap-y-2">
                <img
                    src={`https://e-commerce-follow-along-78v4.onrender.com${currentImage}`}
                    alt={name}
                    className="w-32 h-32 object-cover rounded-lg border border-neutral-300"
                />
                <div className="flex flex-row items-center gap-x-2 md:hidden">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAdd />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosRemove />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-lg font-semibold">${(price * quantityVal).toFixed(2)}</p>
                <div className="hidden md:flex flex-row items-center gap-x-2 ">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAdd />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosRemove />
                    </div>
                </div>
            </div>
        </div>
    );
}
