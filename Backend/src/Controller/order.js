const express = require('express');
const router = express.Router();
const Order = require('../Controller/order'); 
const User = require('../Models/orderModel');   

router.post('/place-order', async (req, res) => {
    try {
        const { email, orderItems, shippingAddress } = req.body;
        
        if (!email) {   
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required.' });
        }   
        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required.' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const orderPromises = orderItems.map(async (item) => {
            const totalAmount = item.price * item.quantity;
            
            const order = new Order({
                user: user._id,
                orderItems: [item], 
                shippingAddress,
                totalAmount,    
            });
            return order.save();
        });
        const orders = await Promise.all(orderPromises);
        
        res.status(201).json({ message: 'Orders placed and cart cleared successfully.', orders });
    } catch (error) {
        console.error('Error placing orders:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;