import { useState }     from 'react'
import { useParts }     from '../context/PartsContext'
import { useNavigate }  from 'react-router-dom'
import { useToast }     from '../context/ToastContext'

const labourOptions = [
  { name: 'Basic', price: 300 },
  { name: 'Standard', price: 500 },
  { name: 'Premium', price: 800 },
]

const EstimatorPage = () => {
  const { selectedParts, removePart, clearParts } = useParts()
  const navigate  = useNavigate()
  const { addToast } = useToast()
  const [labourIdx, setLabourIdx] = useState(0)

  const partsTotal  = selectedParts.reduce((sum, p) => sum + p.price, 0)
  const labour      = labourOptions[labourIdx].price
  const subtotal    = partsTotal + labour
  const gst         = Math.round(subtotal * 0.18)
  const grandTotal  = subtotal + gst

  const handleRemove = (id, name) => {
    removePart(id)
    addToast(`Removed ${name}`, 'info')
  }

  const handlePrint = () => window.print()

  return (
    <div className="page">
      <div className="page-header">
        <h1>Cost Estimate</h1>
        <p>Review your selected parts and service charges</p>
      </div>

      {selectedParts.length === 0 ? (
        <div className="parts-empty" style={{ padding: '3rem 2rem' }}>
          <p style={{ marginBottom: '0.75rem' }}>No parts selected yet</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Browse Parts
          </button>
        </div>
      ) : (
        <>
          <table className="estimate-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Category</th>
                <th style={{ textAlign: 'right' }}>Price</th>
                <th style={{ textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {selectedParts.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{p.category}</td>
                  <td className="price-col">Rs.{p.price}</td>
                  <td className="remove-col">
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(p._id, p.name)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="labour-selector">
            <h3>Labour Charge</h3>
            <div className="labour-options">
              {labourOptions.map((opt, i) => (
                <div key={opt.name}
                  className={`labour-option ${labourIdx === i ? 'labour-option--active' : ''}`}
                  onClick={() => setLabourIdx(i)}>
                  <div className="labour-option__name">{opt.name}</div>
                  <div className="labour-option__price">Rs.{opt.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="estimate-summary">
            <div className="estimate-summary__row">
              <span>Parts Total</span><span>Rs.{partsTotal}</span>
            </div>
            <div className="estimate-summary__row">
              <span>Labour ({labourOptions[labourIdx].name})</span><span>Rs.{labour}</span>
            </div>
            <div className="estimate-summary__row">
              <span>GST (18%)</span><span>Rs.{gst}</span>
            </div>
            <div className="estimate-summary__row estimate-summary__row--total">
              <span>Grand Total</span><span>Rs.{grandTotal}</span>
            </div>
          </div>

          <div className="estimate-actions">
            <button className="btn btn-primary" onClick={handlePrint}>Print Estimate</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Add More Parts</button>
            <button className="btn btn-danger" onClick={() => { clearParts(); addToast('Estimate cleared', 'info') }}>Clear All</button>
          </div>
        </>
      )}
    </div>
  )
}

export default EstimatorPage