const categories = ['All', 'Engine', 'Brakes', 'Electricals', 'Transmission']
const bikes      = ['All', 'Honda Activa', 'Hero Splendor', 'Royal Enfield', 'Bajaj Pulsar', 'TVS Jupiter']

const SearchFilter = ({ filters, setFilters }) => {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <select
        value={filters.bike}
        onChange={e => setFilters({ ...filters, bike: e.target.value })}
      >
        {bikes.map(b => <option key={b}>{b}</option>)}
      </select>

      <button onClick={() => setFilters({ category: 'All', bike: 'All' })}>
        Clear
      </button>
    </div>
  )
}

export default SearchFilter