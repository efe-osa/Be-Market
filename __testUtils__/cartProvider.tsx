import CartProvider from 'provider/CartProvider';
import { CartContextType } from 'types';

export default function renderCartProvider(Component: React.ReactElement, props: CartContextType) {
  return <CartProvider {...props}>{Component}</CartProvider>;
}
