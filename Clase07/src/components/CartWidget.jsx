import { Link } from 'react-router-dom'

export default function CartWidget({ totalQty }){
  return (
    <Link to="/cart" className="row" aria-label="Carrito">
      <span>🛒</span>
      {totalQty > 0 && <span className="badge">{totalQty}</span>}
    </Link>
  )
}
