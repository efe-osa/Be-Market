import React, { useState, useContext } from 'react';
import ProductItem from 'components/Product';
import dynamic from 'next/dynamic';
import Sort from 'public/icons/sort.svg';
import Filter from 'public/icons/filter.svg';
import useCurrentWidth from 'hooks/useCurrentWidth';
import Loader from 'components/Loader';
import { CartItem, Product } from 'types';
import Pagination from 'components/Pagination';
import isSmallLaptop from 'utils/isSmallLatop';
import keyDownListener from 'utils/keyDownListeners';
import { sortAlphabetically, sortByPrice } from 'utils/sort';
import { ProductContext } from 'provider/ProductsQueryProvider';
import styles from './productList.module.css';

const FilterBox = dynamic(() => import('components/Filters'));

interface Props {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function ProductList({ addToCart }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { products, setProducts, productsLoading } = useContext(ProductContext);
  const width = useCurrentWidth();
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  const handleSortFilter = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    let newProducts;
    if (products) {
      if (currentTarget.value === 'price') {
        newProducts = sortByPrice(products);
      } else {
        newProducts = sortAlphabetically(products);
      }
      setProducts([...newProducts]);
    }
  };

  const handleOrder = () => {
    if (products) {
      setProducts([...products.reverse()]);
    }
  };
  const renderProducts = () => {
    return (
      <ul title="product-list" className={styles.list}>
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <li title="product-item" key={product.id}>
              <ProductItem
                addToCart={addToCart}
                name={product.name}
                bestseller={product.bestseller}
                category={product.category}
                currency={product.currency}
                image={product.image}
                price={product.price}
              />
            </li>
          ))
        ) : (
          <h1 className={styles.breadcrumb}>No Products</h1>
        )}
      </ul>
    );
  };

  return (
    <section className={styles.productContainer}>
      <div className={styles.productHeader}>
        <span>
          <span className={styles.breadcrumb}>Photography / </span>
          <span className={styles.breadcrumbActive}>Premium Photos</span>
        </span>
        <span className={styles.sortBox}>
          <button
            className={styles.filterBtn}
            type="submit"
            name="open-filters"
            aria-label="open-filters"
            onClick={toggleFilter}
          >
            <Filter />
          </button>
          <button
            onClick={handleOrder}
            onKeyDown={keyDownListener(handleOrder)}
            className={styles.sortBtn}
            type="submit"
            name="change-order"
            aria-label="change-order"
          >
            <Sort />
          </button>
          <label>
            <span className={styles.sortText}>Sort by</span>
            <select onChange={handleSortFilter} className={styles.sortSelect}>
              <option value="">Choose</option>
              <option value="price">Price</option>
              <option value="a-z">Alphabetically</option>
            </select>
          </label>
        </span>
      </div>

      <div className={styles.content}>
        {isSmallLaptop(width) || isOpen ? <FilterBox toggleFilter={toggleFilter} /> : null}
        <div className={styles.listBox}>
          {productsLoading ? <Loader /> : renderProducts()}
          <Pagination />
        </div>
      </div>
    </section>
  );
}

export default ProductList;
