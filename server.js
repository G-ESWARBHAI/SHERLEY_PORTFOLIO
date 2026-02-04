import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectMongoDB, connectRedis, testRedisConnection } from './config/database.js';
import { testCloudinaryConnection } from './config/cloudinary.js';
import galleryRoutes from './routes/galleryRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Database Connections
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    
    // Connect to Redis
    connectRedis();
    
    // Test Redis connection
    await testRedisConnection();
    
    // Test Cloudinary connection
    await testCloudinaryConnection();
  } catch (error) {
    console.error('Failed to initialize services:', error);
  }
};

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Entrepreneur Portfolio API is running!',
    status: 'success'
  });
});

app.get('/api/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    databases: {
      mongodb: 'connected',
      redis: 'connected',
      cloudinary: 'connected'
    }
  };

  // Check MongoDB connection
  try {
    if (mongoose.connection.readyState !== 1) {
      health.databases.mongodb = 'disconnected';
      health.status = 'degraded';
    }
  } catch (error) {
    health.databases.mongodb = 'error';
    health.status = 'degraded';
  }

  // Check Redis connection
  try {
    const redisConnected = await testRedisConnection();
    if (!redisConnected) {
      health.databases.redis = 'disconnected';
      health.status = 'degraded';
    }
  } catch (error) {
    health.databases.redis = 'error';
    health.status = 'degraded';
  }

  // Check Cloudinary connection
  try {
    const cloudinaryConnected = await testCloudinaryConnection();
    if (!cloudinaryConnected) {
      health.databases.cloudinary = 'disconnected';
      health.status = 'degraded';
    }
  } catch (error) {
    health.databases.cloudinary = 'error';
    health.status = 'degraded';
  }

  res.json(health);
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
  
  // Initialize database connections
  await startServer();
});
