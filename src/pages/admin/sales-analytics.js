import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function SalesAnalytics() {
  useAuth(); // Ensure the admin is authenticated
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const res = await fetch('/api/admin/sales-analytics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSalesData(data);
      } else {
        console.error('Failed to fetch sales data');
      }
    };

    fetchSalesData();
  }, []);

  const chartData = {
    labels: salesData.map(data => data.date),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(data => data.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Sales Analytics</h1>
        <Line data={chartData} />
      </div>
      <Footer />
    </>
  );
}
