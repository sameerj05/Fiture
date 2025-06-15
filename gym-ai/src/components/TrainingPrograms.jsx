import { useState } from 'react';

function TrainingPrograms() {
  const [programs] = useState([
    {
      id: 1,
      title: 'Beginner Strength',
      level: 'Beginner',
      duration: '8 weeks',
      workouts: '3x per week',
      description: 'Perfect for those new to strength training. Build fundamental movement patterns and basic strength.',
      exercises: [
        { name: 'Squats', sets: 3, reps: '10-12' },
        { name: 'Push-ups', sets: 3, reps: '8-10' },
        { name: 'Dumbbell Rows', sets: 3, reps: '10-12' },
        { name: 'Plank', sets: 3, reps: '30 sec' }
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Advanced Hypertrophy',
      level: 'Advanced',
      duration: '12 weeks',
      workouts: '5x per week',
      description: 'Maximize muscle growth with this comprehensive hypertrophy program. Split training for optimal results.',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10' },
        { name: 'Deadlifts', sets: 4, reps: '6-8' },
        { name: 'Pull-ups', sets: 4, reps: '8-10' },
        { name: 'Overhead Press', sets: 4, reps: '8-10' }
      ],
      image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'HIIT Cardio',
      level: 'Intermediate',
      duration: '6 weeks',
      workouts: '4x per week',
      description: 'High-intensity interval training to boost cardiovascular fitness and burn calories efficiently.',
      exercises: [
        { name: 'Burpees', sets: 4, reps: '30 sec' },
        { name: 'Mountain Climbers', sets: 4, reps: '30 sec' },
        { name: 'Jump Rope', sets: 4, reps: '45 sec' },
        { name: 'High Knees', sets: 4, reps: '30 sec' }
      ],
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: 'Functional Fitness',
      level: 'All Levels',
      duration: '10 weeks',
      workouts: '3x per week',
      description: 'Improve overall fitness and daily movement patterns with this functional training program.',
      exercises: [
        { name: 'Kettlebell Swings', sets: 3, reps: '12-15' },
        { name: 'Box Jumps', sets: 3, reps: '8-10' },
        { name: 'Medicine Ball Slams', sets: 3, reps: '10-12' },
        { name: 'Battle Ropes', sets: 3, reps: '30 sec' }
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ]);

  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-100">Training Programs</h2>
            <p className="mt-1 text-gray-400">Choose a program that fits your goals</p>
          </div>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="card cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedProgram(program)}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-900 text-primary-200 rounded">
                      {program.level}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                      {program.duration}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                      {program.workouts}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400">{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Modal */}
        {selectedProgram && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-100">{selectedProgram.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 text-sm font-medium bg-primary-900 text-primary-200 rounded">
                    {selectedProgram.level}
                  </span>
                  <span className="px-2 py-1 text-sm font-medium bg-gray-700 text-gray-300 rounded">
                    {selectedProgram.duration}
                  </span>
                  <span className="px-2 py-1 text-sm font-medium bg-gray-700 text-gray-300 rounded">
                    {selectedProgram.workouts}
                  </span>
                </div>
                <p className="mt-4 text-gray-400">{selectedProgram.description}</p>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-100 mb-3">Workout Plan</h4>
                  <div className="space-y-3">
                    {selectedProgram.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-100">{exercise.name}</span>
                        <span className="text-gray-400">{exercise.sets} sets × {exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="btn-primary">
                    Start Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingPrograms; 