import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import { money } from '../../utils/currency.js'
import { createOrder } from '../../firebase/db.js'

export default function CheckoutForm(){
  const { items, totalPrice, clear } = useCart();
  const [buyer, setBuyer] = useState({ name:'', email:'', phone:'' });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    try {
      setLoading(true);
      setError(null);

      const result = await createOrder(items, buyer, totalPrice);
      
      if (result.success) {
        setOrderId(result.orderId);
        clear();
      } else {
        const outOfStockNames = result.outOfStock.map(item => item.title || item.id).join(', ');
        setError(`Sin stock suficiente para: ${outOfStockNames}`);
      }
    } catch (err){
      console.error(err);
      setError(err.message || 'Error al crear la orden');
    } finally {
      setLoading(false);
    }
  }

  if (orderId) {
    return (
      <section className="card center">
        <h2>¡Gracias por tu compra!</h2>
        <p>Guardá este id de orden:</p>
        <code>{orderId}</code>
      </section>
    );
  }

  if (items.length === 0) {
    return <p className="center">Tu carrito está vacío.</p>
  }

  return (
    <section>
      <h2>Checkout</h2>
      <form className="form" onSubmit={submit}>
        <input className="input" name="name" placeholder="Nombre" value={buyer.name} onChange={handleChange} required />
        <input className="input" name="email" placeholder="Email" type="email" value={buyer.email} onChange={handleChange} required />
        <input className="input" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleChange} required />
        <button className="btn" disabled={loading}>{loading ? 'Generando orden...' : `Confirmar compra (${money(totalPrice)})`}</button>
        {error && <p className="small" style={{color:'crimson'}}>{error}</p>}
      </form>
    </section>
  );
}
