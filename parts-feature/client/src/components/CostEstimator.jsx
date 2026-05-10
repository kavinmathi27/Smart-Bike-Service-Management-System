import { useParts } from '../context/PartsContext'
import { useNavigate } from 'react-router-dom'

const CostEstimator = () => {
  const { selectedParts, removePart } = useParts()
  const navigate = useNavigate()
  const total = selectedParts.reduce((sum, p) => sum + p.price, 0)

  if (selectedParts.length === 0) return null

  return (
    <div className="float-cart">
      <h4>Estimate Cart</h4>
      {selectedParts.map(p => (
        <div key={p._id} className="float-cart__item">
          <span>{p.name}</span>
          <span>
            Rs.{p.price}
            <button className="btn btn-danger btn-sm"
              style={{ marginLeft: 6, padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
              onClick={() => removePart(p._id)}>x</button>
          </span>
        </div>
      ))}
      <div className="float-cart__divider" />
      <div className="float-cart__total">
        <span>Total</span>
        <span style={{ color: 'var(--accent-light)' }}>Rs.{total}</span>
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.4rem' }}
        onClick={() => navigate('/estimate')}>
        View Full Estimate
      </button>
    </div>
  )
}

export default CostEstimator