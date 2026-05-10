import { useNavigate } from 'react-router-dom'
import { useParts }    from '../context/PartsContext'
import { useToast }    from '../context/ToastContext'
import StockBadge      from './StockBadge'

const categoryAbbr = {
  Engine: 'EN',
  Brakes: 'BR',
  Electricals: 'EL',
  Transmission: 'TR',
}

const PartCard = ({ part }) => {
  const navigate = useNavigate()
  const { addPart } = useParts()
  const { addToast } = useToast()

  const handleAdd = (e) => {
    e.stopPropagation()
    addPart(part)
    addToast(`${part.name} added to estimate`, 'success')
  }

  return (
    <div className="part-card">
      <div className="part-card__header">
        <div>
          <div className="part-card__name">{part.name}</div>
          <div className="part-card__category">{part.category}</div>
        </div>
        <div className="part-card__icon">
          {categoryAbbr[part.category] || 'PT'}
        </div>
      </div>

      <div className="part-card__price">Rs.{part.price}</div>

      <div className="part-card__compat">
        {part.compatibility.map(c => (
          <span key={c} className="part-card__tag">{c}</span>
        ))}
      </div>

      <StockBadge stock={part.stock} />

      <div className="part-card__actions">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/parts/${part._id}`)}>
          View Details
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={part.stock === 0}>
          Add to Estimate
        </button>
      </div>
    </div>
  )
}

export default PartCard