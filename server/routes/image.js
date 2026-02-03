import express from 'express';
import { uploadImage, deleteImage, uploadMultipleImages } from '../controllers/imageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Ensure uploads directory exists
import { mkdir } from 'fs/promises';
mkdir('uploads').catch(() => {}); // Ignore if already exists

// Image routes
router.post('/upload', protect, admin, upload.single('image'), uploadImage);
router.post('/upload-multiple', protect, admin, upload.array('images', 10), uploadMultipleImages);
router.delete('/:public_id', protect, admin, deleteImage);

export default router;