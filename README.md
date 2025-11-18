# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- User authentication (register/login)
- Create, read, update, delete blog posts
- Categories for organizing posts
- Comments on posts
- Image uploads
- Responsive UI with React and Tailwind CSS
- RESTful API with validation

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v3, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Validation**: Express Validator

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-integration-christineomollo
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ..
   npm install
   ```
   > **Note**: This project uses Tailwind CSS v3 with shadcn/ui components.

4. **Environment Setup**

   Copy the example environment files:
   ```bash
   cp server/.env.example server/.env
   cp .env.example .env
   ```

   Update the `.env` files with your configuration:
   - `server/.env`: Set MongoDB URI, JWT secret, etc.
   - `.env`: Set API URL

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get all posts (with pagination, filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add comment to a post (authenticated)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category (authenticated)
- `PUT /api/categories/:id` - Update category (authenticated)
- `DELETE /api/categories/:id` - Delete category (authenticated)

## Project Structure

```
mern-stack-integration-christineomollo/
├── server/                 # Backend
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads
│   ├── server.js          # Main server file
│   └── package.json
├── src/                   # Frontend React app
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── ...
├── public/               # Static assets
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
