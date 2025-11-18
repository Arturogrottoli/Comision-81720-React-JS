import { useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../utils/currency.js'
import ItemCount from './ItemCount.jsx'

export default function ItemDetail({ product, items, addItem }){
  const [added, setAdded] = useState(0);

  const onAdd = (qty) => {
    setAdded(qty);
    addItem(product, qty);
  }

  const inCartQty = items.find(i => i.id === product.id)?.qty || 0;
  const availableStock = Math.max(0, product.stock - inCartQty);

  return (
    <article className="card" style={{maxWidth:820, margin:'12px auto'}}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="small">{product.description}</p>
      <div className="row"><span className="price">{money(product.price)}</span><span>Stock: {availableStock}</span></div>
      <div className="hr" />
      {added === 0 ? (
        <ItemCount stock={availableStock} initial={availableStock>0?1:0} onAdd={onAdd} />
      ) : (
        <div className="center" style={{display:'grid', gap:12}}>
          <p>✅ Agregado {added} al carrito</p>
          <div className="row" style={{justifyContent:'center'}}>
            <Link className="btn secondary" to="/">Seguir comprando</Link>
            <Link className="btn" to="/cart">Ir al carrito</Link>
          </div>
        </div>
      )}
    </article>
  );
}
