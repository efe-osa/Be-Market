import { stringify } from 'querystring';
import React, { useContext, useState } from 'react';
import ArrowLeft from 'public/icons/prev-arrow.svg';
import ArrowRight from 'public/icons/next-arrow.svg';
import fetchProducts from 'utils/getProducts';
import keyDownListener from 'utils/keyDownListeners';
import { ProductContext } from 'provider/ProductsQueryProvider';
import styles from './pagination.module.css';

function Pagination() {
  const {
    totalProducts = 0,
    setProducts,
    setTotalProducts,
    updateQuery,
    productQuery,
  } = useContext(ProductContext);
  const [page, setPage] = useState(productQuery.page ?? 1);
  const numOfPages = Math.ceil(totalProducts / 6);
  function updatePage(p: number) {
    setPage(p);
  }
  async function refetchProduct(pageNum: number) {
    const q = { ...productQuery, page: pageNum };
    updateQuery(q);
    const res = await fetchProducts(stringify(q));
    setProducts(res.products);
    setTotalProducts(res.totalProducts);
  }

  async function goToNextPage() {
    if (page < numOfPages) {
      updatePage(page + 1);
      refetchProduct(page + 1);
    }
  }
  async function goToPrevPage() {
    if (page >= 1) {
      updatePage(page - 1);
      refetchProduct(page - 1);
    }
  }
  async function handlePageChange({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const num = parseInt(currentTarget.dataset.buttonid as string, 10);
    updatePage(num);
    refetchProduct(num);
  }

  function renderButtons() {
    return new Array(numOfPages).fill(1).map((_, idx) => {
      const pageNum = idx + 1;
      return (
        <button
          className={styles.pageButton}
          key={`page${pageNum}`}
          name={`page${pageNum}`}
          data-buttonid={pageNum.toString()}
          onClick={handlePageChange}
          onKeyDown={keyDownListener(handlePageChange)}
          type="button"
        >
          <span className={page === pageNum ? styles.active : ''}>{pageNum}</span>
        </button>
      );
    });
  }

  return (
    <section className={styles.pageButtonBox}>
      {numOfPages > 0 ? (
        <>
          <button
            disabled={page === 1}
            className={styles.pageButton}
            aria-label="prev-page"
            name="next"
            onClick={goToPrevPage}
            onKeyDown={keyDownListener(goToPrevPage)}
            type="button"
          >
            <ArrowLeft />
          </button>
          {renderButtons()}
          <button
            disabled={page === numOfPages}
            className={styles.pageButton}
            aria-label="next-page"
            name="next"
            onClick={goToNextPage}
            onKeyDown={keyDownListener(goToNextPage)}
            type="button"
          >
            <ArrowRight />
          </button>
        </>
      ) : null}
    </section>
  );
}

export default React.memo(Pagination);
