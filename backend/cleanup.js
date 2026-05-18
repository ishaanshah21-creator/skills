// Clear all data from MongoDB
// Usage: node cleanup.js (from backend directory)

import mongoose from 'mongoose';
import User from './models/User.js';
import Request from './models/Request.js';
import Skill from './models/Skill.js';
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

const clearDatabase = async () => {
  try {
    console.log('Clearing database...');
    await User.deleteMany({});
    console.log('✓ Users cleared');
    await Request.deleteMany({});
    console.log('✓ Requests cleared');
    await Skill.deleteMany({});
    console.log('✓ Skills cleared');
    console.log('✓ Database cleanup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await clearDatabase();
};

run();
