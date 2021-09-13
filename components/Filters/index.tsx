import { stringify } from 'querystring';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ProductContext } from 'provider/ProductsQueryProvider';
import { CATEGORIES } from 'utils/constants';
import fetchProduct from 'utils/getProducts';
import keyDownListener from 'utils/keyDownListeners';
import isSmallLaptop from 'utils/isSmallLatop';
import useCurrentWidth from 'hooks/useCurrentWidth';
import { sortAlphabetically, sortByPrice } from 'utils/sort';
import styles from './filter.module.css';

function Filters({ toggleFilter }: { toggleFilter: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [sortBy, setSortBy] = useState('');
  const {
    products = [],
    setProducts,
    setTotalProducts,
    updateQuery,
    setProductsLoading,
    productQuery: query,
  } = useContext(ProductContext);
  const { push } = useRouter();
  const [cat, setCat] = useState<typeof CATEGORIES>([]);
  const [range, setRange] = useState('');
  const width = useCurrentWidth();
  const hasQuery = cat.length > 1 || range.length > 1;

  useEffect(() => {
    closeButtonRef.current?.focus();
    let queriedCat: string[];
    if (query.cat) {
      typeof query.cat === 'string' ? (queriedCat = [query.cat]) : (queriedCat = query.cat);
    } else {
      queriedCat = [];
    }
    const queriedRange = query.min ? `${query.min}-${query.max}` : '';
    setRange(queriedRange);
    setCat(queriedCat);
  }, [query.cat, query.max, query.min]);

  const refetchProducts = async (q: string) => {
    setProductsLoading(true);
    try {
      const res = await fetchProduct(q);
      setProducts(res.products);
      setTotalProducts(res.totalProducts);
    } catch (error: unknown) {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const getMinMax = (priceRange: string): { min: string; max?: string } => {
    const val = priceRange.split('-');
    const min = val[0];
    const max = val[1];
    const q = max ? { min, max } : { min, max: '' };
    return q;
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const categories = new Set(cat);
    categories.has(value) ? categories.delete(value) : categories.add(value);
    const newCat = Array.from(categories);
    setCat(newCat);
    if (isSmallLaptop(width)) {
      const q = { ...query, page: 1, cat: newCat };
      updateQuery(q);
      refetchProducts(stringify(q));
    }
  };

  const handlePriceFilter = async (
    e: React.MouseEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.currentTarget;
    setRange(value);

    if (isSmallLaptop(width)) {
      const q = { ...query, page: 1, ...getMinMax(value) };
      updateQuery(q);
      refetchProducts(stringify(q));
    }
  };

  const handleSortFilter = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setSortBy(currentTarget.value);
    let newProducts;
    if (currentTarget.value === 'price') {
      newProducts = sortByPrice(products);
    } else {
      newProducts = sortAlphabetically(products);
    }
    setProducts([...newProducts]);
  };

  const applyFilter = async () => {
    const q = { category: cat, page: 1, ...getMinMax(range) };
    updateQuery(q);
    refetchProducts(stringify(q));
    closeButtonRef.current?.click();
  };

  const clearFilter = () => {
    setRange('');
    setSortBy('');
    setCat([]);
    push('/');
  };

  return (
    <aside className={styles.filterOverlay}>
      <div className={styles.filterBox}>
        <div className={styles.filterBoxHeader}>
          <p>Filter</p>
          <button
            ref={closeButtonRef}
            onClick={toggleFilter}
            onKeyDown={keyDownListener(toggleFilter)}
            type="button"
            name="close-filter"
            aria-label="close-filter"
          >
            &times;
          </button>
        </div>
        <div className={styles.filterBoxBody}>
          <div className={styles.filterCategory}>
            {hasQuery ? (
              <button
                type="button"
                onClick={clearFilter}
                onKeyDown={keyDownListener(clearFilter)}
                className={styles.clearFilterBtn}
              >
                &times; Clear
              </button>
            ) : null}
            <h4 className={styles.filterCategoryTitle}>Category</h4>
            {CATEGORIES.map((category) => (
              <span key={category} className={styles.filterOption}>
                <input
                  value={category}
                  onChange={handleCategoryFilter}
                  checked={cat.some((c) => c === category)}
                  type="checkbox"
                  name="category"
                  id={category}
                  className={styles.input}
                />
                <label htmlFor={category} className={styles.label}>
                  {category}
                </label>
              </span>
            ))}
          </div>

          <div className={styles.filterCategory}>
            <h4 className={styles.filterCategoryTitle}>Price range</h4>
            <span className={styles.filterOption}>
              <input
                checked={range === '0-20'}
                onChange={handlePriceFilter}
                value="0-20"
                type="radio"
                name="category"
                id="<20"
                className={styles.input}
              />
              <label htmlFor="<20" className={styles.label}>
                Lower than $20
              </label>
            </span>
            <span className={styles.filterOption}>
              <input
                checked={range === '20-100'}
                onChange={handlePriceFilter}
                value="20-100"
                type="radio"
                name="category"
                id="20-100"
                className={styles.input}
              />
              <label htmlFor="20-100" className={styles.label}>
                $20 - $100
              </label>
            </span>
            <span className={styles.filterOption}>
              <input
                checked={range === '100-200'}
                onChange={handlePriceFilter}
                value="100-200"
                type="radio"
                name="category"
                id="100-200"
                className={styles.input}
              />
              <label htmlFor="100-200" className={styles.label}>
                $100 - $200
              </label>
            </span>
            <span className={styles.filterOption}>
              <input
                checked={range === '200-'}
                onChange={handlePriceFilter}
                value="200-"
                type="radio"
                name="category"
                id=">200"
                className={styles.input}
              />
              <label htmlFor=">200" className={styles.label}>
                More than $200
              </label>
            </span>
          </div>
          {width < 1024 ? (
            <>
              <div className={styles.filterCategory}>
                <h4 className={styles.filterCategoryTitle}>Sort By</h4>
                <span className={styles.filterOption}>
                  <input
                    checked={sortBy === 'price'}
                    onChange={handleSortFilter}
                    type="radio"
                    name="sort-by"
                    id="price"
                    value="price"
                    className={styles.input}
                  />
                  <label htmlFor="price" className={styles.label}>
                    Price
                  </label>
                </span>
                <span className={styles.filterOption}>
                  <input
                    checked={sortBy === 'a-z'}
                    onChange={handleSortFilter}
                    type="radio"
                    name="sort-by"
                    id="a-z"
                    value="a-z"
                    className={styles.input}
                  />
                  <label htmlFor="a-z" className={styles.label}>
                    A-Z
                  </label>
                </span>
              </div>
            </>
          ) : null}
        </div>

        <div className={styles.filterBoxFooter}>
          <button
            onClick={clearFilter}
            onKeyDown={keyDownListener(clearFilter)}
            type="button"
            className={styles.clearBtn}
          >
            Clear
          </button>
          <button
            onClick={applyFilter}
            onKeyDown={keyDownListener(applyFilter)}
            type="button"
            className={styles.saveBtn}
          >
            Save
          </button>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(Filters);
