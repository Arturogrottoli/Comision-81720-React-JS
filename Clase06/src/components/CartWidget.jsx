import { Link } from 'react-router-dom'

export default function CartWidget(){
  return (
    <Link to="/cart" className="row" aria-label="Carrito">
      <span>🛒</span>
    </Link>
  )
}
