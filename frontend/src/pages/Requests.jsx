import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { requestAPI } from '../utils/api';
import { Sidebar } from '../components/Sidebar';
import { RequestCard } from '../components/RequestCard';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import styles from './Requests.module.css';

export const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const [receivedRes, sentRes] = await Promise.all([requestAPI.getRequests(), requestAPI.getSentRequests()]);
      setRequests(receivedRes.data.data);
      setSentRequests(sentRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await requestAPI.acceptRequest(requestId);
      toast.success('Request accepted!');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to accept request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await requestAPI.rejectRequest(requestId);
      toast.success('Request rejected!');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.requestsPage}>
      <Sidebar active="requests" />

      <main className={styles.content}>
        <div className={styles.container}>
          <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1>📨 Connection Requests</h1>
            <p>Manage your collaboration requests</p>
          </motion.div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'received' ? styles.active : ''}`} onClick={() => setActiveTab('received')}>
              📥 Received ({requests.length})
            </button>
            <button className={`${styles.tab} ${activeTab === 'sent' ? styles.active : ''}`} onClick={() => setActiveTab('sent')}>
              📤 Sent ({sentRequests.length})
            </button>
          </div>

          {/* Received Requests */}
          {activeTab === 'received' && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={styles.requestList}>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <RequestCard key={req._id} request={req} type="received" onAccept={handleAccept} onReject={handleReject} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>📭 No received requests yet</p>
                  <small>When peers request to connect, they'll appear here</small>
                </div>
              )}
            </motion.section>
          )}

          {/* Sent Requests */}
          {activeTab === 'sent' && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={styles.requestList}>
              {sentRequests.length > 0 ? (
                sentRequests.map((req) => <RequestCard key={req._id} request={req} type="sent" onAccept={() => {}} onReject={() => {}} />)
              ) : (
                <div className={styles.emptyState}>
                  <p>📤 No sent requests yet</p>
                  <small>Connect with peers by sending them requests</small>
                </div>
              )}
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
};
