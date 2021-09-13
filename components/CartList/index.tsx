import CartItem from 'components/CartItem';
import { CartContext } from 'provider/CartProvider';
import React, { useContext } from 'react';
import appendCurrency from 'utils/appendCurrency';
import keyDownListener from 'utils/keyDownListeners';
import styles from './cartList.module.css';

function CartModal() {
  const { cartItems, clearCart, removeCartItem, toggleCartModal } = useContext(CartContext);
  const currency = cartItems[0]?.currency;
  const total = React.useMemo(() => {
    let acc = 0;
    cartItems.forEach((i) => (acc += Number(i.price)));
    return acc;
  }, [cartItems]);

  return (
    <section title="bejamas-cart" aria-modal className={styles.cartModal}>
      <button
        onClick={toggleCartModal}
        onKeyDown={keyDownListener(toggleCartModal)}
        aria-label="close-modal"
        type="button"
        className={styles.cartCloseBtn}
      >
        &times;
      </button>
      <section title="cart-list" className={styles.cartList}>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <React.Fragment key={item.name}>
              <CartItem {...item} idx={idx} removeCartItem={removeCartItem} />
            </React.Fragment>
          ))
        ) : (
          <p className={styles.emptyCart}>No items yet.</p>
        )}
        <span className={styles.total}>
          Total:
          {appendCurrency(total, currency)}
        </span>
      </section>
      <button
        type="button"
        onClick={clearCart}
        onKeyDown={keyDownListener(clearCart)}
        className={styles.cartClearBtn}
      >
        Clear
      </button>
    </section>
  );
}

export default CartModal;
