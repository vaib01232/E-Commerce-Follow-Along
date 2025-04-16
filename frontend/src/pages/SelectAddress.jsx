import React, { useState, useEffect } from 'react';
import NavBar from '../components/auth/nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';  // Import useSelector to get the user's email from Redux

const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // Retrieve user email from Redux store
    const userEmail = useSelector((state) => state.auth.email);

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!userEmail) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                // Use the email from Redux to fetch addresses
                const response = await axios.get('http://localhost:8000/auth/addresses', {
                    params: { email: userEmail },
                });

                if (response.status !== 200) {
                    // Handle specific HTTP errors
                    if (response.status === 404) {
                        throw new Error('User not found.');
                    } else if (response.status === 400) {
                        throw new Error('Bad request. Email parameter is missing.');
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }

                const data = response.data;
                if (data && Array.isArray(data.addresses)) {
                    setAddresses(data.addresses);
                } else {
                    setAddresses([]);
                    console.warn('Unexpected response structure:', data);
                }
            } catch (err) {
                console.error('Error fetching addresses:', err);
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [userEmail]);

    const handleSelectAddress = (addressId) => {
        navigate('/order-confirmation', { state: { addressId, email: userEmail } });
    };

    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <p className='text-lg'>Loading addresses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <p className='text-red-500 text-lg mb-4'>Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <NavBar />
            <div className='flex-grow flex justify-center items-center p-4'>
                <div className='w-full max-w-4xl border border-neutral-300 rounded-md flex flex-col p-6 bg-white shadow-md'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Select Shipping Address</h2>
                    {addresses.length > 0 ? (
                        <div className='space-y-4 overflow-auto max-h-96'>
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className='border p-4 rounded-md flex justify-between items-center hover:shadow-md transition-shadow'
                                >
                                    <div>
                                        <p className='font-medium'>
                                            {address.address1}{address.address2 ? `, ${address.address2}` : ''}, {address.city}, {address.state}, {address.zipCode}
                                        </p>
                                        <p className='text-sm text-gray-600'>{address.country}</p>
                                        <p className='text-sm text-gray-500'>Type: {address.addressType || 'N/A'}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectAddress(address._id)}
                                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
                                    >
                                        Select
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-700'>No addresses found. Please add an address.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectAddress;
