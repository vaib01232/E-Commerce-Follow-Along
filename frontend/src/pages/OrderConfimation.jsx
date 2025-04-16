import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderConfirmation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const email = JSON.parse(localStorage.getItem("user"))?.email;
    
        if (!email) {
          console.error("No user email found");
          return;
        }
    
        const response = await axios.get("http://localhost:8000/product/cartproducts", {
          params: { email }
        });
    
        console.log("Cart response:", response.data);
        const cart = response.data.cart || [];
        setCartItems(cart);
    
        const total = cart.reduce(
          (acc, item) => acc + item.productid.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    

    const fetchAddress = async () => {
      try {
        const email = JSON.parse(localStorage.getItem("user"))?.email;
    
        if (!email) {
          console.error("No user email found");
          return;
        }
    
        const response = await axios.get("http://localhost:8000/auth/addresses", {
          params: { email }
        });
    
        console.log("📦 Address response data:", response.data);
    
        const firstAddress = response.data.addresses[0];
        setSelectedAddress(firstAddress);
      } catch (error) {
        console.error("❌ Error fetching address:", error);
      }
    };
    
    

    fetchCartItems();
    fetchAddress();
  }, []);

  const placeOrder = async (isPaid = false) => {
    if (!selectedAddress) {
      alert("Please select a delivery address before placing an order.");
      return;
    }

    setLoading(true);
    try {
      // const userEmail = JSON.parse(localStorage.getItem("user"))?.email; 

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.productid.name,           // Optional: whatever info you need per item
          price: item.productid.price,
          quantity: item.quantity,
        })),
        shippingAddress: selectedAddress,
      };
      
      console.log(orderData);

      const token = localStorage.getItem("token"); // or wherever you're storing it

        const response = await axios.post(
          "http://localhost:8000/order/place",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.getItem("token");
        console.log("token : ", token);

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/my-orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Order Confirmation</h2>

      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-800 mb-4">Ordered Products</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productid._id} className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between">
              <p className="text-lg text-gray-700">{item.productid.name}</p>
              <p className="text-lg text-gray-700">{item.quantity} x ₹{item.productid.price}</p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No items in the cart.</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-800 mb-4">Delivery Address</h3>
        {selectedAddress ? (
          <p className="bg-gray-100 p-4 rounded-lg text-lg text-gray-700">
            {selectedAddress.address1}, {selectedAddress.address2}, {selectedAddress.city}, {selectedAddress.country} - {selectedAddress.zipCode}
          </p>
        ) : (
          <p className="text-lg text-gray-500">Loading address...</p>
        )}
      </div>


      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-800 mb-4">Total Price: ₹{totalPrice}</h3>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Select Payment Method:</h3>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          <label className="text-lg text-gray-700">Cash on Delivery (COD)</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={() => setPaymentMethod("PayPal")}
            className="mr-2"
          />
          <label className="text-lg text-gray-700">Pay with PayPal</label>
        </div>
      </div>

        <div>
      {paymentMethod === "PayPal" && (
        <PayPalScriptProvider options={{ clientId: "AV0JTffBH2GRx69dO-QvVYoMQVN6kbkmB913444zLoEgcpW-cMxohfHshcDUmow7iZ4hls1AdiAcWSj7" }}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              // You can optionally show a success message here with details.payer.name.given_name
              placeOrder(true); // Continue with your backend logic
            });
          }}
        />
      </PayPalScriptProvider>
      
      )}

      {paymentMethod === "COD" && (
        <button
          onClick={() => placeOrder(false)}
          className="w-full py-3 bg-green-600 text-white text-lg rounded-lg mt-6 hover:bg-green-700 focus:outline-none disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order (COD)"}
        </button>
      )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
