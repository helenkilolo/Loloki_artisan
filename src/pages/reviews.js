// /pages/reviews.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

const ReviewList = ({ reviews }) => (
  <div>
    {reviews.map((review, index) => (
      <div key={index} className="review">
        <h4>{review.name}</h4>
        <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
        <p>{review.comment}</p>
      </div>
    ))}
  </div>
);

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, rating, comment });
    setName('');
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Your Name" 
        className="w-full mb-4 p-2 border rounded"
        required 
      />
      <select 
        value={rating} 
        onChange={(e) => setRating(Number(e.target.value))} 
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">Rate...</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Write your review..." 
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button 
        type="submit" 
        className="bg-orange-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    setReviews(data);
  };

  const handleReviewSubmit = async (review) => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Customer Reviews</h1>
        <ReviewForm onSubmit={handleReviewSubmit} />
        <ReviewList reviews={reviews} />
      </div>
    </>
  );
}
