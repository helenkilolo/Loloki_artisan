// /pages/admin/analytics.js
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminAnalytics() {
  useAuth();

  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const salesRes = await fetch('/api/admin/analytics/sales', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userRes = await fetch('/api/admin/analytics/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const inventoryRes = await fetch('/api/admin/analytics/inventory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const salesData = await salesRes.json();
      const userData = await userRes.json();
      const inventoryData = await inventoryRes.json();

      setSalesData(salesData);
      setUserData(userData);
      setInventoryData(inventoryData);

      // Initialize charts here...
    };

    fetchAnalytics();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Sales Analytics</h2>
            <canvas id="salesChart"></canvas>
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Analytics</h2>
            <canvas id="userChart"></canvas>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Inventory Analytics</h2>
            <ul>
              {inventoryData.map(product => (
                <li key={product._id}>
                  {product.name}: {product.stock} in stock
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

