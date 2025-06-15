import { useState } from 'react';

function ClassScheduler() {
  const [classes] = useState([
    {
      id: 1,
      name: 'Yoga Flow',
      instructor: 'Sarah Johnson',
      time: '10:00 AM',
      duration: '60 min',
      level: 'All Levels',
      spots: 12,
      booked: 8,
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'HIIT Training',
      instructor: 'Mike Thompson',
      time: '12:00 PM',
      duration: '45 min',
      level: 'Intermediate',
      spots: 15,
      booked: 12,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Strength & Conditioning',
      instructor: 'David Chen',
      time: '2:00 PM',
      duration: '60 min',
      level: 'Advanced',
      spots: 10,
      booked: 6,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      name: 'Pilates',
      instructor: 'Emma Wilson',
      time: '4:00 PM',
      duration: '45 min',
      level: 'All Levels',
      spots: 8,
      booked: 5,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-100">Class Schedule</h2>
            <p className="mt-1 text-gray-400">Book your favorite fitness classes</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="card">
          <div className="grid grid-cols-7 gap-2">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`p-4 rounded-lg text-center ${
                  date.toDateString() === selectedDate.toDateString()
                    ? 'bg-primary-900 text-primary-200'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <div className="text-sm font-medium">{weekDays[date.getDay()]}</div>
                <div className="text-lg font-bold mt-1">{date.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="card cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedClass(classItem)}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{classItem.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-900 text-primary-200 rounded">
                      {classItem.level}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                      {classItem.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">{classItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-300">{classItem.instructor}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Available Spots</span>
                    <span className="text-gray-300">{classItem.spots - classItem.booked} / {classItem.spots}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(classItem.booked / classItem.spots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Class Details Modal */}
        {selectedClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full">
              <div className="relative h-64">
                <img
                  src={selectedClass.image}
                  alt={selectedClass.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedClass(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-100">{selectedClass.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 text-sm font-medium bg-primary-900 text-primary-200 rounded">
                    {selectedClass.level}
                  </span>
                  <span className="px-2 py-1 text-sm font-medium bg-gray-700 text-gray-300 rounded">
                    {selectedClass.duration}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">{selectedClass.time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-300">Instructor: {selectedClass.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-300">
                      {selectedClass.spots - selectedClass.booked} spots remaining
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-100 mb-3">Class Description</h4>
                  <p className="text-gray-400">
                    Join this {selectedClass.name} class for an energizing workout session. 
                    Perfect for {selectedClass.level.toLowerCase()} fitness enthusiasts looking to 
                    improve their strength, flexibility, and overall fitness.
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="btn-primary">
                    Book Class
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

export default ClassScheduler; 