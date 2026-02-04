import express from 'express';
import {
  getAllImages,
  getImageById,
  addImage,
  updateImage,
  deleteImageById,
  getCategories
} from '../controllers/galleryController.js';
import { uploadSingle } from '../middlewares/upload.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes - Get all images (with optional category filter)
// GET /api/gallery?category=Business&active=true
router.get('/', getAllImages);

// Public routes - Get categories
// GET /api/gallery/categories
router.get('/categories', getCategories);

// Public routes - Get single image by ID
// GET /api/gallery/:id
router.get('/:id', getImageById);

// Protected routes - Admin only
// Add new image (requires admin authentication)
// POST /api/gallery
router.post('/', authenticate, isAdmin, uploadSingle, addImage);

// Update image (requires admin authentication)
// PUT /api/gallery/:id
router.put('/:id', authenticate, isAdmin, uploadSingle, updateImage);

// Delete image (requires admin authentication)
// DELETE /api/gallery/:id
router.delete('/:id', authenticate, isAdmin, deleteImageById);

export default router;
