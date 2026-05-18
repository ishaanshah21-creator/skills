import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import styles from './Landing.module.css';

export const Landing = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />
      <div className={styles.landing}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <motion.div className={styles.content} initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              <h1>Connecting Skills. Empowering Students.</h1>
              <p>Join a vibrant community where students collaborate, learn, and grow together. Find peers with the skills you want to learn and share your expertise.</p>

              <div className={styles.ctaButtons}>
                <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Get Started Now →
                </Link>
                <a href="#features" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Explore Features
                </a>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <h3>1000+</h3>
                  <p>Active Students</p>
                </div>
                <div className={styles.stat}>
                  <h3>50+</h3>
                  <p>Skills</p>
                </div>
                <div className={styles.stat}>
                  <h3>100%</h3>
                  <p>Free</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={styles.features}>
          <div className={styles.container}>
            <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              Why Choose SkillSync?
            </motion.h2>

            <div className={styles.featureGrid}>
              {[
                {
                  icon: '👤',
                  title: 'Create Your Profile',
                  description: 'Showcase your skills, interests, and learning goals to the community.',
                },
                {
                  icon: '⭐',
                  title: 'Add Your Skills',
                  description: 'List skills you know and want to learn, with experience levels.',
                },
                {
                  icon: '🔍',
                  title: 'Find Peers',
                  description: 'Search and filter users by skills, department, and experience.',
                },
                {
                  icon: '📨',
                  title: 'Send Requests',
                  description: 'Connect with peers and send collaboration requests.',
                },
                {
                  icon: '💬',
                  title: 'Chat & Collaborate',
                  description: 'Start conversations and share knowledge with connected peers.',
                },
                {
                  icon: '🚀',
                  title: 'Grow Together',
                  description: 'Build meaningful connections and accelerate your learning journey.',
                },
              ].map((feature, idx) => (
                <motion.div key={idx} className={styles.featureCard} whileHover={{ y: -8 }} initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.6, delay: idx * 0.1 }}>
                  <div className={styles.icon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className={styles.howItWorks}>
          <div className={styles.container}>
            <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              How It Works
            </motion.h2>

            <div className={styles.steps}>
              {[
                { step: '01', title: 'Sign Up', description: 'Create your account with email and college details.' },
                { step: '02', title: 'Add Skills', description: 'List skills you know and want to learn.' },
                { step: '03', title: 'Discover', description: 'Find and connect with peers who match your interests.' },
                { step: '04', title: 'Collaborate', description: 'Learn together, share knowledge, and grow.' },
              ].map((item, idx) => (
                <motion.div key={idx} className={styles.step} initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.6, delay: idx * 0.1 }}>
                  <div className={styles.stepNumber}>{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.testimonials}>
          <div className={styles.container}>
            <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              What Students Say
            </motion.h2>

            <div className={styles.testimonialGrid}>
              {[
                {
                  name: 'Priya Sharma',
                  role: 'B.Tech CSE',
                  college: 'IIIT Delhi',
                  text: 'SkillSync helped me find amazing peers to learn from. The platform is intuitive and the community is super supportive!',
                },
                {
                  name: 'Arjun Patel',
                  role: 'B.Tech IT',
                  college: 'NIT Trichy',
                  text: 'I found mentors and friends on SkillSync. It\'s the perfect place to exchange knowledge and collaborate on projects.',
                },
                {
                  name: 'Neha Gupta',
                  role: 'B.Tech ECE',
                  college: 'Delhi University',
                  text: 'The skill search feature is brilliant. I connected with experts in IoT and learned so much from them!',
                },
              ].map((testimonial, idx) => (
                <motion.div key={idx} className={styles.testimonialCard} whileHover={{ y: -4 }} initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.6, delay: idx * 0.1 }}>
                  <p className={styles.quote}>"{testimonial.text}"</p>
                  <div className={styles.author}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role} • {testimonial.college}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div className={styles.ctaContent} initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              <h2>Ready to Start Learning?</h2>
              <p>Join thousands of students already sharing knowledge and growing together.</p>
              <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                Get Started for Free
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
