// /pages/api/reviews.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  if (req.method === 'POST') {
    const { name, rating, comment } = req.body;
    await db.collection('reviews').insertOne({ name, rating, comment });
    res.status(201).json({ message: 'Review submitted!' });
  } else if (req.method === 'GET') {
    const reviews = await db.collection('reviews').find().toArray();
    res.status(200).json(reviews);
  }

  client.close();
}
