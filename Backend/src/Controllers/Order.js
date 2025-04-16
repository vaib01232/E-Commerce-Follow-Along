const {Router}=require('express');
const auth = require('../Middleware/Auth');
const user=require("../Model/userModel");
const orders = require('../Model/OrderSchema');
const rolemiddleware = require('../Middleware/role');
const orderrouter=Router()
const paypal = require('@paypal/paypal-server-sdk');

orderrouter.post('/place', auth, async (req, res) => {
    try {
        const email = req.user;
        const userDoc = await user.findOne({ email });
        const { orderItems, shippingAddress } = req.body;

        // Validate request data
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required.' });
        }
        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required.' });
        }

        if (!userDoc) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const paymentData = {
            intent: "sale",
            payer: { payment_method: "paypal" },
            transactions: [{ amount: { total: totalAmount.toFixed(2), currency: "INR" } }],
            redirect_urls: {
                return_url: "http://localhost:8000/success",
                cancel_url: "http://localhost:8000/cancel"
            },
        };

        paypal.payment.create(paymentData, async (error, payment) => {
            if (error) {
                console.error("Payment creation error:", error);
                return res.status(500).json({ message: "Payment creation failed" });
            }

            const orderPromises = orderItems.map(async (item) => {
                const order = new orders({
                    user: userDoc._id,
                    orderItems: [item],
                    shippingAddress,
                    totalAmount,
                    paymentID: payment.id
                });

                return order.save();
            });

            const savedOrders = await Promise.all(orderPromises);
            res.status(201).json({ message: 'Orders placed and cart cleared successfully.', orders: savedOrders });
        });

    } catch (error) {
        console.error('Error placing orders:', error);
        res.status(500).json({ message: error.message });
    }
});


orderrouter.get("/getorder",auth,async(req,res)=>{
    try{
      const email=req.user
      if(!email){
        return res.status(404).json({message:"not found "})
      }
     const orderhistory=await orders.find({email:email})

     console.log(orderhistory)
    res.status(200).json({orders:orderhistory})
    }
    catch(err){
        console.log(err)
    }
})

orderrouter.patch('/cancel-order/:orderId',auth,rolemiddleware(['user']), async (req, res) => {
    try {
        const { orderId } = req.params;
       
        // Find the order by ID
        const order = await orders.findById(orderId);
        console.log(order);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Update order status to 'cancelled'
        if(order.orderStatus==['Delivered']){
            res.status(404).json({ message: 'Order is already delivered'});
        }

        order.orderStatus = ['Cancelled'];
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully.', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: error.message });
    }
});

orderrouter.post('/verify-payment',auth,async(req,res)=>{
    const {orderId}=req.user

    paypal.payment.get(orderId,async(error,payment)=>{
        if(error){
            res.status(500).json({message:"there is error"})
        }
        if(payment.state!=="approved"){
            res.status(500).json({message:"cancel payment"})
        }
        await orders.findByIdAndUpdate(orderId,{orderStatus:'Paid'})  
    })

})

module.exports=orderrouter
