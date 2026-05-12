import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ChevronLeft, CheckCircle2, Circle, Calendar, MapPin, Clock } from 'lucide-react';

const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Service',
    description: 'Essential maintenance for smooth running.',
    includes: ['Water Wash', 'Chain Lubrication', 'Brake Adjustment', 'Clutch Check'],
    price: 499
  },
  {
    id: 'full',
    name: 'Full Service',
    description: 'Comprehensive checkup and tuning.',
    includes: ['Basic Service', 'Engine Oil Change', 'Air Filter Check', 'Spark Plug Clean', 'Carburetor Clean'],
    price: 1299
  },
  {
    id: 'oil',
    name: 'Oil Change',
    description: 'Premium synthetic oil replacement.',
    includes: ['Engine Oil (Synthetic)', 'Oil Filter Change', 'General Checkup'],
    price: 799
  }
];

const GeneralService = () => {
  const { setServiceDetails, setCost, setDate, setTime, setLocation, bike } = useBooking();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: ''
  });

  if (!bike) {
    navigate('/');
    return null;
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setCost(pkg.price);
  };

  const handleBook = () => {
    if (!selectedPackage || !formData.date || !formData.time || !formData.location) return;
    
    setServiceDetails({
      package: selectedPackage.name,
      includes: selectedPackage.includes
    });
    setDate(formData.date);
    setTime(formData.time);
    setLocation(formData.location);
    
    navigate('/confirmation');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-24" // padding bottom for fixed footer
    >
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/service')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">General Service</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Select Package</h3>
        <div className="grid gap-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                selectedPackage?.id === pkg.id 
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md ring-1 ring-blue-500' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{pkg.name}</h4>
                <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">₹{pkg.price}</div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{pkg.description}</p>
              
              <div className="space-y-1">
                {pkg.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="absolute top-5 right-5 mt-1 mr-1">
                 {selectedPackage?.id === pkg.id ? (
                   <CheckCircle2 size={24} className="text-blue-600 fill-blue-100 dark:fill-blue-900" />
                 ) : (
                   <Circle size={24} className="text-slate-300 dark:text-slate-600" />
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-lg">Schedule details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Time Slot</label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                >
                  <option value="" disabled>Select Time</option>
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Pick-up Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <textarea
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter complete address"
                rows={2}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              ></textarea>
            </div>
          </div>
        </motion.div>
      )}

      {/* Fixed Footer for Booking */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="container mx-auto max-w-md md:max-w-3xl flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Estimated</p>
            <p className="font-bold text-xl">₹{selectedPackage ? selectedPackage.price : '0'}</p>
          </div>
          <button
            onClick={handleBook}
            disabled={!selectedPackage || !formData.date || !formData.time || !formData.location}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
          >
            Continue to Summary
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneralService;
