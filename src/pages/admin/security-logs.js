// /pages/admin/security-logs.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminSecurityLogs() {
  useAuth();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/admin/security-logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Security Logs</h1>
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log._id} className="border p-4 rounded-lg">
              <p>Action: {log.action}</p>
              <p>User: {log.userId.email}</p>
              <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
