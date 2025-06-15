import { useState } from 'react';

function WorkoutManager({ workouts, setWorkouts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: '',
    duration: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddWorkout = () => {
    setWorkouts((prev) => [...prev, { ...newWorkout, id: Date.now() }]);
    setNewWorkout({
      name: '',
      type: '',
      duration: '',
      date: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-100">Workout Manager</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Workout
          </button>
        </div>

        {/* Workout List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Workout Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {workouts.map((workout) => (
                  <tr key={workout.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {workout.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {workout.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {workout.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {workout.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Workout Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="card max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-100 mb-4">Add New Workout</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Workout Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newWorkout.name}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Type</label>
                  <select
                    name="type"
                    value={newWorkout.type}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                  >
                    <option value="">Select type</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="HIIT">HIIT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={newWorkout.duration}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newWorkout.date}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddWorkout}
                    className="btn-primary"
                  >
                    Add Workout
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

export default WorkoutManager; 