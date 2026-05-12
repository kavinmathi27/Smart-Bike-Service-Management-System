import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import BikeSelection from './pages/BikeSelection';
import ServiceSelection from './pages/ServiceSelection';
import EmergencyService from './pages/EmergencyService';
import GeneralService from './pages/GeneralService';
import SpecificRepair from './pages/SpecificRepair';
import BookingConfirmation from './pages/BookingConfirmation';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SparePartsList from './pages/spare-parts/SparePartsList';
import SparePartBookingForm from './pages/spare-parts/SparePartBookingForm';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="container mx-auto px-4 py-8 max-w-md md:max-w-3xl">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/add-bike" element={<ProtectedRoute><BikeSelection /></ProtectedRoute>} />
                <Route path="/service" element={<ProtectedRoute><ServiceSelection /></ProtectedRoute>} />
                <Route path="/emergency" element={<ProtectedRoute><EmergencyService /></ProtectedRoute>} />
                <Route path="/general" element={<ProtectedRoute><GeneralService /></ProtectedRoute>} />
                <Route path="/specific" element={<ProtectedRoute><SpecificRepair /></ProtectedRoute>} />
                <Route path="/spare-parts" element={<ProtectedRoute><SparePartsList /></ProtectedRoute>} />
                <Route path="/spare-parts/book/:id" element={<ProtectedRoute><SparePartBookingForm /></ProtectedRoute>} />
                <Route path="/confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
