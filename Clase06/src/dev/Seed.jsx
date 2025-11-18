import { useState } from 'react'

export default function Seed(){
  return (
    <section className="card center">
      <h3>Productos desde JSON</h3>
      <p className="small">Los productos se cargan desde <code>products.json</code></p>
      <p className="small">Ya no se usa Firebase. Los productos están en el archivo JSON.</p>
    </section>
  );
}
