import type { NextApiHandler } from 'next';
import db from 'firebaseDB/server';

const getProducts: NextApiHandler = async (req, res) => {
  const page = (req.query.page as string) || '1';
  const orderBy = req.query.orderBy as string;
  const category = req.query.cat;
  const min = parseInt(req.query.min as string, 10);
  const max = parseInt(req.query.max as string, 10);

  try {
    const productRef = await db.collection('products');
    let queriedRef;

    if (!orderBy || !category || !min || !max) {
      queriedRef = productRef;
    }

    if (orderBy) {
      queriedRef = queriedRef
        ? queriedRef.orderBy(orderBy, 'asc')
        : (queriedRef = productRef.orderBy(orderBy, 'asc'));
    }

    if (category) {
      const opStr = typeof category === 'string' ? '==' : 'in';
      queriedRef = queriedRef
        ? queriedRef.where('category', opStr, category)
        : (queriedRef = productRef.where('category', opStr, category));
    }

    if (min && max) {
      queriedRef = queriedRef
        ? queriedRef.where('price', '>=', min).where('price', '<=', max)
        : (queriedRef = productRef.where('price', '>=', min).where('price', '<=', max));
    } else if (min) {
      queriedRef = queriedRef
        ? queriedRef.where('price', '>=', min)
        : (queriedRef = productRef.where('price', '>=', min));
    } else if (max) {
      queriedRef = queriedRef
        ? queriedRef.where('price', '<=', max)
        : (queriedRef = productRef.where('price', '<=', max));
    }

    const totalProducts = (await queriedRef?.get())?.size;
    const start = parseInt(page, 10) * 6 - 6;
    const snap = await queriedRef?.offset(start).limit(6).get();

    const products: FirebaseFirestore.DocumentData[] = [];

    snap?.forEach((doc) => {
      const data = doc.data();
      products.push(data);
    });
    res.json({
      products,
      totalProducts,
    });
  } catch (error: unknown) {
    res.json({ error });
  }
};

export default getProducts;
