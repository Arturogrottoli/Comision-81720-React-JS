import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id, title, price, qty, image}

  const addItem = (product, qty) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => (p.id === product.id ? { ...p, qty: Math.min(p.qty + qty, product.stock) } : p))
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, qty, image: product.image }]
    })
  }

  const removeItem = id => setItems(prev => prev.filter(p => p.id !== id))
  const clear = () => setItems([])

  const totals = useMemo(() => {
    const totalQty = items.reduce((acc, p) => acc + p.qty, 0)
    const totalPrice = items.reduce((acc, p) => acc + p.qty * p.price, 0)
    return { totalQty, totalPrice }
  }, [items])

  const value = { items, addItem, removeItem, clear, ...totals }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
