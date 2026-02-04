import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const requiredEnvVars = {
  // Server
  PORT: 'Server port number',
  NODE_ENV: 'Environment (development/production)',
  FRONTEND_URL: 'Frontend URL for CORS',
  
  // MongoDB
  MONGODB_URI: 'MongoDB connection string',
  
  // JWT
  JWT_SECRET: 'JWT secret key for token signing',
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: 'Cloudinary cloud name',
  CLOUDINARY_API_KEY: 'Cloudinary API key',
  CLOUDINARY_API_SECRET: 'Cloudinary API secret',
};

const optionalEnvVars = {
  // Redis (Upstash URL or individual config)
  UPSTASH_REDIS_URL: 'Upstash Redis URL (rediss://...)',
  REDIS_HOST: 'Redis host (default: localhost, if UPSTASH_REDIS_URL not set)',
  REDIS_PORT: 'Redis port (default: 6379, if UPSTASH_REDIS_URL not set)',
  REDIS_PASSWORD: 'Redis password (optional, if UPSTASH_REDIS_URL not set)',
  
  // JWT
  JWT_EXPIRE: 'JWT token expiration (default: 7d)',
  JWT_EXPIRES_IN: 'JWT token expiration (alternative to JWT_EXPIRE)',
  JWT_COOKIE_EXPIRE: 'JWT cookie expiration (default: 7d)',
  
  // Email
  EMAIL_USER: 'Email address for sending emails (optional)',
  EMAIL_PASSWORD: 'Email app password (optional)',
  EMAIL_SERVICE: 'Email service provider (default: gmail)',
  EMAIL_FROM_NAME: 'Email sender name (optional)',
};

console.log('🔍 Verifying Environment Variables...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Variables:');
for (const [key, description] of Object.entries(requiredEnvVars)) {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    console.log(`  ❌ ${key}: MISSING - ${description}`);
    hasErrors = true;
  } else {
    // Mask sensitive values
    const displayValue = key.includes('SECRET') || key.includes('PASSWORD') || key.includes('KEY')
      ? '***' + value.slice(-4)
      : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  }
}

console.log('\n📋 Optional Variables:');
for (const [key, description] of Object.entries(optionalEnvVars)) {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    console.log(`  ⚠️  ${key}: Not set - ${description}`);
    hasWarnings = true;
  } else {
    const displayValue = key.includes('SECRET') || key.includes('PASSWORD') || key.includes('KEY')
      ? '***' + value.slice(-4)
      : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  }
}

// Check for common issues
console.log('\n🔧 Validation Checks:');

// Check JWT_SECRET strength
if (process.env.JWT_SECRET) {
  if (process.env.JWT_SECRET.length < 32) {
    console.log('  ⚠️  JWT_SECRET is too short (recommended: at least 32 characters)');
    hasWarnings = true;
  }
  if (process.env.JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
    console.log('  ❌ JWT_SECRET is still using the default value. Please change it!');
    hasErrors = true;
  }
}

// Check MongoDB URI format
if (process.env.MONGODB_URI) {
  if (!process.env.MONGODB_URI.startsWith('mongodb://') && !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
    console.log('  ⚠️  MONGODB_URI format might be incorrect');
    hasWarnings = true;
  }
}

// Check Cloudinary credentials
if (process.env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name' || 
    process.env.CLOUDINARY_API_KEY === 'your-api-key' ||
    process.env.CLOUDINARY_API_SECRET === 'your-api-secret') {
  console.log('  ⚠️  Cloudinary credentials appear to be placeholder values');
  hasWarnings = true;
}

// Check email configuration
if (process.env.EMAIL_USER && !process.env.EMAIL_PASSWORD) {
  console.log('  ⚠️  EMAIL_USER is set but EMAIL_PASSWORD is missing');
  hasWarnings = true;
}

if (!process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  console.log('  ⚠️  EMAIL_PASSWORD is set but EMAIL_USER is missing');
  hasWarnings = true;
}

// Check Redis configuration (optional but recommended)
if (!process.env.UPSTASH_REDIS_URL && (!process.env.REDIS_HOST || !process.env.REDIS_PORT)) {
  console.log('  ℹ️  Redis not configured - will use defaults (localhost:6379)');
  console.log('     Caching features will work but may fail if Redis is not running locally');
  console.log('     Consider setting UPSTASH_REDIS_URL for cloud Redis');
} else if (process.env.UPSTASH_REDIS_URL) {
  console.log('  ✅ Upstash Redis URL configured');
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Verification FAILED: Some required variables are missing!');
  console.log('Please update your .env file with the missing variables.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Verification completed with warnings.');
  console.log('Some optional variables are not set, but the server should still work.');
  process.exit(0);
} else {
  console.log('✅ All environment variables are properly configured!');
  process.exit(0);
}
