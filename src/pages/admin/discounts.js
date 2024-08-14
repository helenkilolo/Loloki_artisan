import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [form, setForm] = useState({ code: '', discountPercentage: '', expiresAt: '', usageLimit: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const res = await fetch('/api/admin/discounts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setDiscounts(data);
    };

    fetchDiscounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `/api/admin/discounts/${form.id}` : '/api/admin/discounts';

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedDiscount = await res.json();
      if (editing) {
        setDiscounts((prev) =>
          prev.map((discount) => (discount._id === updatedDiscount._id ? updatedDiscount : discount))
        );
      } else {
        setDiscounts((prev) => [...prev, updatedDiscount]);
      }
      setForm({ code: '', discountPercentage: '', expiresAt: '', usageLimit: '' });
      setEditing(false);
    } else {
      console.error('Failed to save discount');
    }
  };

  const editDiscount = (discount) => {
    setForm({ ...discount });
    setEditing(true);
  };

  const deleteDiscount = async (id) => {
    const res = await fetch(`/api/admin/discounts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setDiscounts((prev) => prev.filter((discount) => discount._id !== id));
    } else {
      console.error('Failed to delete discount');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Discount Codes</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={form.discountPercentage}
            onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })}
          />
          <input
            type="date"
            placeholder="Expires At"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          />
          <input
            type="number"
            placeholder="Usage Limit"
            value={form.usageLimit}
            onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            {editing ? 'Update Discount' : 'Add Discount'}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {discounts.map((discount) => (
            <li key={discount._id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{discount.code}</h2>
              <p>{discount.discountPercentage}% off</p>
              <p>Expires at: {new Date(discount.expiresAt).toLocaleDateString()}</p>
              <button onClick={() => editDiscount(discount)} className="bg-blue-500 text-white py-1 px-4 rounded">
                Edit
              </button>
              <button onClick={() => deleteDiscount(discount._id)} className="bg-red-500 text-white py-1 px-4 rounded ml-4">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
