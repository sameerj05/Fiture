# GymAI - Your Personal Fitness Companion

A modern React application that helps you track your workouts and get AI-powered fitness coaching.

## Features

- User authentication
- Dynamic workout tracking
- AI fitness coaching using Google's Gemini AI
- Modern and responsive UI using Chakra UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Sign in to the application (currently using mock authentication)
2. Navigate to the Dashboard to access different features
3. Use the Workout Tracker to log your exercises
4. Chat with the AI Coach for personalized fitness advice

## Technologies Used

- React
- Vite
- Chakra UI
- Google Gemini AI
- React Router
- Local Storage for data persistence

## Note

This is a frontend-only application with mock authentication. In a production environment, you would want to:
- Implement proper backend authentication
- Add a database for storing workout data
- Add proper error handling and loading states
- Implement proper security measures
