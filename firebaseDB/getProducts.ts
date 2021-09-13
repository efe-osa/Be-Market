import db from 'firebaseDB/server';

export default async function getProducts() {
  const ref = db.collection('products');
  const products: FirebaseFirestore.DocumentData[] = [];
  const totalProducts = (await ref.get()).size;
  const productSnap = await ref.limit(6).get();

  if (productSnap.empty) {
    return {
      totalProducts: 0,
      products,
    };
  }

  productSnap.forEach((doc) => products.push(doc.data()));
  return { totalProducts, products };
}
