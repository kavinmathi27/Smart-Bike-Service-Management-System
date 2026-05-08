import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPartById } from '../services/partsApi'
import { useParts }    from '../context/PartsContext'
import StockBadge      from '../components/StockBadge'

const PartDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addPart } = useParts()
  const [part, setPart] = useState(null)

  useEffect(() => {
    getPartById(id).then(({ data }) => setPart(data))
  }, [id])

  if (!part) return <p style={{ padding: 24 }}>Loading...</p>

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1 style={{ marginTop: 16 }}>{part.name}</h1>
      <p><strong>Category:</strong> {part.category}</p>
      <p><strong>Price:</strong> ₹{part.price}</p>
      <p><strong>Compatible with:</strong> {part.compatibility.join(', ')}</p>
      <p><strong>Description:</strong> {part.description || 'N/A'}</p>
      <StockBadge stock={part.stock} />
      <br /><br />
      <button onClick={() => addPart(part)} disabled={part.stock === 0}>
        Add to Estimate
      </button>
    </div>
  )
}

export default PartDetailPage