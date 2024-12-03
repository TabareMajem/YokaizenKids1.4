import { motion } from 'framer-motion';
import { TrendingUp, Brain, Star } from 'lucide-react';

const results = [
  {
    icon: TrendingUp,
    percentage: "11%",
    title: "Academic Achievement",
    description: "Gain in academic performance through SEL integration"
  },
  {
    icon: Brain,
    percentage: "45%",
    title: "Emotional Regulation",
    description: "Reduction in anxiety symptoms with CBT techniques"
  },
  {
    icon: Star,
    percentage: "87%",
    title: "Student Engagement",
    description: "Increase in classroom participation and motivation"
  }
];

export default function ResearchResults() {
  return (
    <div className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Research-Backed Results
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={result.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform 
                hover:scale-105 transition-all"
            >
              <div className="inline-block p-4 bg-purple-100 rounded-2xl mb-6">
                <result.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-4">
                {result.percentage}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {result.title}
              </h3>
              <p className="text-gray-600">
                {result.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}