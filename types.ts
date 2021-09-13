import { Dispatch, SetStateAction } from 'react';

export type PageProps = {
  data: ProductResponse;
  featured: Product;
};

export type ProductImage = {
  src?: string;
  alt?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: ProductImage;
  bestseller: boolean;
  featured: boolean;
  details?: {
    dimensions: {
      width: number;
      height: number;
    };
    size: number;
    description: string;
    recommendations: Array<ProductImage>;
  };
};

export type CartItem = Pick<Product, 'price' | 'image' | 'name' | 'currency'> & {
  quantity: number;
};

export interface ProductResponse {
  products: Product[];
  totalProducts: number;
}
export interface FeaturedProductResponse {
  data: Product;
}

export interface QueryObj {
  cat?: string | string[];
  min?: string;
  max?: string;
  page?: number;
}
export type ProductContextType = {
  productQuery: QueryObj;
  productsLoading: boolean;
  setTotalProducts: Dispatch<SetStateAction<number>>;
  setProductsLoading: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  updateQuery: (q: QueryObj) => void;
  products?: Product[];
  totalProducts?: number;
};

export type ProductProviderType = {
  children: React.ReactChild;
  data: ProductResponse;
  productQuery: QueryObj;
  updateQuery: (q: QueryObj) => void;
};

export type CartContextType = {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  cartItems: CartItem[];
  cartCount: number;
  clearCart: () => void;
  isOpen: boolean;
  toggleCartModal: () => void;
  removeCartItem: (id: number) => void;
};
