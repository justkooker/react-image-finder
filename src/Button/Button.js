import React from 'react';
import styles from './Button.module.css';

const Button = ({ images, loadMore }) =>
  images.length !== 0 && (
    <div className={styles.wrapper}>
      <button onClick={loadMore} type="button" className={styles.button}>
        more
      </button>
    </div>
  );
export default Button;
