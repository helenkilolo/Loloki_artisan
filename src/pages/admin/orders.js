import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminOrders() {
  useAuth(); // Ensure the admin is authenticated

  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        router.push('/SignIn');
      }
    };

    fetchOrders();
  }, [router]);

  const updateOrderStatus = async (id, status) => {
    const res = await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updatedOrder = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    }
  };

  const refundOrder = async (id) => {
    const res = await fetch(`/api/admin/orders/${id}/refund`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: 'Refunded' } : order
        )
      );
    } else {
      console.error('Failed to refund order');
    }
  };

  const downloadReport = async () => {
    const res = await fetch('/api/admin/orders/report', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders_report.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error('Failed to download report');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Orders</h1>
        <button
          onClick={downloadReport}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-8"
        >
          Download Orders Report
        </button>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="border p-4 rounded-lg">
                <h2 className="text-2xl font-bold">Order #{order._id}</h2>
                <p>User: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <p>Status: {order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="mt-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button 
                  onClick={() => refundOrder(order._id)} 
                  className="bg-red-500 text-white py-1 px-4 rounded ml-4"
                >
                  Refund
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}



