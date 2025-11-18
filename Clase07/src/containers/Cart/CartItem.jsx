import { money } from '../../utils/currency.js'

export default function CartItem({ item, onRemove }){
  return (
    <div className="row" style={{justifyContent:'space-between'}}>
      <div className="row" style={{gap:8}}>
        <img src={item.image} alt="thumb" style={{width:56, height:56, objectFit:'cover', borderRadius:8}}/>
        <div>
          <div><strong>{item.title}</strong></div>
          <div className="small">{item.qty} x {money(item.price)}</div>
        </div>
      </div>
      <div className="row" style={{gap:12}}>
        <strong>{money(item.qty * item.price)}</strong>
        <button className="btn secondary" onClick={()=>onRemove(item.id)}>Eliminar</button>
      </div>
    </div>
  );
}
