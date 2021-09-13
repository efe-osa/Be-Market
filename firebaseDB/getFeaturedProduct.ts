import db from './server';

export default async function getFeaturedProducts() {
  const ref = db.collection('products');
  const featuredSnap = await ref.where('featured', '==', true).get();
  let featured: FirebaseFirestore.DocumentData | null = null;

  if (featuredSnap.empty) {
    return { featured };
  }

  featuredSnap.forEach((doc) => {
    featured = doc.data();
  });

  return {
    featured,
  };
}
