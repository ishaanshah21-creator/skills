import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, 'Please provide skill name'],
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: ['Programming', 'Design', 'Data Science', 'Web Development', 'Mobile Development', 'DevOps', 'Other'],
    },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
