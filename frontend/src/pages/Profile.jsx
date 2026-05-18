import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { getAvatarUrl } from '../utils/constants';
import { Sidebar } from '../components/Sidebar';
import { Modal } from '../components/Modal';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import styles from './Profile.module.css';

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [skillForm, setSkillForm] = useState({
    skillName: '',
    category: 'Programming',
    experienceLevel: 'Beginner',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.updateProfile({
        name: profile.name,
        bio: profile.bio,
        college: profile.college,
        department: profile.department,
        profilePicture: profile.profilePicture,
        socialLinks: profile.socialLinks,
      });
      updateUserProfile(response.data.user);
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!skillForm.skillName) {
      toast.error('Please fill all skill fields');
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.addSkill(skillForm);
      updateUserProfile(response.data.user);
      toast.success('Skill added successfully!');
      setSkillForm({ skillName: '', category: 'Programming', experienceLevel: 'Beginner' });
      setShowAddSkill(false);
    } catch (error) {
      toast.error('Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await userAPI.deleteSkill(skillId);
        updateUserProfile(response.data.user);
        toast.success('Skill deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  return (
    <div className={styles.profilePage}>
      <Sidebar active="profile" />

      <main className={styles.content}>
        <div className={styles.container}>
          <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1>My Profile</h1>
            <button className={`${styles.editBtn} ${editMode ? styles.active : ''}`} onClick={() => setEditMode(!editMode)}>
              {editMode ? '✓ Done' : '✎ Edit'}
            </button>
          </motion.div>

          <div className={styles.grid}>
            {/* Profile Card */}
            <motion.section className={styles.profileCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className={styles.profileHeader}>
                <img src={getAvatarUrl(profile.profilePicture)} alt={profile.name} className={styles.avatar} />
                {editMode && (
                  <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleProfileChange} placeholder="Profile picture URL" />
                )}
              </div>

              {editMode ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Bio</label>
                    <textarea name="bio" value={profile.bio} onChange={handleProfileChange} rows="3" placeholder="Tell us about yourself..." />
                  </div>
                  <div className={styles.formGroup}>
                    <label>College</label>
                    <input type="text" name="college" value={profile.college} onChange={handleProfileChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Department</label>
                    <select name="department" value={profile.department} onChange={handleProfileChange}>
                      <option>CSE</option>
                      <option>ECE</option>
                      <option>ME</option>
                      <option>CE</option>
                      <option>EE</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className={styles.socialLinks}>
                    <h3>Social Links</h3>
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={profile.socialLinks?.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
                    />
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={profile.socialLinks?.github || ''}
                      onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
                    />
                    <input
                      type="url"
                      placeholder="Twitter URL"
                      value={profile.socialLinks?.twitter || ''}
                      onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
                    />
                  </div>

                  <button className={styles.saveBtn} onClick={handleSaveProfile} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <div className={styles.profileInfo}>
                  <h2>{profile.name}</h2>
                  <p className={styles.college}>{profile.college}</p>
                  <p className={styles.department}>{profile.department}</p>
                  {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

                  {profile.socialLinks && (
                    <div className={styles.socials}>
                      {profile.socialLinks.linkedin && (
                        <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                          🔗
                        </a>
                      )}
                      {profile.socialLinks.github && (
                        <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                          💻
                        </a>
                      )}
                      {profile.socialLinks.twitter && (
                        <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                          🐦
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.section>

            {/* Skills Section */}
            <motion.section className={styles.skillsSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className={styles.skillsHeader}>
                <h2>My Skills</h2>
                <button className={styles.addBtn} onClick={() => setShowAddSkill(true)}>
                  + Add Skill
                </button>
              </div>

              {profile.skills && profile.skills.length > 0 ? (
                <div className={styles.skillsList}>
                  {profile.skills.map((skill, idx) => (
                    <motion.div key={idx} className={`${styles.skillItem} ${styles[skill.experienceLevel]}`} whileHover={{ x: 4 }} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <div>
                        <h3>{skill.skillName}</h3>
                        <p>{skill.category}</p>
                        <span className={styles.level}>{skill.experienceLevel}</span>
                      </div>
                      <button className={styles.deleteSkillBtn} onClick={() => handleDeleteSkill(skill._id)}>
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No skills added yet. Start by adding your first skill!</p>
                  <button className={styles.addBtn} onClick={() => setShowAddSkill(true)}>
                    + Add Your First Skill
                  </button>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </main>

      <Modal isOpen={showAddSkill} onClose={() => setShowAddSkill(false)} title="Add New Skill">
        <div className={styles.skillFormModal}>
          <div className={styles.formGroup}>
            <label>Skill Name</label>
            <input type="text" value={skillForm.skillName} onChange={(e) => setSkillForm({ ...skillForm, skillName: e.target.value })} placeholder="e.g., React, Python, UI Design" />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}>
              <option>Programming</option>
              <option>Design</option>
              <option>Data Science</option>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>DevOps</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Experience Level</label>
            <select value={skillForm.experienceLevel} onChange={(e) => setSkillForm({ ...skillForm, experienceLevel: e.target.value })}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <button className={styles.submitBtn} onClick={handleAddSkill} disabled={loading}>
            {loading ? 'Adding...' : 'Add Skill'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
