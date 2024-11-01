// /pages/admin/reviews.js
import { useEffect, useState } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { useAuth } from '../../utils/auth';

export default function AdminReviews() {
  useAuth();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('/api/admin/reviews/pending', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const approveReview = async (id) => {
    const res = await fetch(`/api/admin/reviews/${id}/approve`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((review) => review._id !== id));
    }
  };

  const rejectReview = async (id) => {
    const res = await fetch(`/api/admin/reviews/${id}/reject`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((review) => review._id !== id));
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Pending Reviews</h1>
        {reviews.length === 0 ? (
          <p>No pending reviews found.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="border p-4 rounded-lg">
                <p>Product: {review.product.name}</p>
                <p>User: {review.user.email}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <button onClick={() => approveReview(review._id)} className="bg-green-500 text-white py-1 px-4 rounded ml-4">
                  Approve
                </button>
                <button onClick={() => rejectReview(review._id)} className="bg-red-500 text-white py-1 px-4 rounded ml-4">
                  Reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

