import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import PartsPage       from './pages/PartsPage'
import PartDetailPage  from './pages/PartDetailPage'
import EstimatorPage   from './pages/EstimatorPage'
import BookServicePage from './pages/BookServicePage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px - 200px)' }}>
        <Routes>
          <Route path="/"             element={<PartsPage />} />
          <Route path="/parts/:id"    element={<PartDetailPage />} />
          <Route path="/estimate"     element={<EstimatorPage />} />
          <Route path="/book-service" element={<BookServicePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App