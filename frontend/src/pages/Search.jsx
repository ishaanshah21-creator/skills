import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userAPI } from '../utils/api';
import { Sidebar } from '../components/Sidebar';
import { UserCard } from '../components/UserCard';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import styles from './Search.module.css';

export const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    skill: '',
    department: '',
  });
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    searchUsers();
  }, []);

  const searchUsers = async (searchFilters = filters) => {
    setLoading(true);
    try {
      const response = await userAPI.getAllUsers({
        skill: searchFilters.skill || undefined,
        department: searchFilters.department || undefined,
      });
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers();
  };

  const handleConnect = async (userId) => {
    try {
      const response = await userAPI.getSuggestedUsers();
      const connectedId = response.data.data.find((u) => u._id === userId)?._id;
      setConnectedUsers([...connectedUsers, userId]);
      toast.success('Connection request sent!');
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  return (
    <div className={styles.searchPage}>
      <Sidebar active="search" />

      <main className={styles.content}>
        <div className={styles.container}>
          <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1>🔍 Search & Discover Peers</h1>
            <p>Find students with skills you want to learn or collaborate with</p>
          </motion.div>

          {/* Filter Section */}
          <motion.form className={styles.filterSection} onSubmit={handleSearch} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className={styles.filterGrid}>
              <div className={styles.filterGroup}>
                <label>Search Skills</label>
                <input type="text" name="skill" value={filters.skill} onChange={handleFilterChange} placeholder="e.g., React, Python, UI Design" />
              </div>

              <div className={styles.filterGroup}>
                <label>Department</label>
                <select name="department" value={filters.department} onChange={handleFilterChange}>
                  <option value="">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="EE">EE</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </div>
          </motion.form>

          {/* Results */}
          {loading ? (
            <Loader />
          ) : users.length > 0 ? (
            <motion.div className={styles.results} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <p className={styles.resultCount}>Found {users.length} user{users.length !== 1 ? 's' : ''}</p>
              <div className={styles.userGrid}>
                {users.map((user) => (
                  <UserCard key={user._id} user={user} onConnect={handleConnect} isConnected={connectedUsers.includes(user._id)} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div className={styles.emptyState} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <p>😔 No users found matching your criteria</p>
              <small>Try adjusting your filters or check back later</small>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};
