import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PartsPage      from './pages/PartsPage'
import PartDetailPage from './pages/PartDetailPage'
import EstimatorPage  from './pages/EstimatorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<PartsPage />} />
        <Route path="/parts/:id" element={<PartDetailPage />} />
        <Route path="/estimate"  element={<EstimatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App