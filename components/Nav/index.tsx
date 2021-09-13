import dynamic from 'next/dynamic';
import Image from 'next/image';
import { CartContext } from 'provider/CartProvider';
import Cart from 'public/icons/shopping-cart.svg';
import React, { useContext } from 'react';
import globalStyles from 'styles/index.module.css';
import keyDownListener from 'utils/keyDownListeners';
import styles from './nav.module.css';

const CartModal = dynamic(() => import('components/CartList'));

function Nav() {
  const { cartCount, isOpen, toggleCartModal } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <section className={globalStyles.container}>
        <div className={styles.nav}>
          <Image src="/icons/logo.svg" alt="Bejamas" width="159" height="26" layout="fixed" />
          <button
            onKeyDown={keyDownListener(toggleCartModal)}
            onClick={toggleCartModal}
            className={styles.cartBtn}
            type="button"
            title="shopping-cart"
            aria-label="View cart"
          >
            <Cart />
            {cartCount > 0 ? (
              <span title="cart-counter" className={styles.cartCounter}>
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </section>
      {isOpen ? <CartModal /> : null}
    </header>
  );
}

export default Nav;
