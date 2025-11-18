import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ItemDetail from './ItemDetail.jsx'
import productsRaw from '../data/products.json'

export default function ItemDetailContainer({ items, addItem }){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const prod = productsRaw.find(p => p.id === String(id));
    setProduct(prod || null);
    setLoading(false);
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Producto no encontrado</p>;
  return <ItemDetail product={product} items={items} addItem={addItem} />;
}
