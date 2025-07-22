import { motion } from 'framer-motion';
import { Play, Shield, Zap, Activity, CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';
import FloatingShape from '../components/FloatingShape';

const StatsTestimonialsSection = () => {
  return (
   <section 
      id="proof" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden py-20"
    >
      {/* Floating background shapes */}
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.8} />
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-emerald-400">Proven</span> Protection
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trusted by thousands and delivering measurable results against financial scams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Activity className="text-emerald-400" />
              <span>Our Impact</span>
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-emerald-400" />,
                  value: 92,
                  suffix: "%",
                  label: "Scam Detection Rate"
                },
                {
                  icon: <Zap className="w-6 h-6 text-emerald-400" />,
                  value: 1.7,
                  suffix: "Lakh",
                  label: "Fraud Cases Addressed"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
                  value: 98,
                  suffix: "%",
                  label: "User Satisfaction"
                },
                {
                  icon: <Activity className="w-6 h-6 text-emerald-400" />,
                  value: 24,
                  suffix: "/7",
                  label: "Monitoring"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-900/30 p-2 rounded-lg">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-emerald-400 mb-1">
                        <CountUp end={stat.value} duration={2} decimals={stat.value % 1 ? 1 : 0} />{stat.suffix}
                      </p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-emerald-500/20 mt-8">
              <h4 className="font-bold text-white mb-3">India Fraud Map</h4>
              <div className="h-48 bg-emerald-900/20 rounded-lg border border-dashed border-emerald-500/30 flex items-center justify-center">
                <p className="text-gray-400">State-wise Fraud Distribution</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Play className="text-emerald-400" />
              <span>Community</span>
            </h3>

            <div className="space-y-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "Small Business Owner, Delhi",
                  quote: "Sakhi detected a fake UPI payment request that looked completely genuine. The AI spotted patterns I would have never noticed.",
                  saved: "₹45,000"
                },
                {
                  name: "Rahul Mehta",
                  role: "College Student, Bangalore",
                  quote: "The QR scanner warned me about a fraudulent payment page before I entered any details. Absolute lifesaver!",
                  saved: "₹12,000"
                },
                {
                  name: "Ananya Patel",
                  role: "Freelancer, Mumbai",
                  quote: "Got an SMS about winning a lottery. Sakhi's AI immediately flagged it as scam and showed me similar reported cases.",
                  saved: "₹75,000"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="bg-emerald-900/30 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Play className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-emerald-400 text-sm mb-3">{testimonial.role}</p>
                      <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                      <div className="bg-emerald-900/20 px-3 py-1 rounded-full text-sm inline-block">
                        Protected {testimonial.saved}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mt-8">
              <h4 className="font-bold text-white mb-3">Featured Case Study</h4>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer pb-3">
                  <span className="text-emerald-400 font-medium">How we prevented ₹2.3Cr in crypto scams</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-400 pt-3 border-t border-gray-700">
                  Our AI detected a network of 42 fake cryptocurrency wallets being promoted across social media. Through real-time scanning and user reports, we prevented over 150 potential victims from sending funds to these fraudulent addresses.
                </p>
              </details>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsTestimonialsSection;