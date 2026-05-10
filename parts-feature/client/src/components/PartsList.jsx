import PartCard from './PartCard'

const PartsList = ({ parts }) => {
  if (parts.length === 0) return (
    <div className="parts-empty">
      <p>No parts found matching your filters.</p>
    </div>
  )

  return (
    <div className="parts-grid">
      {parts.map((part, i) => (
        <div key={part._id} style={{ animationDelay: `${i * 0.05}s` }}>
          <PartCard part={part} />
        </div>
      ))}
    </div>
  )
}

export default PartsList