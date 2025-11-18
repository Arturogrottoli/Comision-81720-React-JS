import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ItemList from './ItemList.jsx'
import productsRaw from '../data/products.json'

export default function ItemListContainer({ greeting }){
  const { cid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const list = cid ? productsRaw.filter(p => p.category === cid) : productsRaw;
    setProducts(list || []);
    setLoading(false);
  }, [cid]);

  if (loading) return <Loader/>;
  if (!products.length) return <EmptyState title="Sin productos" subtitle="Prueba con otra categoría"/>;

  return (
    <section>
      {greeting && <h2>{greeting}</h2>}
      <ItemList products={products} />
    </section>
  );
}
