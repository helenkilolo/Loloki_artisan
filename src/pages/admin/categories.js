// /pages/admin/categories.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminCategoryPage() {
  useAuth(); // Ensure the admin is authenticated

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', subcategories: [] });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('/api/admin/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `/api/admin/categories/${form.id}` : '/api/admin/categories';

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedCategory = await res.json();
      if (editing) {
        setCategories((prev) =>
          prev.map((category) => (category._id === updatedCategory._id ? updatedCategory : category))
        );
      } else {
        setCategories((prev) => [...prev, updatedCategory]);
      }
      setForm({ name: '', subcategories: [] });
      setEditing(false);
    } else {
      console.error('Failed to save category');
    }
  };

  const editCategory = (category) => {
    setForm({ ...category });
    setEditing(true);
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } else {
      console.error('Failed to delete category');
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Categories</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subcategories (comma separated)"
            value={form.subcategories.join(', ')}
            onChange={(e) => setForm({ ...form, subcategories: e.target.value.split(',').map(sub => sub.trim()) })}
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            {editing ? 'Update Category' : 'Add Category'}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <p>Subcategories: {category.subcategories.join(', ')}</p>
              <button onClick={() => editCategory(category)} className="bg-blue-500 text-white py-1 px-4 rounded">
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)} className="bg-red-500 text-white py-1 px-4 rounded ml-4">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
