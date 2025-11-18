import { useState } from 'react'

export default function ItemCount({ stock=0, initial=1, onAdd }){
  const [qty, setQty] = useState(initial);

  const dec = () => setQty((q) => Math.max(1, q-1));
  const inc = () => setQty((q) => Math.min(stock, q+1));
  const add = () => { if (stock>0 && qty>=1) onAdd(qty); };

  if (stock === 0) return <p className="small">❌ Producto sin stock</p>;

  return (
    <div className="row">
      <button className="btn secondary" onClick={dec} disabled={qty<=1}>-</button>
      <strong>{qty}</strong>
      <button className="btn secondary" onClick={inc} disabled={qty>=stock}>+</button>
      <button className="btn" onClick={add}>Agregar</button>
    </div>
  );
}
