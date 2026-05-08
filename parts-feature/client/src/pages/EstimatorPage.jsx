import { useParts }    from '../context/PartsContext'
import { useNavigate } from 'react-router-dom'

const EstimatorPage = () => {
  const { selectedParts, removePart, clearParts } = useParts()
  const navigate  = useNavigate()
  const total     = selectedParts.reduce((sum, p) => sum + p.price, 0)
  const labour    = 300
  const grandTotal = total + labour

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1 style={{ marginTop: 16 }}>Cost Estimate</h1>

      {selectedParts.length === 0
        ? <p>No parts selected. <button onClick={() => navigate('/')}>Browse Parts</button></p>
        : <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Part</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Category</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedParts.map(p => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{p.name}</td>
                    <td style={{ padding: 8 }}>{p.category}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>₹{p.price}</td>
                    <td><button onClick={() => removePart(p._id)}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <p>Parts Total : ₹{total}</p>
              <p>Labour Charge : ₹{labour}</p>
              <h3>Grand Total : ₹{grandTotal}</h3>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <button onClick={clearParts}>Clear All</button>
              <button onClick={() => navigate('/')}>Add More Parts</button>
            </div>
          </>
      }
    </div>
  )
}

export default EstimatorPage