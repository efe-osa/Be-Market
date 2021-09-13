import React from 'react';
import Nav from 'components/Nav';
import FeaturedProduct from 'components/FeaturedProduct';
import globalStyles from 'styles/index.module.css';
import ProductsQueryProvider from 'provider/ProductsQueryProvider';
import useCart from 'hooks/useCart';
import useSearchQuery from 'hooks/useSearchQuery';
import ProductList from 'components/ProductList';
import CartProvider from 'provider/CartProvider';
import { PageProps } from 'types';

function Home({ data, featured }: PageProps) {
  const cart = useCart();
  const { applyFilters, productQuery } = useSearchQuery();
  return (
    <main className={globalStyles.appContainer}>
      <CartProvider {...cart}>
        <Nav />
      </CartProvider>
      <FeaturedProduct featured={featured} addToCart={cart.addToCart} />
      <ProductsQueryProvider data={data} productQuery={productQuery} updateQuery={applyFilters}>
        <ProductList addToCart={cart.addToCart} />
      </ProductsQueryProvider>
    </main>
  );
}

export default Home;
