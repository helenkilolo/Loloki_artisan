import { useEffect, useState } from 'react';
import Header from '../../../app/components/header';
import Footer from '../../../app/components/footer';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Orders</h1>
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="flex justify-between">
              <span>Order #{order._id}</span>
              <span>User: {order.user.email}</span>
              <span>Total: ${order.totalPrice}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
