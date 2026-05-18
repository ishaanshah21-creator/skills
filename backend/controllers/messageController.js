import Message from '../models/Message.js';
import User from '../models/User.js';

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ success: false, message: 'Receiver ID and content required' });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    await message.save();
    await message.populate('sender', 'name profilePicture');

    res.status(201).json({
      success: true,
      message: 'Message sent',
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get messages with a specific user
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate('sender', 'name profilePicture')
      .populate('receiver', 'name profilePicture')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all conversations (unique users with messages)
export const getConversations = async (req, res) => {
  try {
    // Get all unique conversations
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $last: '$content' },
          lastMessageTime: { $last: '$createdAt' },
        }
      },
      { $sort: { lastMessageTime: -1 } }
    ]);

    // Populate user details
    const result = [];
    for (const conv of conversations) {
      const user = await User.findById(conv._id).select('_id name profilePicture email');
      if (user) {
        result.push({
          user,
          lastMessage: conv.lastMessage,
          lastMessageTime: conv.lastMessageTime,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
