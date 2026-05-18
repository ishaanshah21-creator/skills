import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    bio: {
      type: String,
      default: '',
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    college: {
      type: String,
      required: [true, 'Please provide college name'],
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'Other'],
    },
    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150?text=User',
    },
    socialLinks: {
      linkedin: {
        type: String,
        default: '',
      },
      github: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
    },
    skills: [
      {
        skillName: String,
        category: String,
        experienceLevel: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced'],
          default: 'Beginner',
        },
      },
    ],
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
