import mongoose from 'mongoose';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/entrepreneur-portfolio';
    
    await mongoose.connect(mongoURI, {
      // These options are recommended for Mongoose 6+
    });

    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
// Redis Connection
let redisClient = null;

export const connectRedis = () => {
  try {
    let redisConfig;

    // Check if Upstash Redis URL is provided
    if (process.env.UPSTASH_REDIS_URL) {
      // Use Upstash Redis URL directly (ioredis supports URL format)
      redisConfig = process.env.UPSTASH_REDIS_URL;
      console.log('🔗 Connecting to Upstash Redis...');
    } else {
      // Fall back to individual configuration
      redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      };
    }

    redisClient = new Redis(redisConfig);

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis connection error:', err.message);
    });

    redisClient.on('close', () => {
      console.log('⚠️ Redis connection closed');
    });

    redisClient.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });

    return redisClient;
  } catch (error) {
    console.error('❌ Redis connection failed:', error.message);
    return null;
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    redisClient = connectRedis();
  }
  return redisClient;
};

// Test Redis connection
export const testRedisConnection = async () => {
  try {
    const client = getRedisClient();
    if (client) {
      await client.ping();
      console.log('✅ Redis ping successful');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Redis ping failed:', error.message);
    return false;
  }
};

