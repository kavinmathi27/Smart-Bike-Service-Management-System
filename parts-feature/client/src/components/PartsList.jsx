import PartCard from './PartCard'

const PartsList = ({ parts }) => {
  if (parts.length === 0) return <p>No parts found.</p>

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {parts.map(part => <PartCard key={part._id} part={part} />)}
    </div>
  )
}

export default PartsList