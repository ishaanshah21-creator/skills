import React from 'react';
import styles from './Error.module.css';

export const NotFound = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" className={styles.btn}>
          Go Home
        </a>
      </div>
    </div>
  );
};

export const Unauthorized = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1>401</h1>
        <h2>Unauthorized</h2>
        <p>You don't have permission to access this page.</p>
        <a href="/login" className={styles.btn}>
          Login
        </a>
      </div>
    </div>
  );
};
