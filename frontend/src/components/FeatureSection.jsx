// FeaturesSection.jsx
import { motion } from 'framer-motion';
import { QrCode, IndianRupee, Link, MessageSquareWarning, Bitcoin, Bot } from 'lucide-react';
import SplineBackground from './SplineBackground';
import FlipCard  from "../components/FlipCard";

const FeatureCard = ({ icon, title, desc, delay, origin }) => (
  <motion.div
    initial={{ rotateY: 90, opacity: 0, [origin]: -100 }}
    whileInView={{ rotateY: 0, opacity: 1, [origin]: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-emerald-400 transition-all shadow-xl"
  >
    <div className="flex items-start gap-4">
      <div className="bg-emerald-900/40 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-300 text-sm">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <QrCode className="w-8 h-8 text-emerald-400" />,
      title: "QR Code Scanner",
      desc: "Instant detection of malicious QR codes before scanning",
      origin: 'x',
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-emerald-400" />,
      title: "UPI Fraud Detection",
      desc: "Real-time verification of UPI IDs and transaction requests",
      origin: 'y',
    },
    {
      icon: <Link className="w-8 h-8 text-emerald-400" />,
      title: "URL Analysis",
      desc: "Deep scan of shortened URLs and phishing links",
      origin: 'x',
    },
    {
      icon: <MessageSquareWarning className="w-8 h-8 text-emerald-400" />,
      title: "SMS Scam Detection",
      desc: "AI analysis of suspicious messages and OTP frauds",
      origin: 'y',
    },
    {
      icon: <Bitcoin className="w-8 h-8 text-emerald-400" />,
      title: "Crypto Wallet Check",
      desc: "Verification of cryptocurrency wallet addresses",
      origin: 'x',
    },
    {
      icon: <Bot className="w-8 h-8 text-emerald-400" />,
      title: "AI Assistant",
      desc: "24/7 chatbot for instant scam verification",
      origin: 'y',
    }
  ];

  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
     <SplineBackground/>
     <FlipCard/>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400">AI-Powered</span> Protection Layers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Multi-layered security approach combining cutting-edge AI with real-time monitoring
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              delay={index * 0.2}
              origin={feature.origin}
            />
          ))}
        </div>
      </div>
      <FlipCard/>
    </section>
  );
};

export default FeatureSection;
