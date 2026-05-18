import express from 'express';
import { auth } from '../middleware/auth.js';
import { sendMessage, getMessages, getConversations } from '../controllers/messageController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Send a message
router.post('/send', sendMessage);

// Get messages with a specific user
router.get('/:userId', getMessages);

// Get all conversations
router.get('/', getConversations);

export default router;
