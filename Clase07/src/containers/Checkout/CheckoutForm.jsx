import { useState } from 'react'
import { money } from '../../utils/currency.js'

export default function CheckoutForm({ items, totalPrice, clear }){
  const [buyer, setBuyer] = useState({ name:'', email:'', phone:'' });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    try {
      setLoading(true);
      setError(null);

      const orderId = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

      try {
        const raw = localStorage.getItem("mishop_orders");
        const orders = raw ? JSON.parse(raw) : [];
        orders.push({
          id: orderId,
          buyer,
          items: items.map(i => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
          total: totalPrice,
          createdAt: new Date().toISOString(),
          status: "generated",
        });
        localStorage.setItem("mishop_orders", JSON.stringify(orders));
      } catch {}

      setOrderId(orderId);
      clear();
    } catch (err){
      console.error(err);
      setError(err.message);
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
