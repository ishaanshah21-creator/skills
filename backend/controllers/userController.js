import User from '../models/User.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { skill, department, page = 1, limit = 10 } = req.query;

    let query = {};

    // Filter by skill
    if (skill) {
      query['skills.skillName'] = { $regex: skill, $options: 'i' };
    }

    // Filter by department
    if (department) {
      query.department = department;
    }

    const skip = (page - 1) * limit;

    const users = await User.find(query).skip(skip).limit(parseInt(limit)).select('-password');

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('connections', 'name email profilePicture');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, college, department, profilePicture, socialLinks } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (college) updateData.college = college;
    if (department) updateData.department = department;
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (socialLinks) updateData.socialLinks = socialLinks;

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add skill
export const addSkill = async (req, res) => {
  try {
    const { skillName, category, experienceLevel } = req.body;

    if (!skillName || !category) {
      return res.status(400).json({ success: false, message: 'Please provide skill name and category' });
    }

    const user = await User.findById(req.user._id);

    user.skills.push({
      skillName,
      category,
      experienceLevel: experienceLevel || 'Beginner',
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const user = await User.findById(req.user._id);

    user.skills = user.skills.filter((skill) => skill._id.toString() !== skillId);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search users by skill
export const searchUsersBySkill = async (req, res) => {
  try {
    const { skill, category, experienceLevel } = req.query;

    let query = {};

    if (skill) {
      query['skills.skillName'] = { $regex: skill, $options: 'i' };
    }

    if (category) {
      query['skills.category'] = category;
    }

    if (experienceLevel) {
      query['skills.experienceLevel'] = experienceLevel;
    }

    const users = await User.find(query).select('-password');

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get suggested users
export const getSuggestedUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const suggestedUsers = await User.find({ _id: { $ne: req.user._id } }).select('-password').limit(limit);

    res.status(200).json({
      success: true,
      data: suggestedUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Please provide password' });
    }

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
