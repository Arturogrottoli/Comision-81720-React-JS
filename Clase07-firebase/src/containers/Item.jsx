import { Link } from 'react-router-dom'
import { money } from '../utils/currency.js'

export default function Item({ product }){
  return (
    <article className="card">
      <img src={product.image} alt={product.title} loading="lazy" />
      <h4>{product.title}</h4>
      <div className="row">
        <span className="price">{money(product.price)}</span>
        <Link className="btn secondary" to={`/item/${product.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
