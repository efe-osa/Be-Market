import Image from 'next/image';
import Placeholder from 'public/images/placeholder.png';
import React, { Fragment } from 'react';
import globalStyles from 'styles/index.module.css';
import { CartItem, Product } from 'types';
import keyDownListener from 'utils/keyDownListeners';
import styles from './featured.module.css';

interface Props {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  featured: Product;
}

function FeaturedProduct({ addToCart, featured }: Props) {
  const handleAddToCart = () => {
    addToCart({
      image: featured.image,
      name: featured.name,
      currency: featured.currency,
      price: featured.price,
    });
  };
  return (
    <article className={globalStyles.container}>
      <div className={styles.featuredContainer}>
        <h1 className={styles.featuredTitle}>{featured.name}</h1>
        <figure className={styles.featuredImgBox}>
          <Image
            src={featured.image.src ? featured.image.src : (Placeholder as unknown as string)}
            alt={featured.image.alt ? featured.image.alt : featured.name}
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
            layout="fill"
            sizes="1290vw, 414vw"
          />
          <figcaption className={styles.featuredTag}>Photo of the day</figcaption>
        </figure>
        <button
          type="button"
          onClick={handleAddToCart}
          onKeyDown={keyDownListener(handleAddToCart)}
          className={styles.button}
        >
          Add to cart
        </button>
        <section className={styles.featuredCaption}>
          <div>
            <h2 className={globalStyles.subTitle}>About the {featured.name}</h2>
            <span className={styles.featuredCategory}>{featured.category}</span>
            <p className={styles.featuredDescription}>{featured.details?.description ?? ''}</p>
          </div>

          <div>
            <div className={styles.featuredDetails}>
              {featured.details ? (
                <>
                  <h3 className={globalStyles.subTitle}>People also buy</h3>
                  <div className={styles.relatedProducts}>
                    {featured.details.recommendations.map((item, idx) => (
                      <Fragment key={`${item.alt}${idx}`}>
                        <Image
                          src={item.src ?? (Placeholder as unknown as string)}
                          alt={item.alt ?? `product-${idx}`}
                          objectFit="cover"
                          objectPosition="center"
                          loading="lazy"
                          layout="responsive"
                          sizes="414"
                          width={100}
                          height={100}
                        />
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              <h3 className={globalStyles.subTitle}>Details</h3>
              <small className={styles.featuredSmallText}>
                Size: {featured.details?.dimensions.height ?? '0'} x{' '}
                {featured.details?.dimensions.width ?? '0'} pixel
              </small>
              <small className={styles.featuredSmallText}>
                Size: {featured.details?.size ?? '0'} mb
              </small>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export default React.memo(FeaturedProduct);
