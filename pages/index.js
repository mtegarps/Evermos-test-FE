import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import { firstWordsToUpperCase } from '../helpers/stringFunction';
import { shuffleArray } from '../helpers/arrayFunctions';
import "react-multi-carousel/lib/styles.css";
import styles from '../styles/HomePage.module.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export default function HomePage({ data }) {
  const [products, setProducts] = useState(null);
  const [techs, setTechs] = useState(null);
  const [lifestyles, setLifestyles] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const shuffleProds = [...data];
    shuffleArray(shuffleProds);
    setProducts(shuffleProds);

    const ts = data.filter(item => item.category === 'tech');
    shuffleArray(ts);
    setTechs(ts);

    const ls = data.filter(item => item.category === 'lifestyle');
    shuffleArray(ls);
    setLifestyles(ls);
  }, [data]);

  return (
    <>
      <div style={{ padding: '56px 20px' }}>
        {products && (
          <div className={`${styles.slider_container}`}>
            <Carousel
              responsive={responsive}
              className="carousel-container"
              containerClass="container-with-dots"
              sliderClass="slider-class"
              itemClass="item-class"
              dotListClass="dot-list-class"
              showDots
              autoPlay
              infinite
            >
              {products.slice(0, 9).map((product, idx) => (
                <div key={product.id} className={`${styles.product_card}`}>
                  <img
                    srcSet={`/images/${product?.pic_default}`}
                    alt={product?.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div className={`${styles.product_info}`}>
                    <div className={styles.product_name}>
                      {product?.name}
                    </div>
                    <div className={styles.product_price}>
                      {`$${product?.price}`}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <div>
          <div className={`${styles.section_header}`}>
            <Link href={`/tech`}>
              <a className={`${styles.title_box}`}>
                <h2 className={styles.title}>{firstWordsToUpperCase('tech')}</h2>
              </a>
            </Link>
          </div>
          <div style={{ width: '100%', maxWidth: '1920px', margin: '0 auto' }}>
            <div className={`${styles.content_wrapper}`}>
              {techs &&
                techs.slice(0, 4).map((product) => (
                  <div key={product.id} className={`${styles.content_card}`}>
                    <div className={`${styles.image_outer_frame}`}>
                      <div
                        className={`${styles.image_inner_frame}`}
                        onClick={() =>
                          router.push(`/${product?.category}/${product?.id}`)
                        }
                      >
                        <img
                          srcSet={`/images/${product?.pic_default}`}
                          alt={product?.name}
                          className={`${styles.image_element}`}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                    <div className={styles.product_info}>
                      <div className={styles.product_name}>
                        {product?.name}
                      </div>
                      <div className={styles.product_price}>
                        {`$${product?.price}`}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{ paddingTop: '20px', borderBottom: '1px solid #e5e5e5' }}
            ></div>
          </div>
        </div>

        <div>
          <div className={`${styles.section_header}`}>
            <Link href={`/lifestyle`}>
              <a className={`${styles.title_box}`}>
                <h2 className={styles.title}>
                  {firstWordsToUpperCase('lifestyle')}
                </h2>
              </a>
            </Link>
          </div>
          <div style={{ width: '100%', maxWidth: '1920px', margin: '0 auto' }}>
            <div className={styles.lifestyle_content_wrapper}>
              {lifestyles &&
                lifestyles.slice(0, 2).map((product, idx) => (
                  <div key={product.id} className={`${styles.content_card}`}>
                    <div
                      className={`${styles.image_outer_frame}`}
                      style={{ backgroundColor: '#eef2f3' }}
                    >
                      <div
                        className={`${styles.image_inner_frame}`}
                        onClick={() =>
                          router.push(`/${product?.category}/${product?.id}`)
                        }
                      >
                        <img
                          srcSet={`/images/${product?.pic_default}`}
                          alt={product?.name}
                          className={`${styles.image_element}`}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                    <div className={styles.product_info}>
                      <div className={styles.product_name}>
                        {product?.name}
                      </div>
                      <div className={styles.product_price}>
                        {`$${product?.price}`}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get(
      `https://my-json-server.typicode.com/mtegarps/product_list_db_json/products`
    );
    const data = res.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
