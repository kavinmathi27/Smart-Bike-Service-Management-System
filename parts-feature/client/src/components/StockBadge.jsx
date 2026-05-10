const StockBadge = ({ stock }) => {
  const cls = stock === 0 ? 'stock-badge--out' : stock < 5 ? 'stock-badge--low' : 'stock-badge--in'
  const label = stock === 0 ? 'Out of Stock' : stock < 5 ? `Low Stock (${stock})` : `In Stock (${stock})`

  return (
    <span className={`stock-badge ${cls}`}>
      <span className="stock-badge__dot" />
      {label}
    </span>
  )
}

export default StockBadge