import Link from 'next/link';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import Loader from '../../app/components/Loader';
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
  }, [user, loading, router]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/products" className="text-blue-500 hover:underline">
              Manage Products
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="text-blue-500 hover:underline">
              Manage Users
            </Link>
          </li>
          <li>
            <Link href="/admin/reviews" className="text-blue-500 hover:underline">
              Manage Reviews
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}



