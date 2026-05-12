import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ChevronLeft, MapPin, Phone, Crosshair, Navigation, PhoneCall, Loader2, AlertTriangle } from 'lucide-react';

const EmergencyService = () => {
  const { setLocation, setServiceDetails, setCost, bike } = useBooking();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, searching, assigned
  const [technician, setTechnician] = useState(null);

  if (!bike) {
    navigate('/');
    return null;
  }

  const handleDetectLocation = () => {
    setIsLocating(true);
    // Simulate geolocation API
    setTimeout(() => {
      setAddress('123 Main Street, near Central Park, City');
      setIsLocating(false);
    }, 1500);
  };

  const handleBookEmergency = () => {
    if (!phoneNumber || !address) return;
    
    setStatus('searching');
    
    // Simulate finding a technician
    setTimeout(() => {
      const mockTech = {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        distance: '2.5 km',
        eta: '10 mins',
        rating: 4.8
      };
      setTechnician(mockTech);
      setStatus('assigned');
      
      // Update Context
      setLocation(address);
      setServiceDetails({ contact: phoneNumber, priority: 'High', type: 'Emergency Rescue' });
      setCost(500); // Fixed emergency visit charge
    }, 2500);
  };

  const handleConfirm = () => {
    navigate('/confirmation');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/service')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Emergency Rescue</h2>
      </div>

      {status === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Your Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter current location..."
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button 
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {isLocating ? <Loader2 size={18} className="animate-spin" /> : <Crosshair size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Contact Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-900/50 flex items-start gap-3">
            <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-orange-800 dark:text-orange-200">
              A flat emergency visit charge of ₹500 applies. Additional repair costs will be estimated by the technician on site.
            </p>
          </div>

          <button
            onClick={handleBookEmergency}
            disabled={!phoneNumber || !address}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white font-medium py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Navigation size={20} />
            Find Nearby Technician
          </button>
        </motion.div>
      )}

      {status === 'searching' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-red-200 dark:border-red-900 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-red-600 rounded-full flex items-center justify-center text-white">
              <MapPin size={28} className="animate-bounce" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Locating nearest technician...</h3>
          <p className="text-slate-500">Please hold on, this won't take long.</p>
        </motion.div>
      )}

      {status === 'assigned' && technician && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 text-center">
            <h3 className="text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Technician Assigned!</h3>
            <p className="text-emerald-600 dark:text-emerald-500 text-sm">Arriving in approx. {technician.eta}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center space-y-4 shadow-md">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto overflow-hidden border-4 border-white dark:border-slate-800 shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${technician.name}`} alt="Technician" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{technician.name}</h3>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span>⭐ {technician.rating}</span>
                <span>•</span>
                <span>{technician.distance} away</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href={`tel:${technician.phone}`} className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                <PhoneCall size={18} />
                Call Technician
              </a>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
          >
            Confirm & Proceed to Summary
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmergencyService;
