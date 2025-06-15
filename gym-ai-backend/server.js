import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load .env.local first, then fall back to .env
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Verify API key is set
if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY is not set in .env.local or .env file');
  process.exit(1);
}

console.log('API Key length:', process.env.GEMINI_API_KEY.length);
console.log('API Key first 10 chars:', process.env.GEMINI_API_KEY.substring(0, 10));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY.length);
console.log('API Key first 10 chars:', process.env.GEMINI_API_KEY.substring(0, 10));

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    apiKeyConfigured: !!process.env.GEMINI_API_KEY,
    apiKeyLength: process.env.GEMINI_API_KEY?.length,
    envFile: process.env.NODE_ENV === 'production' ? 'production' : 'development'
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);

    // Get the generative model - using the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a chat context with a more focused system prompt
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are Flexi: AI Coach, a helpful fitness coach. Provide clear, concise, and practical advice about workouts, nutrition, and general fitness. Keep responses focused and actionable. Introduce yourself as Flexi: AI Coach when appropriate.",
        },
        {
          role: "model",
          parts: "I understand. I\'m Flexi: AI Coach, and I\'ll act as your fitness coach. I will provide clear, practical advice about workouts, nutrition, and fitness, keeping my responses focused and actionable.",
        },
      ],
    });

    try {
      // Generate response
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      console.log('Generated response:', text);
      res.json({ response: text });
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Check for specific error messages
      if (error.message.includes('not found') || error.message.includes('not supported')) {
        return res.status(400).json({ 
          error: 'API configuration error. Please ensure:',
          details: [
            '1. The Gemini API is enabled in your Google Cloud Console',
            '2. Your API key has access to the Gemini API',
            '3. You are using the correct model name',
            'Original error: ' + error.message
          ]
        });
      }
      
      if (error.message.includes('disabled')) {
        return res.status(403).json({ 
          error: 'API access is disabled. Please check your API key permissions.',
          details: error.message
        });
      }
      
      // Re-throw other errors for the general error handler
      throw error;
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message,
    stack: err.stack
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/api/health`);
}); 