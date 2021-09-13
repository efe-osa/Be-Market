import { cleanup, render, screen } from '@testing-library/react';
import renderCartProvider from '__testUtils__/cartProvider';
import CartList from './index';

afterEach(cleanup);

const props = {
  removeCartItem: jest.fn(),
  addToCart: jest.fn(),
  cartItems: [
    {
      currency: 'usd',
      name: 'Sample',
      price: 104.0,
      image: { src: '/images/placeholder.png', alt: 'test' },
      quantity: 1,
    },
  ],
  cartCount: 2,
  clearCart: jest.fn(),
  isOpen: false,
  toggleCartModal: jest.fn(),
};

it('renders with values', async () => {
  render(renderCartProvider(<CartList />, props));
  expect(screen.getByTitle(/bejamas-cart/i)).toBeInTheDocument();

  const cartItems = screen.getAllByTitle(/cart-item/i).length;
  expect(cartItems).toBe(props.cartItems.length);
});
