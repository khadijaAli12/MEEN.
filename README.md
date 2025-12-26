# MEEN Stack E-Commerce Application

A full-stack e-commerce application built with the MEEN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register, login, logout)
- Product browsing and searching
- Shopping cart functionality
- Order placement and management
- Responsive design with modern UI

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router v7

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
client/                  # React frontend
├── src/
│   ├── Components/      # React components
│   ├── context/         # React context for state management
│   └── services/        # API service functions
└── ...

server/                  # Node.js backend
├── controllers/         # Request handlers
├── models/              # Mongoose models
├── routes/              # API routes
├── middleware/          # Custom middleware
├── config/              # Configuration files
└── utils/               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd meen-app
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/meen_app
   JWT_SECRET=your_jwt_secret_key
   ```

   For MongoDB, you have two options:
   
   Option 1 - Local MongoDB:
   - Install MongoDB Community Server: https://docs.mongodb.com/manual/administration/install-community/
   - Start MongoDB service
   
   Option 2 - MongoDB Atlas (Cloud):
   - Create a free account at https://www.mongodb.com/cloud/atlas
   - Create a new cluster
   - Get your connection string and replace the MONGO_URI in .env
   - Update the connection string with your actual username, password, and cluster details

5. Start the development servers:

   Frontend:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

   Backend:
   ```bash
   npm run dev-server
   ```
   The backend API will be available at http://localhost:5000

   Note: The frontend automatically proxies API requests from `/api` to the backend.

### Seeding Data

To populate the database with sample data:

```bash
npm run data:import
```

To clear the database:

```bash
npm run data:destroy
```

## Graceful Degradation

This application is designed to work even when MongoDB is not available. When the database connection fails:

- The server continues to run
- API endpoints return a 503 Service Unavailable status
- The root endpoint (/) still works and shows the connection status

This makes it easier to develop and test the frontend without requiring a database.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get authenticated user details

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `GET /api/orders/myorders` - Get logged in user's orders

## Deployment

### Frontend
Build the React application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Backend
For production deployment, use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server/server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)