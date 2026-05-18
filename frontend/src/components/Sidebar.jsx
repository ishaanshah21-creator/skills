import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { motion } from 'framer-motion';

export const Sidebar = ({ active }) => {
  return (
    <motion.aside className={styles.sidebar} initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
      <div className={styles.menu}>
        <Link to="/dashboard" className={`${styles.menuItem} ${active === 'home' ? styles.active : ''}`}>
          🏠 Home
        </Link>
        <Link to="/profile" className={`${styles.menuItem} ${active === 'profile' ? styles.active : ''}`}>
          👤 Profile
        </Link>
        <Link to="/my-skills" className={`${styles.menuItem} ${active === 'skills' ? styles.active : ''}`}>
          ⭐ My Skills
        </Link>
        <Link to="/search" className={`${styles.menuItem} ${active === 'search' ? styles.active : ''}`}>
          🔍 Search Users
        </Link>
        <Link to="/requests" className={`${styles.menuItem} ${active === 'requests' ? styles.active : ''}`}>
          📨 Requests
        </Link>
        <Link to="/chat" className={`${styles.menuItem} ${active === 'chat' ? styles.active : ''}`}>
          💬 Messages
        </Link>
        <Link to="/settings" className={`${styles.menuItem} ${active === 'settings' ? styles.active : ''}`}>
          ⚙️ Settings
        </Link>
      </div>
    </motion.aside>
  );
};
