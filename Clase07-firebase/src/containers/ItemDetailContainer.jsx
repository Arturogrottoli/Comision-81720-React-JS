import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ItemDetail from './ItemDetail.jsx'
import { getProductById } from '../firebase/db.js'

export default function ItemDetailContainer(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const prod = await getProductById(id);
        setProduct(prod);
      } catch (e){
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Producto no encontrado</p>;
  return <ItemDetail product={product}/>;
}
