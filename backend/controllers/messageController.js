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
    // Get all users that current user has messaged with
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    }).sort({ createdAt: -1 });

    // Get unique users
    const userMap = new Map();
    messages.forEach((msg) => {
      const otherUserId = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
      if (!userMap.has(otherUserId.toString())) {
        userMap.set(otherUserId.toString(), {
          userId: otherUserId,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
        });
      }
    });

    // Get user details for each conversation
    const conversations = [];
    for (const [, conv] of userMap) {
      const user = await User.findById(conv.userId).select('_id name profilePicture email');
      conversations.push({
        user,
        lastMessage: conv.lastMessage,
        lastMessageTime: conv.lastMessageTime,
      });
    }

    res.status(200).json({
      success: true,
      data: conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
