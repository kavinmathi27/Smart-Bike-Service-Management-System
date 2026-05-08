import { useNavigate } from 'react-router-dom'
import { useParts }    from '../context/PartsContext'
import StockBadge      from './StockBadge'

const PartCard = ({ part }) => {
  const navigate = useNavigate()
  const { addPart } = useParts()

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, width: 220 }}>
      <h3>{part.name}</h3>
      <p style={{ color: '#666' }}>{part.category}</p>
      <p><strong>₹{part.price}</strong></p>
      <p style={{ fontSize: 12 }}>{part.compatibility.join(', ')}</p>
      <StockBadge stock={part.stock} />
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => navigate(`/parts/${part._id}`)}>Details</button>
        <button onClick={() => addPart(part)} disabled={part.stock === 0}>
          + Estimate
        </button>
      </div>
    </div>
  )
}

export default PartCard