const StockBadge = ({ stock }) => {
  return stock > 0
    ? <span style={{ color: 'green', fontWeight: 'bold' }}>In Stock ({stock})</span>
    : <span style={{ color: 'red',   fontWeight: 'bold' }}>Out of Stock</span>
}

export default StockBadge