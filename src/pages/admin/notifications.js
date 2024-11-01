import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch('/api/admin/notifications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    const res = await fetch(`/api/admin/notifications/${id}/read`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
    } else {
      console.error('Failed to mark notification as read');
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Notifications</h1>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification._id} className="border p-4 rounded-lg">
              <p>Message: {notification.message}</p>
              <p>Type: {notification.type}</p>
              <p>Recipient: {notification.recipient.name}</p>
              <p>Status: {notification.read ? 'Read' : 'Unread'}</p>
              <button
                onClick={() => markAsRead(notification._id)}
                className="bg-blue-500 text-white py-1 px-4 rounded ml-4"
              >
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
