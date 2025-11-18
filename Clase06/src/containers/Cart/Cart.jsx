import { Link } from 'react-router-dom'
import CartItem from './CartItem.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { money } from '../../utils/currency.js'

export default function Cart(){
  // Sin contexto de carrito: dejamos la vista de carrito vacía
  const items = [];

  if (items.length === 0) {
    return <EmptyState title="Carrito vacío" subtitle="Agregá productos al carrito" />
  }

  return (
    <section className="card" style={{gap:16}}>
      <h2>Tu carrito</h2>
      {items.map(i => (
        <div key={i.id} className="hr">
          <CartItem item={i} onRemove={removeItem} />
        </div>
      ))}
      <div className="row" style={{justifyContent:'space-between'}}>
        <button className="btn secondary" onClick={clear}>Vaciar</button>
        <div className="row" style={{gap:12, alignItems:'center'}}>
          <strong>Total: {money(totalPrice)}</strong>
          <Link className="btn" to="/checkout">Comprar</Link>
        </div>
      </div>
    </section>
  );
}
