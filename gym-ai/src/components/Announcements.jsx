function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "New Equipment Arrival",
      content: "We've just added new state-of-the-art cardio machines to our facility!",
      date: "2024-03-15",
      type: "Update"
    },
    {
      id: 2,
      title: "Summer Fitness Challenge",
      content: "Join our 8-week summer fitness challenge starting next month!",
      date: "2024-03-14",
      type: "Event"
    },
    {
      id: 3,
      title: "Holiday Hours",
      content: "The gym will have modified hours during the upcoming holiday weekend.",
      date: "2024-03-13",
      type: "Notice"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                announcement.type === 'Update' ? 'bg-blue-100 text-blue-800' :
                announcement.type === 'Event' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {announcement.type}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{announcement.content}</p>
            <p className="text-sm text-gray-500">{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcements; 