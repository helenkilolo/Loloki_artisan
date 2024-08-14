// /pages/admin/dashboard.js
import Link from 'next/link';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/SignIn');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/products">
              <a className="text-blue-500 hover:underline">Manage Products</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/orders">
              <a className="text-blue-500 hover:underline">Manage Orders</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <a className="text-blue-500 hover:underline">Manage Users</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/reviews">
              <a className="text-blue-500 hover:underline">Manage Reviews</a>
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

