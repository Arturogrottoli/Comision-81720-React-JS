import { useState, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ItemListContainer from './containers/ItemListContainer.jsx'
import ItemDetailContainer from './containers/ItemDetailContainer.jsx'
import Cart from './containers/Cart/Cart.jsx'
import CheckoutForm from './containers/Checkout/CheckoutForm.jsx'

export default function App() {
  const [items, setItems] = useState([])

  const addItem = (product, qty) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => 
          p.id === product.id 
            ? { ...p, qty: Math.min(p.qty + qty, product.stock) }
            : p
        )
      }
      return [...prev, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        qty: Math.min(qty, product.stock), 
        image: product.image 
      }]
    })
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const clear = () => {
    setItems([])
  }

  const totals = useMemo(() => {
    const totalQty = items.reduce((acc, p) => acc + p.qty, 0)
    const totalPrice = items.reduce((acc, p) => acc + p.qty * p.price, 0)
    return { totalQty, totalPrice }
  }, [items])

  return (
    <>
      <NavBar totalQty={totals.totalQty} />
      <main className="container">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenid@ a la tienda" />} />
          <Route path="/category/:cid" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer items={items} addItem={addItem} />} />
          <Route path="/cart" element={<Cart items={items} removeItem={removeItem} clear={clear} totalPrice={totals.totalPrice} />} />
          <Route path="/checkout" element={<CheckoutForm items={items} totalPrice={totals.totalPrice} clear={clear} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
