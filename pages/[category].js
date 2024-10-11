import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { firstWordsToUpperCase } from '../helpers/stringFunction';
import styles from  '../styles/Category.module.scss';

export default function ProductCategory({ data }) {
  const [products, setProducts] = useState(null);
  const router = useRouter();
  const { category } = router.query;
  
  useEffect(() => {
    setProducts(data);
  }, [data])

  const largeClassOption = (idx) => {
    if (category === 'tech') {
      if (idx === 1 || idx === 3) {
        return styles.large;
      }
    } else if (category === 'lifestyle') {
      if (idx === 0 || idx === 7) {
        return styles.large;
      }
    }

    return ''
  };

  return (
    <>
      <div className={styles.container}>
        <div id="items" className={styles.grid}>
          {
            products && products.map((product, idx) => (
              <div key={product.id} className={`${styles.item} ${largeClassOption(idx)}`}>
                <div className={styles.item_inner}>
                  <div className={styles.item_card} onClick={() => router.push(`/${product.category}/${product.id}`)}>
                    <div className={styles.item_img_wrap}>
                      <div className={styles.img_spacer}>
                        <img src={`/images/${product.pic_default}`} alt={product.name} />
                      </div>
                    </div>
                    <div className={styles.item_info}>
                      <div className={`${styles.stack} ${styles.horizontal} ${styles.bulleted}`}>
                        <span className="text_tertiary">{product.brand}</span>
                        <span className="text_tertiary">
                          <span className={`${styles.text_tertiary}`}>{firstWordsToUpperCase(product.category)}</span>
                        </span>
                      </div>
                      <div className={`${styles.stack} ${styles.horizontal}`}>
                        <div className={styles.text_ellipsis}>
                          <div className="text_secondary">{product.name}</div>
                        </div>
                        <div className="text_secondary">{`$${product.price}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await axios.get(`https://my-json-server.typicode.com/Rian-Sanjaya/product_list_db_json/products`);
  const products = res.data;

  const paths = products.map((product) => ({
    params: { category: product.category }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`https://my-json-server.typicode.com/Rian-Sanjaya/product_list_db_json/products?category=${params.category}`);
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