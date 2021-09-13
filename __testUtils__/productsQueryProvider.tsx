import ProductsProvider from 'provider/ProductsQueryProvider';
import { ProductProviderType } from 'types';

export default function renderProductQueryProvider(
  Component: React.ReactElement,
  props: Omit<ProductProviderType, 'children'>,
) {
  return <ProductsProvider {...props}>{Component}</ProductsProvider>;
}
