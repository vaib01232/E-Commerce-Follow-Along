import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {LoginPage,SignupPage,Home,CreateProduct, MyProducts, Cart, ProductDetails, Profile, CreateAddress, SelectAddress, OrderConfirmation , MyOrdersPage, PrivateRoute} from "./Routes";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/create-product/:id" element={<CreateProduct />} />
        <Route path="/my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/add-address" element={<PrivateRoute><CreateAddress /></PrivateRoute>} />
        <Route path="/select-address" element={<PrivateRoute><SelectAddress /></PrivateRoute>} />
        <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
        <Route path="/myorders" element={<PrivateRoute><MyOrdersPage /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App