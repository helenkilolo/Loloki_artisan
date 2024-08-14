// /pages/profile.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/SignIn');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setFirstName(data.firstName);
          setSurname(data.surname);
          setEmail(data.email);
        } else {
          router.push('/SignIn');
        }
      } catch (error) {
        setMessage('Error fetching profile');
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, surname, email, password }),
      });

      if (res.ok) {
        setMessage('Profile updated successfully');
      } else {
        setMessage('Error updating profile');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Surname</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
            Update Profile
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

