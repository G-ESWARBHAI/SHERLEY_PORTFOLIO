import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  verifyToken,
  getAllUsers,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyResetToken
} from '../controllers/authController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

// Protected routes (require authentication)
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);
router.get('/verify', authenticate, verifyToken);
router.post('/change-password', authenticate, changePassword);

// Admin routes
router.get('/users', authenticate, isAdmin, getAllUsers);
router.put('/users/:id', authenticate, isAdmin, updateUser);
router.delete('/users/:id', authenticate, isAdmin, deleteUser);

export default router;
