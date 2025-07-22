// ChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';

const recommendations = {
  en: ['What is your purpose?', 'How can I stay safe?', 'Tell me about cyber safety.', 'What to do in case of emergency?'],
  hi: ['आपका उद्देश्य क्या है?', 'मैं सुरक्षित कैसे रहूं?', 'साइबर सुरक्षा क्या है?', 'आपातकाल की स्थिति में क्या करें?']
};

const responses = {
  en: {
    'What is your purpose?': "I'm here to assist you with safety-related queries 🌟",
    'How can I stay safe?': 'Always stay alert, avoid unsafe areas, and keep emergency contacts handy 📱',
    'Tell me about cyber safety.': 'Use strong passwords, avoid suspicious links, and enable two-factor authentication 🔐',
    'What to do in case of emergency?': 'Call emergency services, stay calm, and find a safe place 🚨'
  },
  hi: {
    'आपका उद्देश्य क्या है?': 'मैं आपकी सुरक्षा से संबंधित प्रश्नों में सहायता के लिए यहां हूं 🌟',
    'मैं सुरक्षित कैसे रहूं?': 'हमेशा सतर्क रहें, असुरक्षित क्षेत्रों से बचें, और आपातकालीन संपर्क तैयार रखें 📱',
    'साइबर सुरक्षा क्या है?': 'मजबूत पासवर्ड का उपयोग करें, संदिग्ध लिंक से बचें, और दो-स्तरीय प्रमाणीकरण सक्षम करें 🔐',
    'आपातकाल की स्थिति में क्या करें?': 'आपातकालीन सेवाओं को कॉल करें, शांत रहें, और सुरक्षित स्थान खोजें 🚨'
  }
};

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'sakhi', text: 'Hi there! 🌼 I’m Sakhi, your safety buddy. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    const voices = synth.getVoices();
    utter.voice = voices.find((v) =>
      language === 'hi' ? v.lang.includes('hi-IN') : v.lang.includes('en-US')
    ) || voices[0];
    synth.speak(utter);
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text = null) => {
    const userInput = text || input.trim();
    if (userInput === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    let reply = responses[language][userInput] || 'Thanks for your query! Let me look into it. 🔍';

    setTimeout(() => {
      setMessages([...newMessages, { sender: 'sakhi', text: reply }]);
      speak(reply);
      setIsTyping(false);
    }, 800);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleLanguageChange = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-xl w-[360px] h-[550px] flex flex-col z-50 border-2 border-orange-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-green-300 text-white p-3 rounded-t-xl flex justify-between items-center">
        <h2 className="font-semibold">🤖 Chat with Sakhi</h2>
        <div className="flex items-center gap-3">
          <button onClick={handleLanguageChange} className="text-sm bg-white text-black px-2 py-1 rounded-md">
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button onClick={onClose} className="hover:text-red-200">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar bg-orange-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'sakhi' ? 'items-start' : 'justify-end'}`}>
            <div
              className={`text-sm px-3 py-2 rounded-2xl shadow max-w-[80%] transition-all duration-300 ${
                msg.sender === 'sakhi'
                  ? 'bg-emerald-100 text-left text-gray-800'
                  : 'bg-orange-200 self-end text-right text-gray-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-gray-500 italic pl-2 animate-pulse">Sakhi is typing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Recommendations */}
      <div className="px-3 pb-2 pt-1 bg-white flex flex-wrap gap-2">
        {recommendations[language].map((question, index) => (
          <button
            key={index}
            onClick={() => handleSend(question)}
            className="text-xs bg-orange-100 hover:bg-orange-200 text-gray-800 px-3 py-1 rounded-full transition"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-3 border-t bg-white flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'en' ? 'Type your message...' : 'अपना संदेश लिखें...'}
        />
        <button onClick={() => handleSend()} className="text-emerald-600 hover:text-emerald-800 text-lg">
          <FaPaperPlane />
        </button>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          className={`text-orange-500 hover:text-orange-700 text-lg transition ${
            listening ? 'animate-ping-slow text-red-500' : ''
          }`}
        >
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
