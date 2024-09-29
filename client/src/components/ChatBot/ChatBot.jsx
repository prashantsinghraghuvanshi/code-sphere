import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputMessage,
    };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputMessage(''); // Clear the input field

    // Call the API
    setLoading(true);

    try {
      const response = await axios.post('https://your-chatbot-api.com/message', {
        message: inputMessage,
      });

      const botMessage = {
        sender: 'bot',
        text: response.data.reply, // Assuming the API response has a "reply" field
      };

      // Add bot's reply to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Oops! Something went wrong. Try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <div className="my-4 bg-white p-6 rounded-lg shadow-lg">
      {/* Chat Window */}
      <div className="overflow-y-auto border border-gray-300 p-4 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500">Ask your doubts...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input & Send Button */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
