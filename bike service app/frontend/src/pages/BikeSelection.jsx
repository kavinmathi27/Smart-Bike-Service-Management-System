import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ChevronRight, Bike } from 'lucide-react';
import axios from 'axios';

const BRANDS = ['Royal Enfield', 'Yamaha', 'Honda', 'KTM', 'Bajaj'];
const MODELS = {
  'Royal Enfield': ['Classic 350', 'Meteor 350', 'Himalayan', 'Interceptor 650'],
  'Yamaha': ['MT-15', 'R15 V4', 'FZ-S FI', 'Aerox 155'],
  'Honda': ['Activa 6G', 'Shine', 'Hness CB350', 'Dio'],
  'KTM': ['Duke 200', 'Duke 390', 'RC 200', 'Adventure 390'],
  'Bajaj': ['Pulsar NS200', 'Pulsar RS200', 'Dominar 400', 'Avenger 220'],
};

const BikeSelection = () => {
  const { setBike } = useBooking();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    cc: '',
    year: '',
    registrationNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset model if brand changes
      ...(name === 'brand' && { model: '' }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save bike to backend to get an _id for tracking
      const response = await axios.post('/api/bikes', formData);
      const savedBike = response.data;
      
      setBike(savedBike);
      navigate('/dashboard');
    } catch (error) {
      console.warn('Backend connection failed. Service tracking will be unavailable for this session.', error);
      setBike({ ...formData, _id: 'temp_' + Date.now() });
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
          <Bike size={32} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold">Add Your Bike</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your bike details to proceed with booking</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 glass-card p-6 rounded-2xl shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Brand</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none"
          >
            <option value="" disabled>Select Brand</option>
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {formData.brand && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Model</label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none"
            >
              <option value="" disabled>Select Model</option>
              {MODELS[formData.brand].map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Engine CC</label>
            <input
              type="number"
              name="cc"
              value={formData.cc}
              onChange={handleChange}
              placeholder="e.g. 350"
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2022"
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="e.g. MH 01 AB 1234"
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow uppercase"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
        >
          Continue
          <ChevronRight size={20} />
        </button>
      </form>
    </motion.div>
  );
};

export default BikeSelection;
