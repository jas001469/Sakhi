import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingShape from '../components/FloatingShape';
import { useAuthStore } from '../store/authStore';
import FancyHeading from '../components/FancyHeading';
import Robot from './Robot';
import ChatBot from '../components/ChatBot';
import ChatButton from '../components/Chatbutton';
import {
  FaQrcode, FaCommentDots, FaPhoneAlt, FaLink,
  FaShieldAlt, FaWallet, FaUserCircle, FaSun,
  FaMoon, FaSignOutAlt, FaLanguage
} from 'react-icons/fa';

const actionsLeft = [
  { icon: <FaQrcode size={24} />, title: 'QR Scan', tip: 'Scan payment QR codes securely' },
  { icon: <FaCommentDots size={24} />, title: 'Messages', tip: 'Detect scam SMS/WhatsApp messages' },
  { icon: <FaPhoneAlt size={24} />, title: 'Phone Number', tip: 'Verify spam callers' },
];

const actionsRight = [
  { icon: <FaLink size={24} />, title: 'URL Check', tip: 'Check website safety before clicking' },
  { icon: <FaShieldAlt size={24} />, title: 'UPI ID', tip: 'Validate UPI for authenticity' },
  { icon: <FaWallet size={24} />, title: 'Crypto Wallet', tip: 'Prevent wallet phishing attempts' },
];

const WelcomeBanner = ({ userName }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-4xl mx-auto mt-6 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 text-center text-white border border-white/20 shadow-lg"
  >
    <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
      👋 Welcome Back, {userName}!
    </h1>
    <p className="mt-2 text-emerald-200 text-sm">
      Explore secure verification with QR, Phone, UPI, Crypto and more
    </p>

    <div className="mt-4 mb-2 relative text-center">
      <FancyHeading
        text="I'm Sakhi, how can I help?"
        fontSize="1.8rem"
        colorFrom="#f6994a"
        colorTo="#fbbf75"
      />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuthStore();
  const [darkMode, setDarkMode] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const welcomeMessage = `Hello ${user?.name || 'User'}, I'm Sakhi. How can I help you today?`;
    const synth = window.speechSynthesis;

    // Prevent duplicate utterances
    if ('speechSynthesis' in window && !synth.speaking) {
      const utter = new SpeechSynthesisUtterance(welcomeMessage);
      utter.pitch = 1;
      utter.rate = 1;
      synth.speak(utter);
    }
  }, []);

  const handleUserChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput };
    const botMsg = {
      sender: 'sakhi',
      text: `That's interesting! Let's look into "${chatInput}"...`,
    };
    setChatMessages([...chatMessages, userMsg, botMsg]);
    setChatInput('');
  };

  return (
    <div className={darkMode ? 'flex bg-gray-900 text-white' : 'flex bg-white text-black'}>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.5} />

      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-[80px] left-0 w-[260px] min-h-screen bg-gradient-to-br from-[#013D34] to-[#015C4A] p-6 text-white shadow-lg z-10"
      >
        <h2 className="text-lg font-semibold mb-4">🛡️ Scam Protection Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-emerald-200 text-sm">
          <li>3 Suspicious URLs flagged</li>
          <li>2 UPI scam attempts blocked</li>
          <li>1 Crypto fraud attempt prevented</li>
          <li>5 Messages scanned</li>
        </ul>

        <div className="mt-4">
          <h3 className="text-sm text-white mb-2">🔒 Threat Level:</h3>
          <div className="h-2 rounded bg-red-500 w-[80%] mx-auto animate-pulse"></div>
        </div>

        <div className="mt-6 text-xs italic text-orange-200">
          💡 Tip: Never share OTPs with unknown callers.
        </div>
      </motion.aside>

      {/* Top-right Floating Controls */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
        <button className="bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-xl shadow">
          <FaLanguage />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-xl shadow"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-full"
          >
            <FaUserCircle size={22} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md text-sm">
              <div className="px-4 py-2 border-b font-semibold">{user?.name || 'User'}</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Scans</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-500">
                <FaSignOutAlt /> Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="ml-[260px] mt-[80px] min-h-screen w-full px-4 py-6">
        <WelcomeBanner userName={user?.name || 'User'} />

        <div className="max-w-6xl mx-auto mt-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="ml-[-20px]">
            <div className="flex flex-col gap-23">
              {actionsLeft.map((action, index) => (
                <div
                  key={index}
                  className="w-[240px] h-[100px] bg-gradient-to-br from-[#014F43] to-[#02735E] rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition group relative"
                >
                  <div className="mb-1">{action.icon}</div>
                  <span className="font-semibold">{action.title}</span>
                  <div className="absolute bottom-[-30px] opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 text-white p-1 px-2 rounded">
                    {action.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 0.6, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-[800px] h-[500px] flex flex-col items-center justify-center"
            >
              <Robot />
              <div className="fixed bottom-[-90px] left-1/transform -translate-x-1/5 z-30">
                <div className="text-4xl">
                  <ChatButton setChatOpen={setChatOpen} />
                </div>
              </div>
            </motion.div>

            {chatOpen && <ChatBot />}
          </div>

          {/* Right Section */}
          <div className="ml-[-80px]">
            <div className="flex flex-col gap-23">
              {actionsRight.map((action, index) => (
                <div
                  key={index}
                  className="w-[240px] h-[100px] bg-gradient-to-br from-[#014F43] to-[#02735E] rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition group relative"
                >
                  <div className="mb-1">{action.icon}</div>
                  <span className="font-semibold">{action.title}</span>
                  <div className="absolute bottom-[-30px] opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 text-white p-1 px-2 rounded">
                    {action.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
