import { useParts } from '../context/PartsContext'
import { useNavigate } from 'react-router-dom'

const CostEstimator = () => {
  const { selectedParts, removePart } = useParts()
  const navigate = useNavigate()
  const total = selectedParts.reduce((sum, p) => sum + p.price, 0)

  if (selectedParts.length === 0) return null

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#fff',
      border: '1px solid #ddd', borderRadius: 10, padding: 16, minWidth: 240, boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
      <h4>Estimate Cart</h4>
      {selectedParts.map(p => (
        <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span>{p.name}</span>
          <span>₹{p.price} <button onClick={() => removePart(p._id)}>✕</button></span>
        </div>
      ))}
      <hr />
      <strong>Total: ₹{total}</strong>
      <br />
      <button style={{ marginTop: 10, width: '100%' }} onClick={() => navigate('/estimate')}>
        View Full Estimate
      </button>
    </div>
  )
}

export default CostEstimator