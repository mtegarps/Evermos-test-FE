import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarsRating from 'react-star-rate';
import styles from '../../styles/ProductDetail.module.scss';

export default function ProductDetail({ data }) {
  const [product, setProduct] = useState(null);
  // console.log('data: ', data);

  useEffect(() => {
    setProduct(data[0]);
  }, [data])

  return (
    <>
      <div className={styles.product_info_section}>
        <section className={styles.product_gallery_wrapper}>
          <div className={styles.product_carousel_wrapper}>
            <img src={`/images/${product?.pic_default}`} alt={product?.name} />
          </div>
        </section>
        <section className={styles.product_info_wrapper}>
          <div className={styles.product_name}>{product?.name}</div>
          <div className={styles.desc}>{product?.desc}</div>
        </section>
        <section className={styles.product_rating_wrapper}>
          <div>
            <StarsRating value={product?.rating_star} disabled="true" />
            <div style={{ display: 'inline-block', fontSize: '14px', marginLeft: '8px' }}>{`${product?.rating_star} (${product?.rating_reviews} reviews)`}</div>
          </div>
        </section>
        <section className={styles.product_pricing_wrapper}>
          <div className={styles.product_price}>{`$${product?.price}`}</div>
          <div>{`4 interest-free payments of ${(product?.price / 4).toFixed(2)}`}</div>
        </section>
        <section className={styles.product_add_to_cart}>
          <div><button>ADD TO CART</button></div>
        </section>
      </div>
    </>
  )
};

export async function getStaticPaths() {
  const res = await axios.get(`https://my-json-server.typicode.com/Rian-Sanjaya/product_list_db_json/products`);
  const products = res.data;

  const paths = products.map((product) => ({
    params: { category: product.category, pid: product.id }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`https://my-json-server.typicode.com/Rian-Sanjaya/product_list_db_json/products?category=${params.category}&id=${params.pid}`);
    const data = res.data;

    return {
      props: {
        data,
      }
    }
  } catch (error) {
    console.error(error);
  }
}