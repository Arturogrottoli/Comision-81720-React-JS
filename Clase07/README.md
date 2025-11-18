# MiShop – E‑commerce React + Firebase

SPA hecha con React, React Router y Firebase (Firestore) para la entrega final.

## Cómo arrancar
1) `npm i`
2) Copiá `.env.example` a `.env` y poné tus credenciales Firebase.
3) `npm run dev`

### Rutas
- `/` listado de productos
- `/category/:cid` filtrado por categoría
- `/item/:id` detalle
- `/cart` carrito
- `/checkout` checkout
- `/seed` (opcional) sembrar productos demo. Usarla una sola vez y luego borrar el archivo.

## Colecciones Firestore
- `products`: { title, description, price, stock, category, image }
- `orders`: { buyer:{name,email,phone}, items:[{id,title,price,qty}], total, createdAt, status }
