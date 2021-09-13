import React from 'react';
import Image from 'next/image';
import { CartItem as TCartItem } from 'types';
import keyDownListener from 'utils/keyDownListeners';
import Placeholder from 'public/images/placeholder.png';
import appendCurrency from 'utils/appendCurrency';
import styles from './cartItem.module.css';

type Props = TCartItem & {
  idx: number;
  removeCartItem: (id: number) => void;
};

function CartItem({ image, name, price, currency, idx, quantity, removeCartItem }: Props) {
  const removeItem = () => {
    removeCartItem(idx);
  };
  return (
    <div className={styles.cartItem}>
      <div title="cart-item" className={styles.container}>
        <span>
          <span className={styles.itemTitle}>{name}</span>
          <span className={styles.itemPrice}>{appendCurrency(price, currency)}</span>
        </span>
        <picture className={styles.cartItemImg}>
          <Image
            alt={image.alt ?? ''}
            src={image.src ?? (Placeholder as unknown as string)}
            width={265}
            height={86}
            loading="lazy"
            layout="intrinsic"
            objectFit="cover"
            objectPosition="center"
          />
          {quantity > 1 ? <span className={styles.cartItemCount}>{quantity}</span> : null}
        </picture>
      </div>
      {quantity > 1 ? (
        <button
          className={styles.removeBtn}
          type="button"
          onClick={removeItem}
          onKeyDown={keyDownListener(removeItem)}
        >
          -
        </button>
      ) : null}
    </div>
  );
}

export default CartItem;
