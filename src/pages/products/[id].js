// /pages/products/[id].js
import { MongoClient, ObjectId } from 'mongodb';
import ProductDetail from '../../components/ProductDetail';

export async function getServerSideProps({ params }) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const productsCollection = db.collection('products');

  const product = await productsCollection.findOne({ _id: new ObjectId(params.id) });
  client.close();

  return {
    props: {
      product: {
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.amount,
        description: product.tags.join(', '),
        image: product.image,
        seller: product.seller,
        stock: product.stock,
        country: product.country,
      },
    },
  };
}

export default function ProductPage({ product }) {
  return <ProductDetail product={product} />;
}

