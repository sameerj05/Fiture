import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ workouts }) {
  // Calculate stats dynamically from workouts
  const quickStats = useMemo(() => {
    const totalWorkouts = workouts.length;

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekWorkouts = workouts.filter(w => new Date(w.date) >= oneWeekAgo);
    const thisWeekCount = thisWeekWorkouts.length;

    let streak = 0;
    if (workouts.length > 0) {
      const sortedDates = [...new Set(workouts.map(w => new Date(w.date).toDateString()))]
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => b.getTime() - a.getTime()); // Sort descending

      if (sortedDates.length > 0) {
        let currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedDates.length; i++) {
          const workoutDay = new Date(sortedDates[i]);
          workoutDay.setHours(0, 0, 0, 0);

          const diff = Math.round((currentDay.getTime() - workoutDay.getTime()) / (1000 * 60 * 60 * 24));

          if (diff === i) {
            streak++;
          } else if (diff > i) {
            // If there's a gap greater than 1 day, streak is broken
            break;
          }
          // If diff < i, it means multiple workouts on the same day, which is fine, continue.
        }
      }
    }


    const totalDuration = workouts.reduce((sum, workout) => sum + parseInt(workout.duration || 0), 0);
    const activeMinutes = totalDuration;

    // Placeholder for calories burned (needs actual calorie calculation logic)
    const caloriesBurned = totalDuration * 5; // Example: 5 calories per minute

    // Placeholder for weight progress
    const weightProgress = -2.5; // Example hardcoded value for now

    return {
      totalWorkouts: totalWorkouts,
      thisWeek: thisWeekCount,
      streak: streak,
      nextClass: 'Yoga Flow - Tomorrow 10:00 AM', // Keep hardcoded for now, as no class booking is implemented
      caloriesBurned: caloriesBurned,
      activeMinutes: activeMinutes,
      weightProgress: weightProgress,
      waterIntake: 2.5
    };
  }, [workouts]);

  // Generate recent activity dynamically
  const recentActivity = useMemo(() => {
    const activities = workouts.slice(-3).reverse().map(workout => ({
      type: 'workout',
      title: workout.name,
      time: new Date(workout.date).toLocaleDateString(), // Or format more precisely
      duration: `${workout.duration} min`,
      calories: `${parseInt(workout.duration || 0) * 5} cal`,
    }));

    // Add some example non-workout activities to flesh out, if needed
    // Example: activities.push({ type: 'achievement', title: 'New Personal Best!', time: '1 day ago', icon: '⭐' });

    return activities;
  }, [workouts]);

  // Generate weekly progress dynamically
  const weeklyProgress = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyWorkouts = {};
    const dailyCalories = {};
    const dailyActiveMinutes = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i);
      const dateString = date.toLocaleDateString();
      dailyWorkouts[dateString] = 0;
      dailyCalories[dateString] = 0;
      dailyActiveMinutes[dateString] = 0;
    }

    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      const dateString = workoutDate.toLocaleDateString();

      if (dailyWorkouts.hasOwnProperty(dateString)) {
        dailyWorkouts[dateString]++;
        dailyCalories[dateString] += parseInt(workout.duration || 0) * 5;
        dailyActiveMinutes[dateString] += parseInt(workout.duration || 0);
      }
    });

    return {
      workouts: Object.values(dailyWorkouts),
      calories: Object.values(dailyCalories),
      activeMinutes: Object.values(dailyActiveMinutes),
    };
  }, [workouts]);

  const [upcomingClasses] = useState([
    {
      name: 'Yoga Flow',
      time: 'Tomorrow 10:00 AM',
      instructor: 'Sarah Johnson',
      spots: 8
    },
    {
      name: 'HIIT Training',
      time: 'Wednesday 6:00 PM',
      instructor: 'Mike Thompson',
      spots: 5
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Welcome Section with Gradient Background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900 via-secondary-900 to-accent-900 p-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] opacity-20 mix-blend-overlay" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white">Welcome back!</h2>
            <p className="mt-2 text-lg text-gray-200">Track your progress and stay motivated</p>
            <div className="mt-6 flex space-x-4">
              <Link to="/workout" className="btn-primary">
                Start Workout
              </Link>
              <Link to="/progress" className="btn-secondary">
                View Progress
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-br from-primary-900 to-primary-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-200">Total Workouts</p>
                <p className="text-2xl font-bold text-white mt-1">{quickStats.totalWorkouts}</p>
                <p className="text-xs text-primary-200 mt-1">+2 this week</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary-900 to-secondary-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-200">Calories Burned</p>
                <p className="text-2xl font-bold text-white mt-1">{quickStats.caloriesBurned}</p>
                <p className="text-xs text-secondary-200 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent-900 to-accent-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent-200">Active Minutes</p>
                <p className="text-2xl font-bold text-white mt-1">{quickStats.activeMinutes}</p>
                <p className="text-xs text-accent-200 mt-1">This week</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Weight Progress</p>
                <p className="text-2xl font-bold text-white mt-1">{quickStats.weightProgress} kg</p>
                <p className="text-xs text-gray-400 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-100 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'workout' ? 'bg-primary-900' :
                      activity.type === 'class' ? 'bg-secondary-900' :
                      activity.type === 'nutrition' ? 'bg-accent-900' :
                      'bg-gray-700'
                    }`}>
                      {activity.type === 'achievement' ? (
                        <span className="text-xl">{activity.icon}</span>
                      ) : (
                        <svg className={`w-5 h-5 ${
                          activity.type === 'workout' ? 'text-primary-400' :
                          activity.type === 'class' ? 'text-secondary-400' :
                          'text-accent-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-100">{activity.title}</h4>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      {activity.duration && (
                        <p className="text-sm text-gray-300">{activity.duration}</p>
                      )}
                      {activity.calories && (
                        <p className="text-sm text-gray-300">{activity.calories} cal</p>
                      )}
                      {activity.instructor && (
                        <p className="text-sm text-gray-300">{activity.instructor}</p>
                      )}
                      {activity.macros && (
                        <p className="text-sm text-gray-300">{activity.macros}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Upcoming Classes</h3>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-100">{classItem.name}</h4>
                      <p className="text-sm text-gray-400">{classItem.time}</p>
                      <p className="text-sm text-gray-400">{classItem.instructor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">{classItem.spots} spots left</p>
                      <button className="mt-2 text-xs text-primary-400 hover:text-primary-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Weekly Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Workouts</h4>
              <div className="h-32 flex items-end space-x-2">
                {weeklyProgress.workouts.map((value, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className="bg-primary-600 rounded-t"
                      style={{ height: `${(value / (Math.max(...weeklyProgress.workouts) || 1)) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Calories</h4>
              <div className="h-32 flex items-end space-x-2">
                {weeklyProgress.calories.map((value, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className="bg-secondary-600 rounded-t"
                      style={{ height: `${(value / (Math.max(...weeklyProgress.calories) || 1)) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Active Minutes</h4>
              <div className="h-32 flex items-end space-x-2">
                {weeklyProgress.activeMinutes.map((value, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className="bg-accent-600 rounded-t"
                      style={{ height: `${(value / (Math.max(...weeklyProgress.activeMinutes) || 1)) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/programs" className="card hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">Training Programs</h3>
                <p className="text-sm text-gray-400">Explore structured workout plans</p>
              </div>
            </div>
          </Link>

          <Link to="/classes" className="card hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">Group Classes</h3>
                <p className="text-sm text-gray-400">Join live fitness sessions</p>
              </div>
            </div>
          </Link>

          <Link to="/progress" className="card hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-accent-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">Progress Tracking</h3>
                <p className="text-sm text-gray-400">View your fitness journey</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 