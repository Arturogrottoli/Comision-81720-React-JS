import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ItemListContainer from './containers/ItemListContainer.jsx'
import ItemDetailContainer from './containers/ItemDetailContainer.jsx'
import Cart from './containers/Cart/Cart.jsx'
import CheckoutForm from './containers/Checkout/CheckoutForm.jsx'
import Seed from './dev/Seed.jsx'   

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenid@ a la tienda" />} />
          <Route path="/category/:cid" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/seed" element={<Seed />} /> {}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
