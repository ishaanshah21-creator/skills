import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  addSkill,
  deleteSkill,
  searchUsersBySkill,
  getSuggestedUsers,
  deleteAccount,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);
router.get('/search', authenticate, searchUsersBySkill);
router.get('/suggested', authenticate, getSuggestedUsers);
router.get('/:id', authenticate, getUserById);
router.put('/profile/update', authenticate, updateProfile);
router.post('/skills/add', authenticate, addSkill);
router.delete('/skills/:skillId', authenticate, deleteSkill);
router.delete('/account', authenticate, deleteAccount);

export default router;
