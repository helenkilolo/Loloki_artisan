// /pages/admin/products.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';
import { useRouter } from 'next/router';

export default function AdminProducts() {
  useAuth(); // Ensure the admin is authenticated

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '', image: '' });
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/admin/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `/api/admin/products/${form.id}` : '/api/admin/products';

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      if (editing) {
        setProducts((prev) =>
          prev.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
        );
      } else {
        setProducts((prev) => [...prev, updatedProduct]);
      }
      setForm({ name: '', category: '', price: '', stock: '', description: '', image: '' });
      setEditing(false);
    } else {
      console.error('Failed to save product');
    }
  };

  const editProduct = (product) => {
    setForm({ ...product });
    setEditing(true);
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } else {
      console.error('Failed to delete product');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Products</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            {editing ? 'Update Product' : 'Add Product'}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p>{product.category}</p>
              <p>${product.price}</p>
              <button onClick={() => editProduct(product)} className="bg-blue-500 text-white py-1 px-4 rounded">
                Edit
              </button>
              <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white py-1 px-4 rounded ml-4">
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
