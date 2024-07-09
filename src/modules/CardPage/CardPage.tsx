import styles from './CardPage.module.scss';
import { BackButton } from '../../components/BackButton';
import { useContext } from 'react';
import { StateContext } from '../../Store';
import { CartCard } from '../../components/CartCard';

export const CartPage = () => {
  const state = useContext(StateContext);
  const { bascket, products } = state;

  let sum = 0;

  for (const item of bascket) {
    if (item.quantity > 1) {
      sum += item.price * item.quantity;
    }
    sum += item.price;
    console.log(item);
    // sum = item.quantity * sum;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <BackButton />
      </div>
      <h2 className={styles.title}>Cart</h2>

      {bascket.length > 0 ? (
        <div className={styles.mainBlocks}>
          <ul className={styles.list}>
            {products
              .filter(item =>
                bascket.find(bascketItem => bascketItem.itemId === item.itemId),
              )
              .map(item => (
                <li className={styles.listItem} key={item.id}>
                  <div className={styles.card}>
                    <CartCard
                      category={item.category}
                      itemId={item.itemId}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      item={item}
                    />
                  </div>
                </li>
              ))}
          </ul>

          <div className={styles.total}>
            <div className={styles.totalSum}>
              <h1>{`$${sum}`}</h1>
            </div>
            <div className={styles.sum}>
              <p>{`Total for ${bascket.length} items`}</p>
            </div>
            <div className={styles.border}></div>
            <div className={styles.totalButton}>
              <button className={styles.totalCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <h1 className={styles.empty}>Your Cart is empty</h1>
        </div>
      )}
    </div>
  );
};
