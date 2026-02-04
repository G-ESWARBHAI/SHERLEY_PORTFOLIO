// Example usage of Cloudinary functions

import { 
  uploadImage, 
  uploadImageFromBuffer, 
  deleteImage, 
  getTransformedImageUrl 
} from './cloudinary.js';

// Example 1: Upload image from file path
export const exampleUploadFromPath = async (filePath) => {
  const result = await uploadImage(filePath, {
    folder: 'portfolio/images',
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' }
    ]
  });
  
  if (result.success) {
    console.log('Image uploaded:', result.url);
    return result;
  }
};

// Example 2: Upload image from buffer (e.g., from multer)
export const exampleUploadFromBuffer = async (buffer) => {
  const result = await uploadImageFromBuffer(buffer, {
    folder: 'portfolio/images',
    public_id: 'custom-image-id',
    format: 'jpg'
  });
  
  if (result.success) {
    console.log('Image uploaded:', result.url);
    return result;
  }
};

// Example 3: Delete image
export const exampleDeleteImage = async (publicId) => {
  const result = await deleteImage(publicId);
  if (result.success) {
    console.log('Image deleted successfully');
  }
};

// Example 4: Get transformed image URL
export const exampleGetTransformedUrl = (publicId) => {
  const url = getTransformedImageUrl(publicId, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'webp'
  });
  console.log('Transformed URL:', url);
  return url;
};
