import Gallery from '../models/Gallery.js';
import { uploadImageFromBuffer, deleteImage, getTransformedImageUrl } from '../config/cloudinary.js';
import { getRedisClient } from '../config/database.js';

// Cache keys
const CACHE_KEYS = {
  ALL_IMAGES: 'gallery:all',
  ACTIVE_IMAGES: 'gallery:active',
  BY_CATEGORY: (category) => `gallery:category:${category}`,
  SINGLE_IMAGE: (id) => `gallery:image:${id}`,
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = 3600; // 1 hour

// Helper function to clear cache
const clearCache = async (pattern = '*') => {
  try {
    const redis = getRedisClient();
    if (redis) {
      const searchPattern = pattern === '*' ? 'gallery:*' : `gallery:${pattern}`;
      const keys = await redis.keys(searchPattern);
      if (keys.length > 0) {
        // Delete keys in batches if there are many
        if (keys.length > 100) {
          for (let i = 0; i < keys.length; i += 100) {
            const batch = keys.slice(i, i + 100);
            await redis.del(...batch);
          }
        } else {
          await redis.del(...keys);
        }
      }
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Get all gallery images
export const getAllImages = async (req, res) => {
  try {
    const { category, active } = req.query;
    const cacheKey = category 
      ? CACHE_KEYS.BY_CATEGORY(category)
      : active === 'true' 
        ? CACHE_KEYS.ACTIVE_IMAGES 
        : CACHE_KEYS.ALL_IMAGES;

    // Try to get from cache
    const redis = getRedisClient();
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.json({
          success: true,
          fromCache: true,
          data: JSON.parse(cached),
          count: JSON.parse(cached).length
        });
      }
    }

    // Build query
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (active === 'true') {
      query.isActive = true;
    }

    // Fetch from database
    const images = await Gallery.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v')
      .lean();

    // Cache the result
    if (redis && images.length > 0) {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(images));
    }

    res.json({
      success: true,
      fromCache: false,
      data: images,
      count: images.length
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery images',
      error: error.message
    });
  }
};

// Get single image by ID
export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = CACHE_KEYS.SINGLE_IMAGE(id);

    // Try to get from cache
    const redis = getRedisClient();
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.json({
          success: true,
          fromCache: true,
          data: JSON.parse(cached)
        });
      }
    }

    // Fetch from database
    const image = await Gallery.findById(id).select('-__v').lean();

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Cache the result
    if (redis) {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(image));
    }

    res.json({
      success: true,
      fromCache: false,
      data: image
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching image',
      error: error.message
    });
  }
};

// Add new image
export const addImage = async (req, res) => {
  try {
    const { title, category, description, displayOrder } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title and category are required'
      });
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadImageFromBuffer(req.file.buffer, {
      folder: 'entrepreneur-portfolio/gallery',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
      ]
    });

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary',
        error: uploadResult.error
      });
    }

    // Generate thumbnail URL
    const thumbnailUrl = getTransformedImageUrl(uploadResult.public_id, {
      width: 400,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'webp'
    });

    // Create gallery entry in MongoDB
    const galleryImage = new Gallery({
      title,
      category,
      description: description || '',
      displayOrder: displayOrder || 0,
      imageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.public_id,
      cloudinaryUrl: uploadResult.url,
      thumbnailUrl,
      isActive: true
    });

    await galleryImage.save();

    // Clear cache
    await clearCache('*');

    res.status(201).json({
      success: true,
      message: 'Image added successfully',
      data: galleryImage
    });
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding image',
      error: error.message
    });
  }
};

// Update image
export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, displayOrder, isActive } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    // If new image is uploaded
    if (req.file) {
      // Get existing image to delete from Cloudinary
      const existingImage = await Gallery.findById(id);
      if (existingImage && existingImage.cloudinaryPublicId) {
        await deleteImage(existingImage.cloudinaryPublicId);
      }

      // Upload new image
      const uploadResult = await uploadImageFromBuffer(req.file.buffer, {
        folder: 'entrepreneur-portfolio/gallery',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
        ]
      });

      if (uploadResult.success) {
        updateData.imageUrl = uploadResult.url;
        updateData.cloudinaryPublicId = uploadResult.public_id;
        updateData.cloudinaryUrl = uploadResult.url;
        updateData.thumbnailUrl = getTransformedImageUrl(uploadResult.public_id, {
          width: 400,
          height: 300,
          crop: 'fill',
          quality: 'auto',
          format: 'webp'
        });
      }
    }

    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedImage) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Clear cache
    await clearCache('*');

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: updatedImage
    });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating image',
      error: error.message
    });
  }
};

// Delete image
export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete from Cloudinary
    if (image.cloudinaryPublicId) {
      const deleteResult = await deleteImage(image.cloudinaryPublicId);
      if (!deleteResult.success) {
        console.error('Failed to delete from Cloudinary:', deleteResult.error);
      }
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    // Clear cache
    await clearCache('*');

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const cacheKey = 'gallery:categories';

    // Try to get from cache
    const redis = getRedisClient();
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.json({
          success: true,
          fromCache: true,
          data: JSON.parse(cached)
        });
      }
    }

    // Get unique categories from database
    const categories = await Gallery.distinct('category', { isActive: true });

    // Cache the result
    if (redis && categories.length > 0) {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(categories));
    }

    res.json({
      success: true,
      fromCache: false,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};
