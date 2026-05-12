import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, MapPin, Phone, CreditCard, CheckCircle2 } from 'lucide-react';

const SparePartBookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 1,
    street: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  useEffect(() => {
    fetchPart();
  }, [id]);

  const fetchPart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/spare-parts/${id}`);
      setPart(response.data);
    } catch (error) {
      console.error('Error fetching part:', error);
      navigate('/spare-parts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const bookingData = {
        partId: id,
        quantity: formData.quantity,
        totalPrice: part.price * formData.quantity,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          zipCode: formData.zipCode,
          phone: formData.phone,
        }
      };
      await axios.post('/api/spare-part-bookings', bookingData);
      navigate('/dashboard'); // or a success page
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  if (!part) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/spare-parts')}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        Back to parts
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Part Details Card */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="h-64 bg-slate-100 dark:bg-slate-900">
              {part.imageUrl ? (
                <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <CreditCard size={64} />
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{part.name}</h2>
                <p className="text-slate-500 dark:text-slate-400">{part.brand} • {part.model}</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{part.description}</p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Price per unit</span>
                <span className="text-xl font-bold text-blue-600">₹{part.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Shipping Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your contact number"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Street name and house number"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600 dark:text-slate-400">Total Price</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{part.price * formData.quantity}</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
              {!submitting && <CheckCircle2 size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SparePartBookingForm;
