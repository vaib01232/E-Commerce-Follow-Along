const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const User = require('../Models/userModel');  
const authMiddleware = require('../middleware/authMiddleware'); 

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    req.user = { id: 'extracted-from-token' };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

router.post('/place-order', authMiddleware, async (req, res) => {
    try {
        const { orderItems, shippingAddress } = req.body;
        const userId = req.user.id;
        
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required.' });
        }   
        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required.' });
        }
        
        
        const totalAmount = orderItems.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
        
        const order = new Order({
            user: userId,
            orderItems,
            shippingAddress,
            totalAmount,
            status: 'Pending',
            createdAt: new Date()
        });
        
        const savedOrder = await order.save();
        
        res.status(201).json({ 
            message: 'Order placed successfully.', 
            order: savedOrder 
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/my-orders', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from auth middleware

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 }) // Most recent first
            .populate('orderItems.product'); // If you need product details
        
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message });
    }
});


router.patch('/cancelorder/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log("fff")
        const order = await Order.findById(orderId);
        console.log(order);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.orderStatus = 'Cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully.', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;