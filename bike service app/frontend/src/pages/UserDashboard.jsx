import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import axios from 'axios';
import { Wrench, Clock, CheckCircle, Activity, ArrowRight, Settings, User as UserIcon, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { bike, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bike) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      if (!bike._id) {
        setError('Tracking is unavailable as this bike session is not saved. Please try re-selecting your bike.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/bike/${bike._id}`);
        setBookings(response.data);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load tracking data. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [bike, navigate]);

  const handleBookService = () => {
    // Keep the bike, but clear out any partially selected service details before routing
    const currentBike = bike;
    resetBooking();
    // (Note: Since resetBooking clears the bike in Context too, we need a way to preserve the bike.
    // Let's adjust this: we only navigate to /service without resetting the bike, or we re-set it.)
  };

  const goToService = () => {
    navigate('/service');
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle className="text-emerald-500 w-6 h-6" />;
      case 'In Progress': return <Settings className="text-blue-500 w-6 h-6 animate-spin-slow" />;
      default: return <Clock className="text-amber-500 w-6 h-6" />;
    }
  };

  if (!bike) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
          <Activity size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No Bike Added Yet</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8">
          Add your bike details to start booking services and tracking your maintenance history.
        </p>
        <button
          onClick={() => navigate('/add-bike')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center space-x-2"
        >
          <Wrench className="w-6 h-6" />
          <span>Add Your Bike</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Bike Dashboard</h2>
        <p className="text-slate-600 dark:text-slate-400">Track your service orders and book new ones</p>
      </div>

      {/* Bike Info Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {bike.brand} {bike.model}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{bike.registrationNumber} • {bike.cc}cc • {bike.year}</p>
            </div>
          </div>
          <button 
            onClick={() => { resetBooking(); navigate('/'); }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Change Bike
          </button>
        </div>
        
        <button
          onClick={goToService}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
        >
          <Wrench className="w-5 h-5" />
          <span>Book New Service</span>
        </button>
      </div>

      {/* Tracking Section */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Service History & Tracking</h3>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
          <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Service History</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't booked any services for this bike yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getStatusIcon(booking.status)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{booking.serviceType} Service</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Booked for: {booking.date || 'Pending'} {booking.time ? `at ${booking.time}` : ''}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">ID: {booking._id.slice(-8).toUpperCase()}</p>
                  
                  {booking.technician && (
                    <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Assigned Technician</p>
                      <div className="flex items-center gap-3">
                        <div className="text-blue-600 dark:text-blue-400">
                           <UserIcon size={14} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{booking.technician.name}</span>
                        <a href={`tel:${booking.technician.phone}`} className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 ml-auto">
                           <PhoneCall size={10} />
                           {booking.technician.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {booking.status}
                </span>
                <span className="font-bold text-slate-900 dark:text-white mt-2">₹{booking.cost}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
