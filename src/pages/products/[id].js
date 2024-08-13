import { MongoClient, ObjectId } from 'mongodb';
import ProductDetail from '../../app/components/ProductDetail';
import { useCart } from '../../context/CartContext';

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

export default function CartPage() {
  const { state } = useCart();

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {state.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        state.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}