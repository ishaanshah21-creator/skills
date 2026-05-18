import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    department: 'CSE',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        department: formData.department,
      });
      toast.success('Registration successful! Please login');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <motion.div className={styles.authBox} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className={styles.header}>
          <h1>
            <span className={styles.icon}>⚡</span>
            SkillSync
          </h1>
          <h2>Create Account</h2>
          <p>Join our community and start learning</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
          </div>

          <div className={styles.formGroup}>
            <label>College Name</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="e.g., IIIT Delhi" required />
          </div>

          <div className={styles.formGroup}>
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option>CSE</option>
              <option>ECE</option>
              <option>ME</option>
              <option>CE</option>
              <option>EE</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};
