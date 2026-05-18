import React from 'react';
import styles from './Loader.module.css';

export const Loader = ({ size = 'medium' }) => {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className={styles.pageLoader}>
      <Loader size="large" />
    </div>
  );
};
