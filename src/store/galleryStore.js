import { create } from 'zustand';
import api from '../utils/api';

const useGalleryStore = create((set, get) => ({
  // State
  images: [],
  categories: [],
  selectedImage: null,
  filter: 'All',
  isLoading: false,
  error: null,
  fromCache: false,

  // Actions
  setFilter: (filter) => set({ filter }),

  setSelectedImage: (image) => set({ selectedImage: image }),

  // Fetch all images
  fetchImages: async (options = {}) => {
    const state = get();
    // Prevent multiple simultaneous calls
    if (state.isLoading) {
      return { success: false, error: 'Request already in progress' };
    }
    
    set({ isLoading: true, error: null });
    try {
      const { category, active } = options;
      const params = {};
      if (category) params.category = category;
      if (active !== undefined) params.active = active;

      const response = await api.get('/gallery', { params });
      
      set({
        images: response.data.data || [],
        fromCache: response.data.fromCache || false,
        isLoading: false,
        error: null,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch images';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch single image by ID
  fetchImageById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/gallery/${id}`);
      
      set({
        selectedImage: response.data.data,
        isLoading: false,
        error: null,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch image';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/gallery/categories');
      
      set({
        categories: response.data.data || [],
        isLoading: false,
        error: null,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch categories';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Add image (admin only)
  addImage: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh images after adding
      await get().fetchImages();

      set({ isLoading: false, error: null });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add image';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Update image (admin only)
  updateImage: async (id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/gallery/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh images after updating
      await get().fetchImages();

      set({ isLoading: false, error: null });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update image';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Delete image (admin only)
  deleteImage: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.delete(`/gallery/${id}`);

      // Refresh images after deleting
      await get().fetchImages();

      set({ isLoading: false, error: null });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete image';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Get filtered images based on current filter
  getFilteredImages: () => {
    const { images, filter } = get();
    if (filter === 'All') {
      return images;
    }
    return images.filter((img) => img.category === filter);
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useGalleryStore;
