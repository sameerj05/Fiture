import { useState, useRef, useEffect } from 'react';
import AIAvatar from '../assets/ai-avatar.png';

function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m Flexi: AI Coach, your fitness coach. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Reset error state
    setError(null);

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-100">Flexi: AI Coach</h2>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-md mb-4 animate-fade-in">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Chat Container */}
        <div className="card h-[600px] flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <img
                    src={AIAvatar}
                    alt="AI Avatar"
                    className="w-16 h-16 rounded-full mr-4 border-2 border-primary-500 flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[70%] rounded-xl p-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${
                    message.role === 'user'
                      ? 'bg-primary-700 text-white rounded-br-none ml-auto'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none mr-auto'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center">
                <img src={AIAvatar} alt="AI Avatar" className="w-16 h-16 rounded-full mr-4 border-2 border-primary-500 flex-shrink-0 animate-pulse" />
                <div className="bg-gray-700 text-gray-100 rounded-xl p-4 shadow-md rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-lg">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Flexi AI anything about fitness..."
                className="input-field flex-1 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AICoach; 