import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await api.get('/user/stats');
      const usersRes = await api.get('/user/list');
      setStats(statsRes.data);
      setUsers(usersRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Admin Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">Total Users: {stats.totalUsers}</div>
        <div className="bg-green-100 p-4 rounded shadow">Total Stores: {stats.totalStores}</div>
        <div className="bg-purple-100 p-4 rounded shadow">Total Ratings: {stats.totalRatings}</div>
      </div>

      {/* User Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;