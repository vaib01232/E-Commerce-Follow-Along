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
        const response = await axios.get("/api/cart");
        setCartItems(response.data);
        setTotalPrice(
          response.data.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchAddress = async () => {
      try {
        const response = await axios.get("/api/user/address");
        setSelectedAddress(response.data);
      } catch (error) {
        console.error("Error fetching address:", error);
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
      const userEmail = "user@example.com";

      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        totalPrice,
        address: selectedAddress,
        userEmail,
        paymentMethod,
        isPaid,
      };

      const response = await axios.post("/api/orders", orderData);

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
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>

      <div className="order-items">
        <h3>Ordered Products</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <p>
                {item.name} - {item.quantity} x ₹{item.price}
              </p>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <div className="order-address">
        <h3>Delivery Address</h3>
        {selectedAddress ? (
          <p>
            {selectedAddress.street}, {selectedAddress.city},{" "}
            {selectedAddress.pincode}
          </p>
        ) : (
          <p>Loading address...</p>
        )}
      </div>

      <div className="order-total">
        <h3>Total Price: ₹{totalPrice}</h3>
      </div>

      <div className="payment-method">
        <h3>Select Payment Method:</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery (COD)
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={() => setPaymentMethod("PayPal")}
          />
          Pay with PayPal
        </label>
      </div>

      {paymentMethod === "PayPal" && (
        <PayPalScriptProvider options={{ clientId: "AW78-TcxiCBodENWIJtudObD6al4SGS-CKaVm-qFghtbiLZz9jMfzA7W5Nf3loR8tflCjBPnpRicDyQk" }}>
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
            }}
          />
        </PayPalScriptProvider>
      )}

      {paymentMethod === "COD" && (
        <button onClick={() => placeOrder(false)} className="place-order-btn" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order (COD)"}
        </button>
      )}
    </div>
  );
};

export default OrderConfirmation;