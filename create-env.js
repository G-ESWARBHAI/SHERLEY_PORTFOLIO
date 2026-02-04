import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/entrepreneur-portfolio
# For MongoDB Atlas (cloud), use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/entrepreneur-portfolio?retryWrites=true&w=majority

# Redis Configuration
# Option 1: Use Upstash Redis URL (recommended for production)
# UPSTASH_REDIS_URL=rediss://default:password@host:6379

# Option 2: Use individual Redis configuration
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

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional - for future email features)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail
EMAIL_FROM_NAME=Entrepreneur Portfolio
`;

const envPath = path.join(__dirname, '.env');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping creation.');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
  }
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
