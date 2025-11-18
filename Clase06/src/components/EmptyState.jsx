export default function EmptyState({ title='Sin resultados', subtitle }){
  return (
    <div className="center" style={{padding:'32px 0'}}>
      <h3>{title}</h3>
      {subtitle && <p className="small">{subtitle}</p>}
    </div>
  );
}
