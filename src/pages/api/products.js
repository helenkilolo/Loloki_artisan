import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { category, sort } = req.query;

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI); // No options needed
    const db = client.db();
    const productsCollection = db.collection('products');

    let query = {};
    if (category) {
      query.category = category;
    }

    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption.price = 1; // Ascending
    } else if (sort === 'price-desc') {
      sortOption.price = -1; // Descending
    }

    const products = await productsCollection.find(query).sort(sortOption).toArray();
    client.close();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


