import React, { useState, useEffect } from 'react';
import ProductCard from '../pages/Card';
import axios from 'axios';
import { useSelector } from "react-redux";
import NavBar from "../components/auth/nav";

export default function Homepage() {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const auth = useSelector((state) => state.auth);  // Access the auth state
    const isLoggedIn = auth.loginSuccessful;  // Check if the user is logged in

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://e-commerce-follow-along-78v4.onrender.com/product/get-home-products");
                setProductDetails(res.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;
    if (productDetails.length === 0) return <div>No products available</div>;

    return (
        <>
            <NavBar />
            
            {/* Display content depending on whether the user is logged in */}
            <div className='text-center'>
                {isLoggedIn ? (
                    <h2>Welcome back, {auth.name}!</h2>
                ) : (
                    <h2>Please log in to view personalized content.</h2>
                )}
            </div>

            {/* Display products */}
            <div className='grid grid-cols-5 gap-4'>
                {productDetails.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </>
    );
}
