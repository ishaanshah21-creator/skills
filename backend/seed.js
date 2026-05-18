// Sample seed data script
// Usage: node seed.js (from backend directory)

import mongoose from 'mongoose';
import User from './models/User.js';
import Request from './models/Request.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillsync', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const sampleUsers = [
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'password123',
      college: 'IIIT Delhi',
      department: 'CSE',
      bio: 'Passionate about web development and UI/UX design',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      skills: [
        { skillName: 'React', category: 'Web Development', experienceLevel: 'Advanced' },
        { skillName: 'UI Design', category: 'Design', experienceLevel: 'Intermediate' },
        { skillName: 'Node.js', category: 'Programming', experienceLevel: 'Advanced' },
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Arjun Patel',
      email: 'arjun@example.com',
      password: 'password123',
      college: 'NIT Trichy',
      department: 'ECE',
      bio: 'IoT enthusiast and hardware lover',
      profilePicture: 'https://i.pravatar.cc/150?img=2',
      skills: [
        { skillName: 'Arduino', category: 'Programming', experienceLevel: 'Advanced' },
        { skillName: 'IoT', category: 'Other', experienceLevel: 'Intermediate' },
        { skillName: 'Python', category: 'Programming', experienceLevel: 'Intermediate' },
      ],
      socialLinks: {
        github: 'https://github.com',
      },
    },
    {
      name: 'Neha Gupta',
      email: 'neha@example.com',
      password: 'password123',
      college: 'Delhi University',
      department: 'CSE',
      bio: 'Data scientist and ML enthusiast',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      skills: [
        { skillName: 'Python', category: 'Programming', experienceLevel: 'Advanced' },
        { skillName: 'Machine Learning', category: 'Data Science', experienceLevel: 'Intermediate' },
        { skillName: 'TensorFlow', category: 'Data Science', experienceLevel: 'Intermediate' },
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      password: 'password123',
      college: 'BITS Pilani',
      department: 'ME',
      bio: 'Full stack developer, love building products',
      profilePicture: 'https://i.pravatar.cc/150?img=4',
      skills: [
        { skillName: 'JavaScript', category: 'Web Development', experienceLevel: 'Advanced' },
        { skillName: 'MongoDB', category: 'Programming', experienceLevel: 'Intermediate' },
        { skillName: 'Express.js', category: 'Web Development', experienceLevel: 'Advanced' },
      ],
      socialLinks: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      name: 'Riya Chopra',
      email: 'riya@example.com',
      password: 'password123',
      college: 'IIT Delhi',
      department: 'ECE',
      bio: 'Mobile app developer',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      skills: [
        { skillName: 'React Native', category: 'Mobile Development', experienceLevel: 'Intermediate' },
        { skillName: 'Flutter', category: 'Mobile Development', experienceLevel: 'Beginner' },
        { skillName: 'JavaScript', category: 'Programming', experienceLevel: 'Advanced' },
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com',
      },
    },
  ];

  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✓ Created ${createdUsers.length} sample users`);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

const seedRequests = async (users) => {
  const requests = [
    {
      sender: users[0]._id,
      receiver: users[1]._id,
      skillRequested: 'Arduino',
      message: 'I want to learn IoT from you!',
      status: 'pending',
    },
    {
      sender: users[2]._id,
      receiver: users[0]._id,
      skillRequested: 'React',
      message: 'Can you teach me React?',
      status: 'pending',
    },
    {
      sender: users[3]._id,
      receiver: users[2]._id,
      skillRequested: 'Machine Learning',
      message: 'Very interested in learning ML',
      status: 'accepted',
    },
  ];

  try {
    await Request.deleteMany({});
    const createdRequests = await Request.insertMany(requests);
    console.log(`✓ Created ${createdRequests.length} sample requests`);
  } catch (error) {
    console.error('Error seeding requests:', error);
    throw error;
  }
};

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding database...\n');

    const users = await seedUsers();
    await seedRequests(users);

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Email: priya@example.com');
    console.log('Password: password123');

    await mongoose.disconnect();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
