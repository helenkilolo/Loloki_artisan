import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure only authorized admins can access
        },
      });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure only authorized admins can delete users
      },
    });

    if (res.ok) {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } else {
      console.error('Failed to delete user');
    }
  };

  const toggleBanUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}/ban`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, banned: !user.banned } : user))
      );
    } else {
      console.error('Failed to ban/unban user');
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Manage Users</h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="border p-4 rounded-lg flex justify-between items-center">
              <span>{user.email} - {user.banned ? 'Banned' : 'Active'}</span>
              <div>
                <button 
                  onClick={() => deleteUser(user._id)} 
                  className="bg-red-500 text-white py-1 px-4 rounded ml-4"
                >
                  Delete
                </button>
                <button 
                  onClick={() => toggleBanUser(user._id)} 
                  className="bg-yellow-500 text-white py-1 px-4 rounded ml-4"
                >
                  {user.banned ? 'Unban' : 'Ban'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

