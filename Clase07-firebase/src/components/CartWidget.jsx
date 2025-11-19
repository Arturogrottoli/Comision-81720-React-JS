import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function CartWidget(){
  const { totalQty } = useCart();
  return (
    <Link to="/cart" className="row" aria-label="Carrito">
      <span>🛒</span>
      {totalQty > 0 && <span className="badge">{totalQty}</span>}
    </Link>
  )
}
