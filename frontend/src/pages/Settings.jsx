import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from './Settings.module.css';

export const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      // API call would go here
      toast.success('Account deleted successfully');
      logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.settingsPage}>
      <Sidebar active="settings" />

      <main className={styles.content}>
        <div className={styles.container}>
          <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1>⚙️ Settings</h1>
            <p>Manage your account and preferences</p>
          </motion.div>

          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <button className={`${styles.tabBtn} ${activeTab === 'account' ? styles.active : ''}`} onClick={() => setActiveTab('account')}>
                👤 Account
              </button>
              <button className={`${styles.tabBtn} ${activeTab === 'privacy' ? styles.active : ''}`} onClick={() => setActiveTab('privacy')}>
                🔒 Privacy
              </button>
              <button className={`${styles.tabBtn} ${activeTab === 'danger' ? styles.active : ''}`} onClick={() => setActiveTab('danger')}>
                ⚠️ Danger Zone
              </button>
            </aside>

            {/* Content */}
            <div className={styles.settingsContent}>
              {/* Account Settings */}
              {activeTab === 'account' && (
                <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <h2>Account Settings</h2>

                  <div className={styles.settingItem}>
                    <h3>Email</h3>
                    <p className={styles.value}>{user?.email}</p>
                    <small>Your email address cannot be changed</small>
                  </div>

                  <div className={styles.settingItem}>
                    <h3>Name</h3>
                    <p className={styles.value}>{user?.name}</p>
                  </div>

                  <div className={styles.settingItem}>
                    <h3>College</h3>
                    <p className={styles.value}>{user?.college}</p>
                  </div>

                  <div className={styles.settingItem}>
                    <h3>Department</h3>
                    <p className={styles.value}>{user?.department}</p>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Change Password</label>
                    <input type="password" placeholder="Enter new password" />
                    <button className={styles.btn}>Update Password</button>
                  </div>

                  <div className={styles.settingItem}>
                    <h3>Logout</h3>
                    <p>Sign out of your account</p>
                    <button 
                      className={styles.logoutBtn}
                      onClick={() => {
                        logout();
                        navigate('/');
                        toast.success('Logged out successfully');
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </motion.section>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <h2>Privacy & Security</h2>

                  <div className={styles.settingItem}>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="public-profile" defaultChecked />
                      <label htmlFor="public-profile">
                        <strong>Public Profile</strong>
                        <small>Allow other students to view your profile</small>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="show-skills" defaultChecked />
                      <label htmlFor="show-skills">
                        <strong>Show My Skills</strong>
                        <small>Let others see your skills and expertise</small>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="receive-requests" defaultChecked />
                      <label htmlFor="receive-requests">
                        <strong>Receive Requests</strong>
                        <small>Allow others to send you collaboration requests</small>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="email-notifications" defaultChecked />
                      <label htmlFor="email-notifications">
                        <strong>Email Notifications</strong>
                        <small>Get notified about new requests and messages</small>
                      </label>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Danger Zone */}
              {activeTab === 'danger' && (
                <motion.section className={styles.dangerZone} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <h2>Danger Zone</h2>

                  {!deleteConfirm ? (
                    <div className={styles.settingItem}>
                      <h3>Delete Account</h3>
                      <p>Once you delete your account, there is no going back. Please be certain.</p>
                      <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(true)}>
                        Delete My Account
                      </button>
                    </div>
                  ) : (
                    <div className={styles.deleteConfirmation}>
                      <h3>⚠️ Are you sure?</h3>
                      <p>This action cannot be undone. All your data will be permanently deleted.</p>
                      <input
                        type="password"
                        placeholder="Enter your password to confirm"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                      />
                      <div className={styles.buttonGroup}>
                        <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(false)}>
                          Cancel
                        </button>
                        <button className={styles.confirmDeleteBtn} onClick={handleDeleteAccount} disabled={loading}>
                          {loading ? 'Deleting...' : 'Delete Account'}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
