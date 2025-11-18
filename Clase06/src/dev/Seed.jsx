import { addDoc, collection } from 'firebase/firestore'
import { db } from '../services/firebase.js'
import { useState } from 'react'

const demo = [
  {
    title: 'Zapatillas Runner Pro',
    description: 'Amortiguación ligera y malla respirable. Ideales para calle.',
    price: 79999,
    stock: 12,
    category: 'zapatillas',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Remera DryFit Essential',
    description: 'Tela de secado rápido, ideal para entrenar.',
    price: 14999,
    stock: 25,
    category: 'remeras',
    image: 'https://images.unsplash.com/photo-1520975922299-30933aa29f40?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Pantalón Jogger Urban',
    description: 'Corte slim con frisa suave, super cómodo.',
    price: 32999,
    stock: 10,
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Zapatillas Court Classic',
    description: 'Clásicas de lona, combinan con todo.',
    price: 45999,
    stock: 8,
    category: 'zapatillas',
    image: 'https://images.unsplash.com/photo-1517940310602-75fcb2ec1f44?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Remera Oversize Icon',
    description: '100% algodón peinado, calce relajado.',
    price: 18999,
    stock: 30,
    category: 'remeras',
    image: 'https://images.unsplash.com/photo-1520975618319-9a9a45a1ba69?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function Seed(){
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try{
      setLoading(true); setError(null);
      const ref = collection(db, 'products');
      for (const p of demo) await addDoc(ref, p);
      setDone(true);
    } catch(e){
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card center">
      <h3>Sembrar productos demo</h3>
      <p className="small">Ejecutá esto solo una vez. Luego, borrá esta ruta.</p>
      <button className="btn" onClick={load} disabled={loading || done}>
        {loading ? 'Cargando...' : done ? 'Listo ✅' : 'Crear productos'}
      </button>
      {error && <p className="small" style={{color:'crimson'}}>{error}</p>}
    </section>
  );
}
