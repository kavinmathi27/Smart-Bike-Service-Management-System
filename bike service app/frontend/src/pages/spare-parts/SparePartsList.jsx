import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ShoppingCart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SparePartsList = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ brand: '', model: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts();
  }, [filter]);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const { brand, model } = filter;
      const response = await axios.get('/api/spare-parts', { params: { brand, model } });
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Spare Parts</h2>
        <p className="text-slate-600 dark:text-slate-400">Find the right parts for your bike.</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Brand</label>
          <select
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Brands</option>
            <option value="Honda">Honda</option>
            <option value="Yamaha">Yamaha</option>
            <option value="TVS">TVS</option>
            <option value="Royal Enfield">Royal Enfield</option>
            <option value="KTM">KTM</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Model</label>
          <input
            type="text"
            name="model"
            value={filter.model}
            onChange={handleFilterChange}
            placeholder="Search model..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Parts List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : parts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parts.map((part) => (
            <div
              key={part._id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 bg-slate-100 dark:bg-slate-900 relative">
                {part.imageUrl ? (
                  <img
                    src={part.imageUrl}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ShoppingCart size={48} />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ₹{part.price}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{part.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{part.brand} • {part.model}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{part.description}</p>
                <button
                  onClick={() => navigate(`/spare-parts/book/${part._id}`)}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors mt-2"
                >
                  Book Now
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <ShoppingCart size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No parts found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default SparePartsList;
