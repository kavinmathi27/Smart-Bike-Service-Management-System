import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ChevronLeft, Zap, Disc, Gauge, Activity, Plus } from 'lucide-react';

const CATEGORIES = [
  { id: 'engine', name: 'Engine Issues', icon: <Activity />, issues: ['Engine Misfire', 'Overheating', 'Strange Noise', 'Oil Leak'], estCost: 1500 },
  { id: 'electrical', name: 'Electricals', icon: <Zap />, issues: ['Battery Dead', 'Headlight Issue', 'Starter Problem', 'Wiring Fault'], estCost: 800 },
  { id: 'brakes', name: 'Brakes', icon: <Disc />, issues: ['Brake Pad Worn', 'Fluid Leak', 'Spongy Brakes', 'Squeaking Noise'], estCost: 600 },
  { id: 'tires', name: 'Tires & Wheels', icon: <Gauge />, issues: ['Puncture', 'Alignment Issue', 'Tire Replacement', 'Bent Rim'], estCost: 400 },
];

const SpecificRepair = () => {
  const { setServiceDetails, setCost, setDate, setTime, setLocation, bike } = useBooking();
  const navigate = useNavigate();

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [address, setAddress] = useState('');
  
  // Hardcode date/time for simplicity in this specific flow, or add inputs
  // We'll keep it simple: Add Location, auto-assign nearest date.

  if (!bike) {
    navigate('/');
    return null;
  }

  const toggleIssue = (issue, cost) => {
    const exists = selectedIssues.find(i => i.name === issue);
    if (exists) {
      setSelectedIssues(selectedIssues.filter(i => i.name !== issue));
    } else {
      setSelectedIssues([...selectedIssues, { name: issue, cost }]);
    }
  };

  const totalCost = selectedIssues.reduce((acc, curr) => acc + curr.cost, 0);

  const handleBook = () => {
    if (selectedIssues.length === 0 || !address) return;
    
    setServiceDetails({
      type: 'Specific Repairs',
      issues: selectedIssues.map(i => i.name)
    });
    setCost(totalCost);
    setLocation(address);
    // Auto-set dummy date/time for this flow
    setDate(new Date().toISOString().split('T')[0]);
    setTime('10:00 AM');
    
    navigate('/confirmation');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/service')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Specific Repair</h2>
      </div>

      <p className="text-slate-500 dark:text-slate-400">Select the issues you are facing with your {bike.brand}.</p>

      <div className="space-y-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 font-semibold text-lg border-b border-slate-200 dark:border-slate-700">
              <div className="text-emerald-500">{cat.icon}</div>
              {cat.name}
            </div>
            <div className="p-2 grid gap-1">
              {cat.issues.map((issue) => {
                const isSelected = selectedIssues.some(i => i.name === issue);
                return (
                  <label key={issue} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleIssue(issue, cat.estCost / 2)}
                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`${isSelected ? 'font-medium text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{issue}</span>
                    </div>
                    <span className="text-sm text-slate-500">~₹{cat.estCost / 2}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedIssues.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
          <h3 className="font-semibold text-lg">Pick-up Location</h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter complete address"
            rows={2}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
          ></textarea>
        </motion.div>
      )}

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-10">
        <div className="container mx-auto max-w-md md:max-w-3xl flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{selectedIssues.length} issues selected</p>
            <p className="font-bold text-xl">₹{totalCost}</p>
          </div>
          <button
            onClick={handleBook}
            disabled={selectedIssues.length === 0 || !address}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.98]"
          >
            Review Booking
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecificRepair;
