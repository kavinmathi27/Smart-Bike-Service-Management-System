import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import axios from 'axios';
import { Wrench, Clock, CheckCircle, Activity, ArrowRight, Settings, User as UserIcon, PhoneCall, Package, Truck, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { bike, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [partBookings, setPartBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllUserBookings = async () => {
      try {
        setLoading(true);
        const [serviceRes, partRes] = await Promise.all([
          bike?._id ? axios.get(`http://localhost:5000/api/bookings/bike/${bike._id}`) : Promise.resolve({ data: [] }),
          axios.get('http://localhost:5000/api/spare-part-bookings/user')
        ]);
        setBookings(serviceRes.data);
        setPartBookings(partRes.data);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserBookings();
  }, [bike, navigate]);

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

  const getPartStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="text-emerald-500 w-6 h-6" />;
      case 'Shipped': return <Truck className="text-blue-500 w-6 h-6" />;
      case 'Cancelled': return <XCircle className="text-red-500 w-6 h-6" />;
      default: return <Clock className="text-amber-500 w-6 h-6" />;
    }
  };

  if (!bike && partBookings.length === 0 && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
          <Activity size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Welcome to MotoCare</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8">
          Add your bike to track services or browse our spare parts catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/add-bike')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center space-x-2"
          >
            <Wrench className="w-6 h-6" />
            <span>Add Your Bike</span>
          </button>
          <button
            onClick={() => navigate('/spare-parts')}
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center space-x-2"
          >
            <Package className="w-6 h-6" />
            <span>Spare Parts</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Dashboard</h2>
        <p className="text-slate-600 dark:text-slate-400">Track your services and spare part orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bike Info Card */}
        {bike && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl text-blue-600 dark:text-blue-400">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {bike.brand} {bike.model}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{bike.registrationNumber} • {bike.cc}cc</p>
                  </div>
                </div>
                <button 
                  onClick={() => { resetBooking(); navigate('/'); }}
                  className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
            
            <button
              onClick={goToService}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              <Wrench className="w-5 h-5" />
              <span>Book New Service</span>
            </button>
          </div>
        )}

        {/* Quick Stats & Links */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-blue-600 mb-1">{bookings.length}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services</span>
           </div>
           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-amber-500 mb-1">{partBookings.length}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</span>
           </div>
           <button 
            onClick={() => navigate('/spare-parts')}
            className="col-span-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm"
           >
              <Package size={20} />
              Browse Spare Parts
           </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Service History Section */}
        {bike && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench size={20} className="text-blue-600" />
              Service History
            </h3>
            
            {loading ? (
              <div className="py-8 text-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div></div>
            ) : bookings.length === 0 ? (
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500">No services booked for this bike yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{booking.serviceType}</h4>
                        <p className="text-xs text-slate-500">{booking.date || 'Pending'}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Spare Part Orders Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package size={20} className="text-amber-500" />
            Spare Part Orders
          </h3>
          
          {loading ? (
            <div className="py-8 text-center"><div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto"></div></div>
          ) : partBookings.length === 0 ? (
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-slate-500">You haven't ordered any spare parts yet.</p>
              <button onClick={() => navigate('/spare-parts')} className="mt-4 text-blue-600 font-bold hover:underline">Shop Now</button>
            </div>
          ) : (
            <div className="space-y-3">
              {partBookings.map((order) => (
                <div key={order._id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getPartStatusIcon(order.status)}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{order.partId?.name || 'Spare Part'}</h4>
                      <p className="text-xs text-slate-500">Qty: {order.quantity} • ₹{order.totalPrice}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
