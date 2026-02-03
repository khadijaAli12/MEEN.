# Production Deployment Guide

This document outlines the steps to deploy the MEEN e-commerce application to production.

## Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://localhost:27017/meen-prod

# JWT Configuration
JWT_SECRET=your_super_long_and_secure_jwt_secret_key_here

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://yourdomain.com

# Session Configuration
SESSION_SECRET=your_session_secret_key
CSRF_SECRET=your_csrf_secret_key
```

## Deployment Options

### 1. Manual Deployment

1. Clone the repository:
```bash
git clone <repository-url>
cd MEEN
```

2. Install dependencies:
```bash
npm install --only=production
```

3. Set up environment variables (see above)

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the server:
```bash
npm run prod-server
```

### 2. Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

### 3. PM2 Process Manager

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Start the application with PM2:
```bash
pm2 start server/prod-server.js --name "meen-app"
```

3. Save the PM2 configuration:
```bash
pm2 save
pm2 startup
```

## Security Best Practices

- Use strong, unique passwords for all accounts
- Regularly update dependencies
- Monitor logs for suspicious activity
- Use HTTPS in production
- Implement rate limiting
- Sanitize all user inputs
- Use environment variables for secrets

## Monitoring

The application includes health check endpoints:
- `/api/health` - Basic health check
- `/api/health/comprehensive` - Detailed health check

## Backup Strategy

Regularly backup your MongoDB database:
```bash
mongodump --db meen-prod --out /backup/location
```

## Scaling Recommendations

- Use a CDN for static assets
- Implement Redis for session storage and caching
- Use a load balancer for multiple instances
- Monitor performance metrics
- Implement database read replicas