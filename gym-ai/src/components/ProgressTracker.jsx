import { useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressTracker({ workouts }) {
  // Calculate stats from workouts
  const stats = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return [
        { label: 'Total Workouts', value: '0', change: '0%', isPositive: true },
        { label: 'Average Duration', value: '0 min', change: '0 min', isPositive: true },
        { label: 'Calories Burned', value: '0', change: '0', isPositive: true },
        { label: 'Workout Streak', value: '0 days', change: '0 days', isPositive: true },
      ];
    }

    const totalWorkouts = workouts.length;
    const avgDuration = Math.round(
      workouts.reduce((sum, workout) => sum + parseInt(workout.duration || 0), 0) / totalWorkouts
    );
    
    // Calculate streak
    const sortedDates = workouts
      .map(w => new Date(w.date))
      .sort((a, b) => b - a);
    
    let streak = 1;
    let currentDate = new Date(sortedDates[0]);
    currentDate.setDate(currentDate.getDate() - 1);
    
    for (let i = 1; i < sortedDates.length; i++) {
      const workoutDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }

    // Calculate changes (comparing last 7 days with previous 7 days)
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentWorkouts = workouts.filter(w => new Date(w.date) >= lastWeek);
    const previousWorkouts = workouts.filter(w => 
      new Date(w.date) >= twoWeeksAgo && new Date(w.date) < lastWeek
    );

    const recentCount = recentWorkouts.length;
    const previousCount = previousWorkouts.length;
    const countChange = previousCount === 0 ? 100 : Math.round(((recentCount - previousCount) / previousCount) * 100);

    const recentAvgDuration = recentWorkouts.length > 0
      ? Math.round(recentWorkouts.reduce((sum, w) => sum + parseInt(w.duration || 0), 0) / recentWorkouts.length)
      : 0;
    const previousAvgDuration = previousWorkouts.length > 0
      ? Math.round(previousWorkouts.reduce((sum, w) => sum + parseInt(w.duration || 0), 0) / previousWorkouts.length)
      : 0;
    const durationChange = previousAvgDuration === 0 ? 0 : recentAvgDuration - previousAvgDuration;

    return [
      {
        label: 'Total Workouts',
        value: totalWorkouts.toString(),
        change: `${countChange >= 0 ? '+' : ''}${countChange}%`,
        isPositive: countChange >= 0,
      },
      {
        label: 'Average Duration',
        value: `${avgDuration} min`,
        change: `${durationChange >= 0 ? '+' : ''}${durationChange} min`,
        isPositive: durationChange >= 0,
      },
      {
        label: 'Workout Streak',
        value: `${streak} days`,
        change: streak > 1 ? `+${streak - 1} days` : '0 days',
        isPositive: true,
      },
    ];
  }, [workouts]);

  // Prepare data for the graph
  const graphData = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Workout Duration (minutes)',
            data: [],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
          },
        ],
      };
    }

    // Sort workouts by date
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get last 7 workouts or all if less than 7
    const recentWorkouts = sortedWorkouts.slice(-7);

    return {
      labels: recentWorkouts.map(w => new Date(w.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Workout Duration (minutes)',
          data: recentWorkouts.map(w => parseInt(w.duration || 0)),
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          tension: 0.4,
        },
      ],
    };
  }, [workouts]);

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-100">Progress Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-100">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Graph */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Progress Graph</h3>
          <div className="h-64">
            <Line data={graphData} options={graphOptions} />
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {stats[2].value !== '0 days' && (
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">{stats[2].value} Streak</p>
                  <p className="text-sm text-gray-400">Maintained workout consistency</p>
                </div>
              </div>
            )}
            {stats[0].value !== '0' && (
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Total Workouts</p>
                  <p className="text-sm text-gray-400">Completed {stats[0].value} workouts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker; 