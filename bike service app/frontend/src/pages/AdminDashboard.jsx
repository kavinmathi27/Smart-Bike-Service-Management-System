import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Search, Clock, CheckCircle, Settings, User, Package, Truck, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [bookings, setBookings] = useState([]);
  const [partBookings, setPartBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [serviceRes, partRes] = await Promise.all([
        axios.get('http://localhost:5000/api/bookings'),
        axios.get('http://localhost:5000/api/spare-part-bookings')
      ]);
      setBookings(serviceRes.data);
      setPartBookings(partRes.data);
    } catch (err) {
      setError('Failed to load system data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, { status: newStatus });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const updatePartStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/spare-part-bookings/${id}/status`, { status: newStatus });
      setPartBookings(partBookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert('Failed to update part status');
    }
  };

  const updateTechnician = async (id, name, phone) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/technician`, { technician: { name, phone } });
      setBookings(bookings.map(b => b._id === id ? { ...b, technician: { name, phone } } : b));
    } catch (err) {
      console.error('Failed to update technician');
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.bikeId?.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPartBookings = partBookings.filter(b => 
    b.partId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-500">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            Admin Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Manage service orders and spare part deliveries.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'services' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-500'}`}
        >
          Service Bookings
        </button>
        <button
          onClick={() => setActiveTab('parts')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'parts' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-500'}`}
        >
          Spare Part Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {activeTab === 'services' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Order ID</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Bike Details</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Service</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300 text-center">Status</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">No service bookings found.</td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 text-sm font-mono text-slate-500">{booking._id.slice(-6).toUpperCase()}</td>
                      <td className="p-4">
                        {booking.bikeId ? (
                          <>
                            <div className="font-semibold text-slate-900 dark:text-white">{booking.bikeId.registrationNumber}</div>
                            <div className="text-xs text-slate-500">{booking.bikeId.brand} {booking.bikeId.model}</div>
                          </>
                        ) : (
                          <span className="text-red-400 text-sm">Bike Deleted</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900 dark:text-white">{booking.serviceType}</div>
                        <div className="text-xs text-slate-500">₹{booking.cost}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          booking.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <select 
                            value={booking.status}
                            onChange={(e) => updateStatus(booking._id, e.target.value)}
                            className="bg-slate-100 dark:bg-slate-700 border-none text-xs rounded-lg focus:ring-2 focus:ring-blue-500 p-2 text-slate-900 dark:text-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <input 
                              type="text" 
                              placeholder="Technician Name"
                              defaultValue={booking.technician?.name || ''}
                              onBlur={(e) => updateTechnician(booking._id, e.target.value, booking.technician?.phone || '')}
                              className="text-[10px] p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-blue-500"
                           />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Order ID</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Customer</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Part Details</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300 text-center">Status</th>
                  <th className="p-4 font-semibold text-slate-900 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">No part orders found.</td>
                  </tr>
                ) : (
                  filteredPartBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 text-sm font-mono text-slate-500">{booking._id.slice(-6).toUpperCase()}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{booking.userId?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{booking.shippingAddress?.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900 dark:text-white">{booking.partId?.name}</div>
                        <div className="text-xs text-slate-500">Qty: {booking.quantity} • Total: ₹{booking.totalPrice}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center justify-center gap-1 mx-auto w-fit ${
                          booking.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                          booking.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {booking.status === 'Delivered' && <CheckCircle size={10} />}
                          {booking.status === 'Shipped' && <Truck size={10} />}
                          {booking.status === 'Cancelled' && <XCircle size={10} />}
                          {booking.status === 'Pending' && <Clock size={10} />}
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select 
                          value={booking.status}
                          onChange={(e) => updatePartStatus(booking._id, e.target.value)}
                          className="bg-slate-100 dark:bg-slate-700 border-none text-xs rounded-lg focus:ring-2 focus:ring-blue-500 p-2 text-slate-900 dark:text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

