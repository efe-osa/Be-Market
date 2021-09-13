import { createContext, useState, useEffect } from 'react';
import { Product, ProductProviderType, ProductContextType } from 'types';

export const ProductContext = createContext<ProductContextType>({
  updateQuery: () => {},
  productsLoading: false,
  setProductsLoading: () => {},
  setTotalProducts: () => {},
  products: [],
  setProducts: () => {},
  totalProducts: 0,
  productQuery: {},
});

function ProductsQueryProvider({
  children,
  data,
  productQuery,
  updateQuery,
}: ProductProviderType): JSX.Element {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTotalProducts(data.totalProducts);
    setProducts(data.products);
  }, [data]);

  return (
    <ProductContext.Provider
      value={{
        productQuery,
        products,
        productsLoading,
        setProducts,
        setProductsLoading,
        totalProducts,
        setTotalProducts,
        updateQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export default ProductsQueryProvider;
