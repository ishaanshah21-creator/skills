import React from 'react';
import { motion } from 'framer-motion';
import styles from './RequestCard.module.css';

export const RequestCard = ({ request, onAccept, onReject, type = 'received' }) => {
  const user = type === 'received' ? request.sender : request.receiver;

  return (
    <motion.div className={styles.card} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <div className={styles.header}>
        <img src={user.profilePicture} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h3>{user.name}</h3>
          <p className={styles.skill}>Wants to learn: <strong>{request.skillRequested}</strong></p>
          <p className={styles.time}>{new Date(request.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`${styles.badge} ${styles[request.status]}`}>{request.status}</span>
      </div>

      {request.message && <p className={styles.message}>"{request.message}"</p>}

      <div className={styles.userSkills}>
        {user.skills && user.skills.length > 0 && (
          <>
            <p className={styles.skillsLabel}>Skills:</p>
            <div className={styles.skills}>
              {user.skills.map((skill, idx) => (
                <span key={idx} className={styles.skill}>
                  {skill.skillName}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {type === 'received' && request.status === 'pending' && (
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.accept}`} onClick={() => onAccept(request._id)}>
            ✓ Accept
          </button>
          <button className={`${styles.btn} ${styles.reject}`} onClick={() => onReject(request._id)}>
            ✕ Reject
          </button>
        </div>
      )}
    </motion.div>
  );
};
