import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import ProductDetail from '../../app/components/ProductDetail';
import { useCart } from '../../context/CartContext';

export async function getServerSideProps({ params }) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const productsCollection = db.collection('products');

  const product = await productsCollection.findOne({ _id: new ObjectId(params.id) });

  return {
    props: {
      product: {
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.amount,  // Ensure this is a number in your database
        description: product.tags.join(', '),
        image: product.image,
        seller: product.seller,
        stock: product.stock,
        country: product.country,
      },
    },
  };
}

export default function ProductDetailPage({ product }) {
  const { cart } = useCart(); // Accessing the cart from context

  return (
    <div className="container mx-auto">
      <ProductDetail product={product} />

      <h2 className="text-2xl font-bold mt-8">Your Cart</h2>
      {cart && cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart && cart.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={64}  // Provide width
              height={64}  // Provide height
              style={{ objectFit: 'cover' }}  // Ensure image fits nicely
              className="rounded mr-4" 
            />
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
