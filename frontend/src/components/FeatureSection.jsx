import { motion } from 'framer-motion';
import { QrCode, IndianRupee, Link, MessageSquareWarning, Bitcoin, Bot } from 'lucide-react';
import FloatingShape from '../components/FloatingShape';

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all"
  >
    <div className="flex items-start gap-4">
      <div className="bg-emerald-900/30 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-400">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const FeaturesSection = () => (
 <section 
      id="features" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden py-20"
    >
      {/* Floating background shapes */}
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.8} />
    <div className="container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="text-emerald-400">AI-Powered</span> Protection Layers
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Multi-layered security approach combining cutting-edge AI with real-time monitoring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <QrCode className="w-8 h-8 text-emerald-400" />,
            title: "QR Code Scanner",
            desc: "Instant detection of malicious QR codes before scanning"
          },
          {
            icon: <IndianRupee className="w-8 h-8 text-emerald-400" />,
            title: "UPI Fraud Detection",
            desc: "Real-time verification of UPI IDs and transaction requests"
          },
          {
            icon: <Link className="w-8 h-8 text-emerald-400" />,
            title: "URL Analysis",
            desc: "Deep scan of shortened URLs and phishing links"
          },
          {
            icon: <MessageSquareWarning className="w-8 h-8 text-emerald-400" />,
            title: "SMS Scam Detection",
            desc: "AI analysis of suspicious messages and OTP frauds"
          },
          {
            icon: <Bitcoin className="w-8 h-8 text-emerald-400" />,
            title: "Crypto Wallet Check",
            desc: "Verification of cryptocurrency wallet addresses"
          },
          {
            icon: <Bot className="w-8 h-8 text-emerald-400" />,
            title: "AI Assistant",
            desc: "24/7 chatbot for instant scam verification"
          }
        ].map((feature, index) => (
          <FeatureCard key={index} {...feature} delay={index * 0.1} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;