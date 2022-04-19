import React from 'react';
import classNames from 'class-names';
import styles from './Loader.module.css';
const Spiner = () => {
  let oddDots = classNames(styles.oddDots, styles.dots);
  let evenDots = classNames(styles.evenDots, styles.dots);
  return (
    <div className={styles.container}>
      <div className={styles.dotsContainer}>
        <div className={evenDots}></div>
        <div className={oddDots}></div>
        <div className={evenDots}></div>
      </div>
    </div>
  );
};
export default Spiner;
