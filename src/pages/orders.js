// /pages/orders.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth.js';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function OrderHistory() {
  useAuth(); // Protect the route

  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        router.push('/SignIn'); // Redirect if not authenticated
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>
        {orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="border p-4 rounded-lg">
                <h2 className="text-2xl font-bold">Order #{order._id}</h2>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <ul className="mt-4 space-y-2">
                  {order.orderItems.map((item) => (
                    <li key={item._id} className="flex justify-between">
                      <span>{item.name} x {item.qty}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}


