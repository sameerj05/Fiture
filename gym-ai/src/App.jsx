import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WorkoutManager from './components/WorkoutManager';
import TrainingPrograms from './components/TrainingPrograms';
import ProgressTracker from './components/ProgressTracker';
import ClassScheduler from './components/ClassScheduler';
import Announcements from './components/Announcements';
import AICoach from './components/AICoach';
import Dashboard from './components/Dashboard';
import FitureLogo from './assets/fiture-logo.png'; // Assuming logo is in src/assets

// Simple SignIn component
function SignIn({ onSignIn }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="card max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Welcome to Fiture
          </h1>
          <p className="text-gray-300">Your personal fitness companion</p>
          <button
            onClick={onSignIn}
            className="btn-primary w-full"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

// Navigation component
function Navigation({ onSignOut }) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={FitureLogo} alt="Fiture Logo" className="h-16 mr-4" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Fiture
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/workouts" className="nav-link">Workouts</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/progress" className="nav-link">Progress</Link>
            <Link to="/classes" className="nav-link">Classes</Link>
            <Link to="/ai-coach" className="nav-link">AI Coach</Link>
            <button
              onClick={onSignOut}
              className="btn-secondary"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navigation onSignOut={handleSignOut} />
        <main className="py-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard workouts={workouts} />} />
            <Route path="/workouts" element={<WorkoutManager workouts={workouts} setWorkouts={setWorkouts} />} />
            <Route path="/programs" element={<TrainingPrograms />} />
            <Route path="/progress" element={<ProgressTracker workouts={workouts} />} />
            <Route path="/classes" element={<ClassScheduler />} />
            <Route path="/ai-coach" element={<AICoach />} />
            <Route path="/" element={<Dashboard workouts={workouts} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
