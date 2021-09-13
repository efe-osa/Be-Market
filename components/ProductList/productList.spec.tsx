import { cleanup, render, screen } from '@testing-library/react';
import renderProductsQueryProvider from '__testUtils__/productsQueryProvider';
import ProductList from './index';

afterEach(cleanup);

const props = {
  applyFilters: jest.fn,
  updateQuery: jest.fn,
  productQuery: {
    cat: '',
    max: '',
    min: '',
    page: 1,
  },
  data: {
    totalProducts: 0,
    products: [],
  },
};
describe('<ProductList/>', () => {
  jest.mock('next/router', () => ({
    useRouter() {
      return {
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
      };
    },
  }));

  it('renders with no values', async () => {
    render(renderProductsQueryProvider(<ProductList addToCart={jest.fn} />, props));

    expect(screen.getByText(/no products/i)).toBeInTheDocument();
  });

  it('renders with values', async () => {
    const data = {
      totalProducts: 1,
      products: [
        {
          id: '1',
          currency: 'usd',
          price: 100,
          bestseller: false,
          featured: true,
          image: { src: '', alt: 'Sample' },
          name: 'sample',
          category: 'food',
        },
      ],
    };
    render(
      renderProductsQueryProvider(<ProductList addToCart={jest.fn} />, {
        ...props,
        data,
      }),
    );

    expect((await screen.findAllByTitle(/product-item/i)).length).toBe(data.products.length);
  });
});
