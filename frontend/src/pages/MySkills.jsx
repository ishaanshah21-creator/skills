import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import styles from './MySkills.module.css';

export const MySkills = () => {
  const { user } = useAuth();

  return (
    <div className={styles.mySkillsPage}>
      <Sidebar active="skills" />

      <main className={styles.content}>
        <div className={styles.container}>
          <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1>⭐ My Skills</h1>
            <p>Manage and showcase your expertise</p>
          </motion.div>

          <div className={styles.skillsOverview}>
            <div className={styles.skillsCard}>
              <h3>Total Skills</h3>
              <p className={styles.count}>{user?.skills?.length || 0}</p>
            </div>
            <div className={styles.skillsCard}>
              <h3>Expertise Levels</h3>
              <div className={styles.levels}>
                <span>Beginner: {user?.skills?.filter((s) => s.experienceLevel === 'Beginner').length || 0}</span>
                <span>Intermediate: {user?.skills?.filter((s) => s.experienceLevel === 'Intermediate').length || 0}</span>
                <span>Advanced: {user?.skills?.filter((s) => s.experienceLevel === 'Advanced').length || 0}</span>
              </div>
            </div>
          </div>

          {user?.skills && user.skills.length > 0 ? (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2>Your Skills</h2>
              <div className={styles.skillsGrid}>
                {user.skills.map((skill, idx) => {
                  const categoryClass = skill.category.replace(/\s+/g, '');
                  return (
                    <motion.div key={idx} className={`${styles.skillCard} ${styles[categoryClass]}`} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                      <h3>{skill.skillName}</h3>
                      <p className={styles.category}>{skill.category}</p>
                      <span className={`${styles.badge} ${styles[skill.experienceLevel]}`}>{skill.experienceLevel}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ) : (
            <div className={styles.emptyState}>
              <p>You haven't added any skills yet. Go to your profile to add your first skill!</p>
              <a href="/profile" className={styles.link}>
                Add Skills →
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
