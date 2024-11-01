// /pages/admin/promotions.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminPromotions() {
  useAuth();

  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', startDate: '', endDate: '', products: [] });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      const res = await fetch('/api/admin/promotions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setPromotions(data);
    };

    fetchPromotions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `/api/admin/promotions/${form.id}` : '/api/admin/promotions';

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedPromotion = await res.json();
      if (editing) {
        setPromotions((prev) =>
          prev.map((promotion) => (promotion._id === updatedPromotion._id ? updatedPromotion : promotion))
        );
      } else {
        setPromotions((prev) => [...prev, updatedPromotion]);
      }
      setForm({ title: '', description: '', startDate: '', endDate: '', products: [] });
      setEditing(false);
    } else {
      console.error('Failed to save promotion');
    }
  };

  const editPromotion = (promotion) => {
    setForm({ ...promotion });
    setEditing(true);
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Promotions</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
          {/* Add product selection logic */}
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            {editing ? 'Update Promotion' : 'Add Promotion'}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {promotions.map((promotion) => (
            <li key={promotion._id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{promotion.title}</h2>
              <p>{promotion.description}</p>
              <button onClick={() => editPromotion(promotion)} className="bg-blue-500 text-white py-1 px-4 rounded">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
