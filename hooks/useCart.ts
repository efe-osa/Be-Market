import { useCallback, useMemo, useState } from 'react';
import { CartItem } from 'types';

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleCartModal = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const constructCartItem = (item: CartItem, isAddition: boolean = true) => {
    return isAddition
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : {
          ...item,
          quantity: item.quantity - 1,
        };
  };

  const addToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      const itemId = cartItems.findIndex((c) => c.name === item.name);
      itemId >= 0
        ? setCartItems([
            constructCartItem(cartItems[itemId]),
            ...cartItems.filter((_, id) => id !== itemId),
          ])
        : setCartItems([{ ...item, quantity: 1 }, ...cartItems]);
      !isOpen && toggleCartModal();
    },
    [cartItems, isOpen, toggleCartModal],
  );

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    [cartItems],
  );
  const removeCartItem = useCallback(
    (selectedId: number) => {
      const item = cartItems[selectedId];
      item.quantity > 1
        ? setCartItems([
            constructCartItem(item, false),
            ...cartItems.filter((_, id) => id !== selectedId),
          ])
        : setCartItems(cartItems.filter((_, id) => id !== selectedId));
    },
    [cartItems],
  );

  return {
    removeCartItem,
    addToCart,
    cartItems,
    cartCount,
    clearCart,
    isOpen,
    toggleCartModal,
  };
}
