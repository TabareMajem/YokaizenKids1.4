```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart2, Brain, Mail } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: "Manage Activities",
    description: "Schedule and organize weekly activities, thematic journeys, and assessments with our intuitive calendar interface.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600"
  },
  {
    icon: BarChart2,
    title: "Monitor Progress",
    description: "Track student engagement and SEL development through comprehensive analytics and insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600"
  },
  {
    icon: Brain,
    title: "Assessment Tools",
    description: "Access powerful tools to evaluate emotional intelligence and identify potential concerns.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600"
  },
  {
    icon: Mail,
    title: "Parent Communication",
    description: "Keep parents informed and involved with automated updates and progress reports.",
    image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&h=600"
  }
];

export default function TeachersSection() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-teal-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simplify SEL Management With Intuitive Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage, track, and improve your students' emotional learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden 
                  transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-teal-400 
                    rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                </div>
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform hover:scale-110 
                      transition-transform duration-300"
                  />
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