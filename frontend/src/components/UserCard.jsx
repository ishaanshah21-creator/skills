import React from 'react';
import { motion } from 'framer-motion';
import { getAvatarUrl } from '../utils/constants';
import styles from './UserCard.module.css';

export const UserCard = ({ user, onConnect, isConnected }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <img src={getAvatarUrl(user.profilePicture)} alt={user.name} className={styles.avatar} />
        <div className={styles.info}>
          <h3>{user.name}</h3>
          <p className={styles.college}>{user.college}</p>
          <p className={styles.department}>{user.department}</p>
        </div>
      </div>

      {user.bio && <p className={styles.bio}>{user.bio}</p>}

      {user.skills && user.skills.length > 0 && (
        <div className={styles.skills}>
          <h4>Skills</h4>
          <div className={styles.skillTags}>
            {user.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className={`${styles.skillTag} ${styles[skill.experienceLevel]}`}>
                {skill.skillName}
              </span>
            ))}
            {user.skills.length > 3 && <span className={styles.more}>+{user.skills.length - 3}</span>}
          </div>
        </div>
      )}

      <div className={styles.socialLinks}>
        {user.socialLinks?.linkedin && (
          <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            🔗
          </a>
        )}
        {user.socialLinks?.github && (
          <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            💻
          </a>
        )}
        {user.socialLinks?.twitter && (
          <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
            🐦
          </a>
        )}
      </div>

      <button
        className={`${styles.connectBtn} ${isConnected ? styles.connected : ''}`}
        onClick={() => onConnect(user._id)}
        disabled={isConnected}
      >
        {isConnected ? '✓ Connected' : '+ Connect'}
      </button>
    </motion.div>
  );
};
