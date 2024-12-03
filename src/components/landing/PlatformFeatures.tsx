```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Gamepad, Brain, BarChart2, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: "AI-Generated Manga",
    description: "Transform journal entries into beautiful manga stories automatically.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Gamepad,
    title: "Interactive Journeys",
    description: "Engage with themed adventures and AR-based SEL games.",
    color: "from-teal-500 to-blue-500"
  },
  {
    icon: Brain,
    title: "Emotional Learning",
    description: "Develop emotional intelligence through engaging activities.",
    color: "from-pink-500 to-red-500"
  },
  {
    icon: BarChart2,
    title: "Progress Tracking",
    description: "Monitor emotional growth with detailed analytics.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: MessageCircle,
    title: "Communication Tools",
    description: "Stay connected with teachers and parents seamlessly.",
    color: "from-green-500 to-teal-500"
  }
];

export default function PlatformFeatures() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-purple-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to support emotional growth and learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 
                  rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform" />
                <div className="relative bg-white rounded-2xl shadow-xl p-8 transform 
                  -rotate-2 group-hover:-rotate-1 transition-transform">
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```