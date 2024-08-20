// /pages/admin/tax-settings.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminTaxSettings() {
  useAuth();

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch('/api/admin/tax-settings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setSettings(data);
    };

    fetchSettings();
  }, []);

  const updateSetting = async (id, updatedData) => {
    const res = await fetch(`/api/admin/tax-settings/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      setSettings((prevSettings) =>
        prevSettings.map((setting) => (setting._id === id ? updatedData : setting))
      );
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Tax Settings</h1>
        <ul className="space-y-4">
          {settings.map((setting) => (
            <li key={setting._id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{setting.country}</h2>
              <input
                type="number"
                value={setting.taxRate}
                onChange={(e) => updateSetting(setting._id, { ...setting, taxRate: e.target.value })}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}