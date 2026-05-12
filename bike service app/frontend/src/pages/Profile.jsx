import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bike, History, MapPin, Phone, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { bike } = useBooking();
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center relative">
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={loading}
          className="absolute right-0 top-0 p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:scale-110 transition-transform"
        >
          {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
        </button>
        {isEditing && (
          <button 
            onClick={() => setIsEditing(false)}
            className="absolute right-10 top-0 p-2 text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
          <User size={48} />
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-3xl font-bold text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1 outline-none focus:ring-2 focus:ring-blue-500 mb-2 dark:text-white"
          />
        ) : (
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user?.name}</h2>
        )}
        <p className="text-slate-500 dark:text-slate-400 capitalize">{user?.role} Account</p>
      </div>

      <div className="grid gap-6">
        {/* User Info Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Information</h3>
          
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Email Address</p>
              <p className="text-slate-900 dark:text-white font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Mobile Number</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Add phone number"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 dark:text-white mt-1"
                />
              ) : (
                <p className="text-slate-900 dark:text-white font-medium">{user?.phone || 'Not added'}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Account Role</p>
              <p className="text-slate-900 dark:text-white font-medium capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Stats/Current Bike Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Current Active Bike</h3>
          {bike ? (
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <Bike size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{bike.brand} {bike.model}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{bike.registrationNumber} • {bike.cc}cc</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-sm">No active bike selected for booking.</p>
          )}
        </div>

        {/* Quick Links/Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-800">
             <History className="mx-auto mb-2 text-slate-400" />
             <p className="text-xs font-bold text-slate-500 uppercase">Bookings</p>
             <p className="text-xl font-bold dark:text-white">Active</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-800">
             <MapPin className="mx-auto mb-2 text-slate-400" />
             <p className="text-xs font-bold text-slate-500 uppercase">Location</p>
             <p className="text-xl font-bold dark:text-white">Enabled</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
