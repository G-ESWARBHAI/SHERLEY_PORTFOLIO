import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useGalleryStore from '../store/galleryStore';

const GalleryManager = () => {
  const {
    images,
    fetchImages,
    addImage,
    updateImage,
    deleteImage,
    isLoading,
    error
  } = useGalleryStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Business',
    description: '',
    displayOrder: 0,
    isActive: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const categories = ['Business', 'Networking', 'Recognition', 'Events', 'Awards', 'Other'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('displayOrder', formData.displayOrder);
    formDataToSend.append('isActive', formData.isActive);
    
    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }

    try {
      if (editingImage) {
        await updateImage(editingImage._id, formDataToSend);
      } else {
        await addImage(formDataToSend);
      }
      
      // Reset form
      setFormData({
        title: '',
        category: 'Business',
        description: '',
        displayOrder: 0,
        isActive: true
      });
      setSelectedFile(null);
      setShowAddForm(false);
      setEditingImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      category: image.category,
      description: image.description,
      displayOrder: image.displayOrder,
      isActive: image.isActive
    });
    setShowAddForm(true);
  };

  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteImage(imageId);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingImage(null);
    setFormData({
      title: '',
      category: 'Business',
      description: '',
      displayOrder: 0,
      isActive: true
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#D4AF37]">Gallery Management</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors"
        >
          Add New Image
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-[#D4AF37] mb-4">
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white focus:border-[#D4AF37]/50 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white focus:border-[#D4AF37]/50 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white focus:border-[#D4AF37]/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">Display Order</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white focus:border-[#D4AF37]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">Status</label>
                <div className="flex items-center space-x-3 mt-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#D4AF37] bg-[#0F172A]/50 border-white/10 rounded focus:ring-[#D4AF37]/50"
                  />
                  <label htmlFor="isActive" className="text-white/70 text-sm">Active</label>
                </div>
              </div>
            </div>

            {!editingImage && (
              <div>
                <label className="block text-white/70 text-sm mb-1">Image File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#D4AF37]/20 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/30"
                />
              </div>
            )}

            <div className="flex space-x-3">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : (editingImage ? 'Update' : 'Add')}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Images List */}
      <div className="space-y-4">
        {images.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/50">No images in gallery yet. Add your first image!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-12 bg-[#0F172A]/50">
                  {image.imageUrl ? (
                    <img
                      src={image.thumbnailUrl || image.imageUrl}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-[#0F172A]/50 flex items-center justify-center">
                      <span className="text-white/30">No image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="text-white font-medium mb-1">{image.title}</h4>
                  <p className="text-white/50 text-sm mb-2">{image.category}</p>
                  <p className="text-white/30 text-xs mb-3 line-clamp-2">{image.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-1 rounded ${image.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-white/30 text-xs">Order: {image.displayOrder}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(image)}
                      className="flex-1 px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded hover:bg-blue-500/30 transition-colors"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(image._id)}
                      className="flex-1 px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded hover:bg-red-500/30 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
