```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Heart, Shield, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: "Track Progress",
    description: "Monitor your child's emotional growth with easy-to-understand charts and insights.",
    color: "from-pink-400 to-red-400"
  },
  {
    icon: Heart,
    title: "Get Recommendations",
    description: "Receive personalized suggestions to support your child's emotional development.",
    color: "from-purple-400 to-pink-400"
  },
  {
    icon: Shield,
    title: "Bullying Prevention",
    description: "Stay informed about social dynamics and get early warning signs.",
    color: "from-teal-400 to-blue-400"
  },
  {
    icon: MessageCircle,
    title: "Teacher Communication",
    description: "Maintain open communication channels with teachers about your child's progress.",
    color: "from-green-400 to-teal-400"
  }
];

export default function ParentsSection() {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-pink-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Be Informed, Be Involved
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay connected with your child's emotional learning journey and support their growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 transform 
                  hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} 
                  rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=100&h=100"
              alt="Parent testimonial"
              className="w-20 h-20 rounded-full object-cover mb-6"
            />
            <blockquote className="text-xl text-gray-600 italic mb-6">
              "Kokoro Quest has transformed how my child expresses emotions. The manga stories make it fun and engaging!"
            </blockquote>
            <p className="font-semibold text-gray-900">Sarah Chen</p>
            <p className="text-gray-500">Parent of a 10-year-old student</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```