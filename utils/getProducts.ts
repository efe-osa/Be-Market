import { ProductResponse } from 'types';
import getData from './getData';

export default async function getProduct(q: string) {
  const res = await getData<ProductResponse>(`/api/products?${q}`);
  return res;
}
