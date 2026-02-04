# Entrepreneur Portfolio Backend

Backend API server for the Entrepreneur Portfolio application with MongoDB, Redis, and Cloudinary support.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the Backend directory with the following content:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/entrepreneur-portfolio
# For MongoDB Atlas (cloud), use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/entrepreneur-portfolio?retryWrites=true&w=majority

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
# For Redis Cloud, use:
# REDIS_HOST=your-redis-host.redislabs.com
# REDIS_PORT=12345
# REDIS_PASSWORD=your-redis-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
# Get these credentials from: https://cloudinary.com/console
```

3. Set up Cloudinary account:
   - Sign up at [https://cloudinary.com](https://cloudinary.com)
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Add them to your `.env` file

4. Make sure MongoDB and Redis are running:
   - **MongoDB**: Install MongoDB locally or use MongoDB Atlas
   - **Redis**: Install Redis locally or use Redis Cloud
   - For local setup:
     - MongoDB: `mongod` (or start MongoDB service)
     - Redis: `redis-server` (or start Redis service)

5. Run the development server with nodemon:
```bash
npm run dev
```

6. Run the production server:
```bash
npm start
```

## Database Setup

### MongoDB
- Default connection: `mongodb://localhost:27017/entrepreneur-portfolio`
- The connection is automatically established when the server starts
- Connection status is logged to the console

### Redis
- Default connection: `localhost:6379`
- The connection is automatically established when the server starts
- Connection status is logged to the console
- Redis client is available through `getRedisClient()` function

### Cloudinary
- Cloud-based image and video management service
- Configuration is loaded from environment variables
- Connection is tested on server startup
- Available functions:
  - `uploadImage()` - Upload image from file path
  - `uploadImageFromBuffer()` - Upload image from buffer
  - `deleteImage()` - Delete image by public_id
  - `getTransformedImageUrl()` - Get transformed image URL
  - `getCloudinary()` - Get Cloudinary instance

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint (includes database and Cloudinary connection status)

## Development

The server runs on `http://localhost:5000` by default.

Nodemon will automatically restart the server when you make changes to the code.

## Configuration Files

- `config/database.js` - Contains MongoDB and Redis connection logic
  - `connectMongoDB()` - Establishes MongoDB connection
  - `connectRedis()` - Establishes Redis connection
  - `getRedisClient()` - Returns Redis client instance
  - `testRedisConnection()` - Tests Redis connection

- `config/cloudinary.js` - Contains Cloudinary configuration and utility functions
  - `testCloudinaryConnection()` - Tests Cloudinary connection
  - `uploadImage()` - Upload image from file path
  - `uploadImageFromBuffer()` - Upload image from buffer
  - `deleteImage()` - Delete image by public_id
  - `getTransformedImageUrl()` - Get transformed image URL
  - `getCloudinary()` - Get Cloudinary instance
