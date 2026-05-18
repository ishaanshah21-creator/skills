import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAvatarUrl } from '../utils/constants';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav className={styles.navbar} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          SkillSync
        </Link>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
          {!user ? (
            <>
              <Link to="/" className={styles.link}>
                Home
              </Link>
              <a href="#features" className={styles.link}>
                Features
              </a>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={`${styles.link} ${styles.btnRegister}`}>
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={styles.link}>
                Dashboard
              </Link>
              <Link to="/search" className={styles.link}>
                Search Users
              </Link>
              <Link to="/profile" className={styles.link}>
                Profile
              </Link>
              <div className={styles.userMenu}>
                <img src={getAvatarUrl(user.profilePicture)} alt={user.name} className={styles.userImage} />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className={`${styles.link} ${styles.logoutBtn}`}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
