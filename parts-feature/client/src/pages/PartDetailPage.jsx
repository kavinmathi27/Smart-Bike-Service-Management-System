import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPartById, getAllParts } from '../services/partsApi'
import { useParts }    from '../context/PartsContext'
import { useToast }    from '../context/ToastContext'
import StockBadge      from '../components/StockBadge'
import PartCard        from '../components/PartCard'

const PartDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addPart } = useParts()
  const { addToast } = useToast()
  const [part, setPart] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    getPartById(id).then(({ data }) => {
      setPart(data)
      getAllParts({ category: data.category }).then(({ data: all }) => {
        setRelated(all.filter(p => p._id !== data._id).slice(0, 3))
      })
    })
  }, [id])

  const handleAdd = () => {
    addPart(part)
    addToast('Added to estimate', 'success')
  }

  if (!part) return (
    <div className="page">
      <div className="skeleton" style={{ height: 28, width: 100, marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 36, width: '50%', marginBottom: 14 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 90 }} />)}
      </div>
    </div>
  )

  return (
    <div className="page detail">
      <button className="detail__back" onClick={() => navigate(-1)}>Back to Parts</button>
      <h1 className="detail__name">{part.name}</h1>
      <span className="part-card__category">{part.category}</span>

      <div className="detail__meta">
        <div className="detail__meta-card">
          <div className="detail__meta-label">Price</div>
          <div className="detail__meta-value detail__meta-value--price">Rs.{part.price}</div>
        </div>
        <div className="detail__meta-card">
          <div className="detail__meta-label">Stock</div>
          <div className="detail__meta-value"><StockBadge stock={part.stock} /></div>
        </div>
        <div className="detail__meta-card">
          <div className="detail__meta-label">Compatible Bikes</div>
          <div className="detail__meta-value" style={{ fontSize: '0.85rem' }}>{part.compatibility.join(', ')}</div>
        </div>
      </div>

      <div className="detail__desc">
        <strong>Description: </strong>{part.description || 'High-quality genuine spare part for optimal bike performance and durability.'}
      </div>

      <button className="btn btn-primary" onClick={handleAdd} disabled={part.stock === 0}>
        {part.stock === 0 ? 'Out of Stock' : 'Add to Estimate'}
      </button>

      {related.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>Related Parts</h2>
          <div className="parts-grid">
            {related.map(p => <PartCard key={p._id} part={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default PartDetailPage