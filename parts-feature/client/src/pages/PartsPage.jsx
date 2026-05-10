import { useEffect, useState } from 'react'
import { useNavigate }   from 'react-router-dom'
import { getAllParts }    from '../services/partsApi'
import PartsList          from '../components/PartsList'
import SearchFilter       from '../components/SearchFilter'
import CostEstimator      from '../components/CostEstimator'

const PartsPage = () => {
  const [parts,   setParts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [search,  setSearch]  = useState('')
  const [filters, setFilters] = useState({ category: 'All', bike: 'All' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {}
        if (filters.category !== 'All') params.category = filters.category
        if (filters.bike     !== 'All') params.bike     = filters.bike
        const { data } = await getAllParts(params)
        setParts(data)
      } catch {
        setError('Failed to load parts. Please try again.')
      }
      setLoading(false)
    }
    fetchParts()
  }, [filters])

  const filtered = parts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <section className="hero">
        <h1>Premium Bike Parts and Service</h1>
        <p>Browse quality spare parts, get instant cost estimates, and book professional service for your bike.</p>
        <button className="btn btn-primary" onClick={() => navigate('/book-service')}>
          Book a Service
        </button>
      </section>

      <div className="page">
        <SearchFilter filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
        
        {!loading && !error && (
          <p className="results-count">Showing {filtered.length} part{filtered.length !== 1 ? 's' : ''}</p>
        )}

        {loading ? (
          <div className="parts-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton skeleton-card" />)}
          </div>
        ) : error ? (
          <div className="parts-empty">
            <p>{error}</p>
            <button className="btn btn-secondary" style={{ marginTop: '0.75rem' }} onClick={() => setFilters({ ...filters })}>
              Retry
            </button>
          </div>
        ) : (
          <PartsList parts={filtered} />
        )}

        <CostEstimator />
      </div>
    </>
  )
}

export default PartsPage