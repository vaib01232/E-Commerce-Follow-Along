import React, { useState, useEffect } from 'react';
import CartProduct from '../pages/cartProduct';
import NavBar from '../components/auth/nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.email);

  useEffect(() => {
    if (!userEmail) return;
  
    fetch(`http://localhost:8000/product/cartproducts?email=${userEmail}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.cart.map(product => ({ 
          quantity: product.quantity, 
          ...product.productid 
        })));
        console.log("🛒 Cart fetched:", data.cart);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [userEmail]);
  
    

      const handlePlaceOrder = () => {
        navigate('/select-address'); 
      };

      return (
        <div className='w-full h-screen'>
          <NavBar />
          <div className='w-full h-full justify-center items-center flex'>
            <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col'>
              <div className='w-full h-16 flex items-center justify-center'>
                <h1 className='text-2xl font-semibold'>Cart</h1>
              </div>
              <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-2'>
              {products.map((product, index) => (
                <CartProduct key={product.productid || index} {...product} />
              ))}

              </div>
              <div className='w-full p-4 flex justify-end'>
                <button
                  onClick={handlePlaceOrder}
                  className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
                >
                  Place Order
                </button>
              </div>
            </div>
            </div>
    </div>
  );
}

export default Cart;
