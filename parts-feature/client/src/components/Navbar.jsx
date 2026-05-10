import { NavLink, useNavigate } from 'react-router-dom'
import { useParts } from '../context/PartsContext'

const Navbar = () => {
  const { selectedParts } = useParts()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar__brand" onClick={() => navigate('/')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/>
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
        </svg>
        Smart Bike Service
      </div>

      <ul className="navbar__links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Parts</NavLink></li>
        <li><NavLink to="/estimate" className={({ isActive }) => isActive ? 'active' : ''}>Estimate</NavLink></li>
        <li><NavLink to="/book-service" className={({ isActive }) => isActive ? 'active' : ''}>Book Service</NavLink></li>
      </ul>

      <button className="navbar__cart-btn" onClick={() => navigate('/estimate')}>
        Estimate
        {selectedParts.length > 0 && (
          <span className="navbar__badge">{selectedParts.length}</span>
        )}
      </button>
    </nav>
  )
}

export default Navbar
