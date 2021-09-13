import { Product } from 'types';
import generateProducts from '../utils/generateProducts';
import db from './server';

// TODO: create a script and run seed on server
export async function seedDB() {
  try {
    const products = [];
    for (let i = 0; i < 20; i++) {
      const item = generateProducts();
      const product: Product = i === 0 ? { ...item, bestseller: true, featured: true } : item;
      products.push(db.collection('test-products').add(product));
    }
    await Promise.allSettled(products);
  } catch (error: unknown) {
    console.error('Error adding document: ', error);
  }
}

seedDB();