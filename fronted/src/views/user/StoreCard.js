import React, { useState } from 'react';
import api from '../../api/axios';

const StoreCard = ({ store, onRatingUpdate }) => {
  const [userRating, setUserRating] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRatingSubmit = async (e) => {
    const value = e.target.value;
    if (!value) return;

    setUserRating(value);
    setSubmitting(true);

    try {
      // Logic for submitting/updating a rating
      await api.post('/rating/submit', { 
        storeId: store.id, 
        rating: parseInt(value) 
      });
      
      alert(`Successfully rated ${store.name} ${value} stars!`);
      
      // Refresh the store list to show the updated average rating
      if (onRatingUpdate) onRatingUpdate();
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{store.address}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
          {parseFloat(store.avgRating || 0).toFixed(1)} ⭐
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <label className="text-sm font-medium text-gray-600">Your Rating:</label>
        <select 
          value={userRating}
          onChange={handleRatingSubmit}
          disabled={submitting}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="">Select Stars</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
    </div>
  );
};

export default StoreCard;