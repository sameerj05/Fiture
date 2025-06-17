# Fiture - The Future of Fitness

A modern full-stack application that helps you track your workouts and get AI-powered fitness coaching.

## Features

- User authentication with secure JWT tokens
- Dynamic workout tracking with exercise history
- AI fitness coaching using Google's Gemini AI
- Modern and responsive UI using Chakra UI
- Real-time chat interface with AI coach
- Exercise tracking with sets, reps, and weights
- Workout history and progress tracking

## Project Structure

```
gym-ai/
├── frontend/          # React frontend application
└── backend/           # Node.js backend server
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key
- MongoDB (for backend data storage)

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Sign up for a new account or sign in with existing credentials
2. Navigate to the Dashboard to access different features
3. Use the Workout Tracker to log your exercises with sets, reps, and weights
4. Chat with the AI Coach for personalized fitness advice and workout recommendations
5. View your workout history and track your progress over time

## Technologies Used

### Frontend
- React
- Vite
- Chakra UI
- React Router
- Axios for API calls
- React Query for data fetching
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Google Gemini AI API
- bcrypt for password hashing

## Security Features

- Secure password hashing
- JWT-based authentication
- Protected API routes
- Environment variable configuration
- CORS protection
- Input validation and sanitization

## Development

The application is set up with a development environment that includes:
- Hot reloading for frontend development
- API proxy configuration
- Environment-specific configurations
- Error logging and debugging tools

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
