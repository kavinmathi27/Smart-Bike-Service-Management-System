const categories = ['All', 'Engine', 'Brakes', 'Electricals', 'Transmission']
const bikes      = ['All', 'Honda Activa', 'Hero Splendor', 'Royal Enfield', 'Bajaj Pulsar', 'TVS Jupiter']

const SearchFilter = ({ filters, setFilters, search, setSearch }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search parts by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
      </select>

      <select
        value={filters.bike}
        onChange={e => setFilters({ ...filters, bike: e.target.value })}
      >
        {bikes.map(b => <option key={b} value={b}>{b === 'All' ? 'All Bikes' : b}</option>)}
      </select>

      <button className="btn btn-secondary btn-sm" onClick={() => { setFilters({ category: 'All', bike: 'All' }); setSearch('') }}>
        Clear Filters
      </button>
    </div>
  )
}

export default SearchFilter