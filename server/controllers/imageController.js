import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload image to Cloudinary
// @route   POST /api/images/upload
// @access  Private/Admin
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinaryV2.uploader.upload(req.file.path, {
      folder: 'meen-products',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      transformation: [
        { width: 800, height: 800, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
      ]
    });

    // Remove temporary file
    await fs.unlink(req.file.path);

    res.json({
      public_id: result.public_id,
      url: result.secure_url,
      original_filename: req.file.originalname
    });
  } catch (error) {
    console.error('Image upload error:', error);
    
    // Clean up temp file if it exists
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkErr) {
        console.error('Error removing temp file:', unlinkErr);
      }
    }
    
    res.status(500).json({ message: 'Image upload failed' });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/images/:public_id
// @access  Private/Admin
const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    
    await cloudinaryV2.uploader.destroy(public_id);
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Image deletion error:', error);
    res.status(500).json({ message: 'Image deletion failed' });
  }
};

// @desc    Upload multiple images
// @route   POST /api/images/upload-multiple
// @access  Private/Admin
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(async (file) => {
      const result = await cloudinaryV2.uploader.upload(file.path, {
        folder: 'meen-products',
        use_filename: true,
        unique_filename: false,
        transformation: [
          { width: 800, height: 800, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
        ]
      });

      // Remove temporary file
      await fs.unlink(file.path);

      return {
        public_id: result.public_id,
        url: result.secure_url,
        original_filename: file.originalname
      };
    });

    const results = await Promise.all(uploadPromises);
    
    res.json(results);
  } catch (error) {
    console.error('Multiple image upload error:', error);
    
    // Clean up temp files
    if (req.files) {
      req.files.forEach(async (file) => {
        try {
          await fs.unlink(file.path);
        } catch (unlinkErr) {
          console.error('Error removing temp file:', unlinkErr);
        }
      });
    }
    
    res.status(500).json({ message: 'Multiple image upload failed' });
  }
};

export { uploadImage, deleteImage, uploadMultipleImages };