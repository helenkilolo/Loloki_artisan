import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
    };

    fetchAnalytics();
  }, []);

  const salesChartData = {
    labels: salesData.map(sale => sale.date),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(sale => sale.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const userChartData = {
    labels: userData.map(user => user.date),
    datasets: [
      {
        label: 'New Users',
        data: userData.map(user => user.count),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Sales Analytics</h2>
            <Line data={salesChartData} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Analytics</h2>
            <Line data={userChartData} />
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
    </>
  );
}

