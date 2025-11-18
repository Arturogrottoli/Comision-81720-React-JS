import { NavLink, Link } from 'react-router-dom'
import CartWidget from './CartWidget.jsx'

const active = ({ isActive }) => ({ color: isActive ? 'var(--accent)' : undefined })

export default function NavBar(){
  return (
    <nav className="nav">
      <Link to="/" className="logo">CoderShop</Link>
      <NavLink to="/category/zapatillas" style={active}>Zapatillas</NavLink>
      <NavLink to="/category/remeras" style={active}>Remeras</NavLink>
      <NavLink to="/category/pantalones" style={active}>Pantalones</NavLink>
      <div style={{marginLeft:'auto'}}>
        <CartWidget />
      </div>
    </nav>
  )
}
