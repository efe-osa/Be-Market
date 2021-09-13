import React from 'react';
import Image from 'next/image';
import { CartItem, Product } from 'types';
import Placeholder from 'public/images/placeholder.png';
import globalStyles from 'styles/index.module.css';
import appendCurrency from 'utils/appendCurrency';
import keyDownListener from 'utils/keyDownListeners';
import styles from './product.module.css';

interface Props {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function ProductItem({
  image,
  name,
  currency,
  bestseller,
  category,
  price,
  addToCart,
}: Props & Omit<Product, 'id' | 'details' | 'featured'>) {
  const handleAddToCart = () => {
    addToCart({
      image,
      name,
      currency,
      price,
    });
  };
  return (
    <figure>
      <div className={styles.product}>
        {bestseller ? <span className={styles.bestSellerTag}>best seller</span> : null}
        <Image
          src={image.src ? image.src : (Placeholder as unknown as string)}
          alt={image.alt ? image.alt : name}
          objectFit="cover"
          objectPosition="center"
          loading="lazy"
          sizes="414"
          width={100}
          height={100}
          layout="intrinsic"
        />
        <button
          type="button"
          onClick={handleAddToCart}
          onKeyDown={keyDownListener(handleAddToCart)}
          className={styles.cta}
        >
          Add to cart
        </button>
      </div>
      <figcaption className={styles.productCaption}>
        <span className={globalStyles.category}>{category}</span>
        <p className={styles.productTitle}>{name}</p>
        <span className={styles.productPrice}>{appendCurrency(price, currency)}</span>
      </figcaption>
    </figure>
  );
}

export default ProductItem;
