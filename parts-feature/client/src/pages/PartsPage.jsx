import { useEffect, useState } from 'react'
import { getAllParts }  from '../services/partsApi'
import PartsList       from '../components/PartsList'
import SearchFilter    from '../components/SearchFilter'
import CostEstimator   from '../components/CostEstimator'

const PartsPage = () => {
  const [parts,   setParts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: 'All', bike: 'All' })

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true)
      const params = {}
      if (filters.category !== 'All') params.category = filters.category
      if (filters.bike     !== 'All') params.bike     = filters.bike
      const { data } = await getAllParts(params)
      setParts(data)
      setLoading(false)
    }
    fetchParts()
  }, [filters])

  return (
    <div style={{ padding: 24 }}>
      <h1>Spare Parts</h1>
      <SearchFilter filters={filters} setFilters={setFilters} />
      {loading ? <p>Loading...</p> : <PartsList parts={parts} />}
      <CostEstimator />
    </div>
  )
}

export default PartsPage