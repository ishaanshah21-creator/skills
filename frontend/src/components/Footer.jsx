import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>SkillSync</h3>
            <p>Connecting Skills. Empowering Students.</p>
            <div className={styles.social}>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="LinkedIn">
                🔗
              </a>
              <a href="#" aria-label="GitHub">
                💻
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Product</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#privacy">Privacy</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Get Started</h4>
            <p>Join thousands of students connecting and learning.</p>
            <Link to="/register" className={styles.ctaBtn}>
              Start Learning
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 SkillSync. All rights reserved.</p>
          <div className={styles.links}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
