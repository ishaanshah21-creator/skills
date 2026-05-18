import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { userAPI, requestAPI } from '../utils/api';
import { getAvatarUrl } from '../utils/constants';
import { Sidebar } from '../components/Sidebar';
import { UserCard } from '../components/UserCard';
import { RequestCard } from '../components/RequestCard';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, requestsRes] = await Promise.all([
        userAPI.getSuggestedUsers({ limit: 6 }),
        requestAPI.getRequests({ status: 'pending' }),
      ]);
      setSuggestedUsers(usersRes.data.data);
      setRecentRequests(requestsRes.data.data.slice(0, 3));
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId) => {
    try {
      await requestAPI.sendRequest({
        receiverId: userId,
        skillRequested: 'General Collaboration',
        message: 'Hey! I would like to connect and learn from you.',
      });
      toast.success('Connection request sent!');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.dashboard}>
      <Sidebar active="home" />

      <main className={styles.content}>
        <div className={styles.container}>
          {/* Welcome Banner */}
          <motion.section className={styles.welcome} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.welcomeContent}>
              <img src={getAvatarUrl(user?.profilePicture)} alt={user?.name} className={styles.welcomeImage} />
              <div>
                <h1>Welcome, {user?.name}! 👋</h1>
                <p>Great to see you! Let's explore some amazing learning opportunities today.</p>
              </div>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h3>{user?.skills?.length || 0}</h3>
                <p>Skills</p>
              </div>
              <div className={styles.stat}>
                <h3>{recentRequests.length}</h3>
                <p>Requests</p>
              </div>
              <div className={styles.stat}>
                <h3>{user?.connections?.length || 0}</h3>
                <p>Connections</p>
              </div>
            </div>
          </motion.section>

          <div className={styles.grid}>
            {/* Quick Actions */}
            <motion.section className={styles.quickActions} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <a href="/my-skills" className={styles.actionCard}>
                  <div className={styles.actionIcon}>⭐</div>
                  <h3>Manage Skills</h3>
                  <p>Add or edit your skills</p>
                </a>
                <a href="/search" className={styles.actionCard}>
                  <div className={styles.actionIcon}>🔍</div>
                  <h3>Search Users</h3>
                  <p>Find learning partners</p>
                </a>
                <a href="/profile" className={styles.actionCard}>
                  <div className={styles.actionIcon}>👤</div>
                  <h3>Edit Profile</h3>
                  <p>Update your profile</p>
                </a>
                <a href="/requests" className={styles.actionCard}>
                  <div className={styles.actionIcon}>📨</div>
                  <h3>View Requests</h3>
                  <p>Manage requests</p>
                </a>
              </div>
            </motion.section>

            {/* Recent Requests */}
            <motion.section className={styles.recentRequests} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2>Recent Requests</h2>
              {recentRequests.length > 0 ? (
                <div className={styles.requestList}>
                  {recentRequests.map((req) => (
                    <RequestCard key={req._id} request={req} type="received" onAccept={() => {}} onReject={() => {}} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>📭 No pending requests yet</p>
                  <small>Start connecting with peers to get requests</small>
                </div>
              )}
            </motion.section>

            {/* Suggested Users */}
            <motion.section className={styles.suggestedUsers} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h2>Suggested Peers</h2>
              {suggestedUsers.length > 0 ? (
                <div className={styles.userGrid}>
                  {suggestedUsers.map((suggestedUser) => (
                    <UserCard key={suggestedUser._id} user={suggestedUser} onConnect={handleConnect} isConnected={false} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>🔍 No suggestions available</p>
                  <small>Check back soon or search for specific skills</small>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};
