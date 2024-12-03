```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-purple-600 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join thousands of students, teachers, and parents in creating a more emotionally intelligent future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 rounded-full
                  bg-white text-purple-600 font-semibold shadow-lg
                  hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center px-8 py-4 rounded-full
                  bg-purple-700 text-white font-semibold shadow-lg
                  hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Book className="w-5 h-5 mr-2" />
                See Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Students', value: '10,000+' },
              { label: 'Schools', value: '50+' },
              { label: 'Stories Created', value: '100,000+' },
              { label: 'Happy Parents', value: '5,000+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-teal-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```