import express from 'express';
import {
  sendRequest,
  getRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest,
} from '../controllers/requestController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/send', authenticate, sendRequest);
router.get('/', authenticate, getRequests);
router.get('/sent', authenticate, getSentRequests);
router.put('/:requestId/accept', authenticate, acceptRequest);
router.put('/:requestId/reject', authenticate, rejectRequest);
router.delete('/:requestId', authenticate, deleteRequest);

export default router;
