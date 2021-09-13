import { createContext } from 'react';
import { CartContextType } from 'types';

export const CartContext = createContext<CartContextType>({
  addToCart: () => {},
  cartItems: [],
  cartCount: 0,
  clearCart: () => {},
  removeCartItem: () => {},
  isOpen: false,
  toggleCartModal: () => {},
});

export default function CartProvider({
  children,
  ...cart
}: { children: React.ReactNode } & CartContextType) {
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
