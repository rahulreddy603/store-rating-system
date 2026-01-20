import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const OwnerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/store/owner-dashboard')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.storeName} Dashboard</h1>
      <p className="text-xl my-4">Average Rating: <span className="font-bold text-yellow-600">{data.averageRating} ⭐</span></p>

      <h3 className="text-lg font-semibold mb-2">Recent Ratings:</h3>
      <div className="space-y-2">
        {data.raters.map((r, index) => (
          <div key={index} className="border p-3 rounded">
            <p><strong>{r.User.name}</strong> ({r.User.email})</p>
            <p>Rating: {r.rating} stars</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;