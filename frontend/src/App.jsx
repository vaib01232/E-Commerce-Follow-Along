
import {Routes, Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Pages/Homepage'
import Cart from './Pages/CArt'
import MyProducts from './Pages/MyProducts'
import AddressForm from './Pages/AddressForm'
import { Productform } from './Pages/ProductForm'
import { ProductCardForSeller } from './Components/ProductCardForSeller'
import OrderConfirmation from './Pages/OrderConfirmation'
import SelectAddress from './Pages/SelectAddress'
import './App.css'
import Profile from './Pages/Profile'
import PrivateRoute from './router/PrivateRouter'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/my-products' element={<MyProducts />}></Route>
      <Route path='/create-product' element={<PrivateRoute><Productform /></PrivateRoute>}></Route>
      <Route path='/my-product' element={<ProductCardForSeller/>}/>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/add-address' element={<AddressForm />}></Route>
      <Route path='/select-address' element={<SelectAddress />}></Route>
      <Route path='/confirm-order' element={<OrderConfirmation />}></Route>
    </Routes>

    </>
  )
}

export default App