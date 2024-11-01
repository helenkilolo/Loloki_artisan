import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';

export default function AdminSecurity() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/admin/logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  const terminateSession = async (id) => {
    const res = await fetch(`/api/admin/sessions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      alert('Session terminated successfully');
    } else {
      console.error('Failed to terminate session');
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Security Logs</h1>
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log._id} className="border p-4 rounded-lg">
              <p>Action: {log.action}</p>
              <p>User: {log.user.name} ({log.user.email})</p>
              <p>IP Address: {log.ipAddress}</p>
              <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
              <button
                onClick={() => terminateSession(log._id)}
                className="bg-red-500 text-white py-1 px-4 rounded ml-4"
              >
                Terminate Session
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
