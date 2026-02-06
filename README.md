# MEEN Stack E-Commerce Platform

**MEEN E-Commerce: Full-featured online marketplace with JWT authentication, secure payments, and admin dashboard.**

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Security Features](#security-features)
- [Performance Optimizations](#performance-optimizations)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a full-stack e-commerce platform built using the MEEN (MongoDB, Express.js, React.js, Node.js) stack. The application features a modern React frontend with TailwindCSS styling, a robust Express.js backend with MongoDB database, and comprehensive e-commerce functionality including user authentication, product management, shopping cart, order processing, and admin controls.

## Features

### User Features
- **User Authentication**: Secure JWT-based authentication with registration and login
- **User Profiles**: Manage personal information and view order history
- **Product Browsing**: Browse, search, and filter products by category, price, and name
- **Shopping Cart**: Add, remove, and update items in the shopping cart
- **Checkout Process**: Secure checkout with multiple payment options
- **Order Management**: Track and view order history with status updates
- **Email Notifications**: Welcome emails and order confirmations

### Product Management
- **Product Catalog**: Display products with images, descriptions, prices, and ratings
- **Product Search**: Advanced search functionality with filters
- **Product Categories**: Organize products by category
- **Product Reviews**: User-generated reviews and ratings
- **Inventory Management**: Track stock levels

### Admin Features
- **Admin Dashboard**: Comprehensive analytics and statistics
- **User Management**: View, create, update, and delete users
- **Product Management**: Full CRUD operations for products
- **Order Management**: View, update, and manage orders
- **Real-time Analytics**: Sales statistics, revenue tracking, and user metrics
- **Recent Activity Tracking**: Monitor latest orders, users, and products

### Payment & Security
- **Secure Payments**: Integration with Stripe for payment processing
- **Image Upload**: Cloudinary integration for secure image hosting
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive validation and sanitization
- **XSS Protection**: Security middleware to prevent cross-site scripting
- **CORS Protection**: Configured for secure cross-origin requests

### Performance & Optimization
- **Caching**: Redis-based caching for improved performance
- **Database Indexing**: Optimized queries for fast data retrieval
- **Responsive Design**: Mobile-first responsive UI
- **Lazy Loading**: Optimized loading of components and images

## Tech Stack

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing
- **Stripe**: Payment processing
- **Cloudinary**: Image hosting and optimization
- **Nodemailer**: Email service

### Frontend Technologies
- **React 19**: Component-based UI library
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Security & Middleware
- **Helmet**: Security HTTP headers
- **CORS**: Cross-Origin Resource Sharing
- **Express Rate Limit**: Rate limiting middleware
- **CSRF Protection**: Cross-Site Request Forgery protection
- **Input Sanitization**: XSS prevention

### Development Tools
- **ESLint**: Code linting
- **Nodemon**: Automatic server restart during development
- **Dotenv**: Environment variable management

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Stripe account (for payment processing)
- Cloudinary account (for image hosting)

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd MEEN
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client  # if frontend is in separate directory
npm install
```

4. **Set up environment variables** (see Configuration section)

5. **Run the application**
```bash
# For development
npm run dev           # Frontend
npm run dev-server   # Backend

# For production
npm run build         # Build frontend
npm start             # Start production server
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Settings
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_very_long_secure_jwt_secret_key

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Production Settings
SESSION_SECRET=your_session_secret_key
CSRF_SECRET=your_csrf_secret_key
```

### Database Setup

1. Install MongoDB locally or create an account on MongoDB Atlas
2. Create a database and update the `MONGO_URI` in your environment variables
3. Seed the database with sample data (optional):
```bash
npm run seed
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate user and get token
- `GET /me` - Get authenticated user's profile
- `GET /health` - Check authentication service status

### Product Routes (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `GET /search` - Search and filter products
- `POST /` - Create new product (Admin only)
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Cart Routes (`/api/cart`)
- `GET /` - Get user's cart
- `POST /` - Add item to cart
- `DELETE /:productId` - Remove item from cart

### Order Routes (`/api/orders`)
- `POST /` - Create new order
- `GET /:id` - Get order by ID
- `GET /myorders` - Get logged-in user's orders
- `PUT /:id/pay` - Mark order as paid

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /products` - Get all products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `GET /stats` - Get dashboard statistics
- `GET /activity` - Get recent activity

### Payment Routes (`/api/payment`)
- `POST /create-payment-intent` - Create payment intent
- `POST /webhook` - Handle payment webhooks
- `GET /status/:orderId` - Get payment status

### Image Routes (`/api/images`)
- `POST /upload` - Upload single image
- `POST /upload-multiple` - Upload multiple images
- `DELETE /:public_id` - Delete image

## Frontend Structure

```
src/
├── Components/
│   ├── AUTH/
│   │   ├── LOGIN.jsx
│   │   ├── Profile.jsx
│   │   └── Signup.jsx
│   ├── About/
│   │   └── About.jsx
│   ├── Admin/
│   │   ├── Admin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── OrdersManagement.jsx
│   │   ├── ProductsManagement.jsx
│   │   ├── ProtectedAdminRoute.jsx
│   │   └── UsersManagement.jsx
│   ├── Cart/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderConfirmation.jsx
│   ├── Collections/
│   │   └── Collections.jsx
│   ├── Contact/
│   │   └── Contact.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── Header/
│   │   └── Header.jsx
│   ├── Home/
│   │   └── Home.jsx
│   ├── Loader/
│   │   └── Loader.jsx
│   ├── Product/
│   │   └── ProductDetail.jsx
│   ├── User/
│   │   └── User.jsx
│   ├── context/
│   │   ├── UserContext.js
│   │   └── UserContextProvider.jsx
│   ├── services/
│   │   └── apiService.js
│   └── index.js
├── AdminRoutes.jsx
├── App.jsx
├── Routes.jsx
├── index.css
└── main.jsx
```

### Key Frontend Components

- **User Context**: Manages authentication state across the application
- **API Service**: Centralized service for all API calls
- **Protected Routes**: Route guards for authenticated and admin access
- **Reusable Components**: Shared UI elements like header, footer, loader
- **Form Handling**: Proper validation and submission handling

## Backend Structure

```
server/
├── config/
│   ├── db.js
│   └── production.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── cartController.js
│   ├── imageController.js
│   ├── orderController.js
│   ├── paymentController.js
│   └── productController.js
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── securityMiddleware.js
│   └── validationMiddleware.js
├── models/
│   ├── Cart.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── cart.js
│   ├── image.js
│   ├── order.js
│   ├── payment.js
│   └── product.js
├── utils/
│   ├── cache.js
│   ├── emailService.js
│   ├── generateToken.js
│   └── logger.js
├── listProducts.js
├── listUsers.js
├── prod-server.js
├── seeder.js
├── server.js
└── updateUserToAdmin.js
```

### Key Backend Features

- **Modular Architecture**: Separated concerns with controllers, models, and routes
- **Security Middleware**: Comprehensive security implementation
- **Database Models**: Well-defined schemas with validation
- **Utility Functions**: Reusable helper functions
- **Error Handling**: Proper error handling and logging

## Development

### Available Scripts

In the project root directory:

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev-server` - Start backend with nodemon
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run seed` - Seed database with sample data
- `npm run seed:destroy` - Remove all seeded data
- `npm run prod-server` - Start production server

### Development Best Practices

1. **Code Style**: Follow ESLint configuration for consistent code style
2. **Component Organization**: Keep components small and focused
3. **State Management**: Use context API for global state
4. **API Calls**: Use the centralized apiService for all backend communications
5. **Security**: Always validate and sanitize user inputs
6. **Testing**: Write unit and integration tests for critical functionality

## Deployment

### Deploy to Heroku

1. Set up environment variables in Heroku dashboard
2. Connect your GitHub repository
3. Enable automatic deployment
4. Run buildpacks: `nodejs`

### Deploy to Vercel (Frontend)

1. Link your GitHub repository
2. Set build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Deploy to Render (Backend)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set environment variables
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`

### Docker Deployment

The project includes a Dockerfile and docker-compose.yml for containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run individually
docker build -t meen-app .
docker run -p 5000:5000 meen-app
```

## Security Features

### Authentication & Authorization
- JWT tokens with expiration
- Secure password hashing with bcrypt
- Role-based access control (user/admin)
- Protected routes and API endpoints

### Input Validation & Sanitization
- Express-validator for request validation
- XSS protection middleware
- SQL injection prevention through Mongoose

### Rate Limiting & DDoS Protection
- Express-rate-limit for API rate limiting
- Brute force attack prevention
- Concurrent request limits

### Security Headers
- Helmet.js for setting security headers
- CORS configuration for cross-origin requests
- Content Security Policy (CSP) headers

### Data Protection
- Environment variable management for secrets
- Encrypted communication (HTTPS in production)
- Secure session management

## Performance Optimizations

### Caching
- Redis-based caching for API responses
- Product catalog caching
- Dashboard statistics caching

### Database Optimization
- MongoDB indexing for faster queries
- Efficient data fetching with populate
- Aggregation pipelines for analytics

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization with Cloudinary
- Bundle size optimization with Tree Shaking

### Server Optimization
- Gzip compression
- Static asset optimization
- Connection pooling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 

Gmail: khadijaali5858@gmail.com

THANKS.
