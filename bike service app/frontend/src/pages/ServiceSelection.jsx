import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { AlertTriangle, Settings, PenTool, ChevronLeft } from 'lucide-react';

const ServiceSelection = () => {
  const { setServiceType, bike } = useBooking();
  const navigate = useNavigate();

  // If no bike selected, go back
  if (!bike) {
    navigate('/');
    return null;
  }

  const handleSelect = (type, path) => {
    setServiceType(type);
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-bold">Select Service</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">For {bike.brand} {bike.model}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Emergency Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('Emergency', '/emergency')}
          className="flex items-start gap-4 p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all text-left shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">Emergency Service</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Stuck on the road? Get immediate assistance from a nearby technician.</p>
            <span className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-1">
              Book Now &rarr;
            </span>
          </div>
        </motion.button>

        {/* General Service Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('General', '/general')}
          className="flex items-start gap-4 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all text-left shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Settings className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">General Service</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Regular maintenance, oil changes, and full service packages.</p>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1">
              View Packages &rarr;
            </span>
          </div>
        </motion.button>

        {/* Specific Repair Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('Specific Repair', '/specific')}
          className="flex items-start gap-4 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all text-left shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <PenTool className="text-emerald-600 dark:text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">Specific Repair</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Fix particular issues like brakes, engine, tires, or electricals.</p>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-1">
              Select Issue &rarr;
            </span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceSelection;
