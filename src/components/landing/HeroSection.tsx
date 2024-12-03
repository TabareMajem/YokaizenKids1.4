```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-pink-50 to-purple-50">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 0.8
            }}
            animate={{
              y: window.innerHeight + 20,
              x: `+=${Math.sin(i) * 100}`,
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="pink"
              className="w-full h-full opacity-60"
            >
              <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 7 12 8 12s8-7.58 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - For Children */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Turn Your Journal Into an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500">
                Exciting Manga Adventure!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore themed journeys, unlock augmented reality games, and grow emotionally with your AI companion.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 rounded-full
                bg-gradient-to-r from-teal-400 to-purple-500 text-white
                font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Manga Journey!
            </Link>
          </motion.div>

          {/* Right Column - For Teachers/Parents */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empower Students' Emotional Growth
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Track progress, manage activities, and gain insights into students' well-being through engaging tools and analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 rounded-full
                  bg-white text-purple-600 font-semibold shadow-md
                  hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Book className="w-5 h-5 mr-2" />
                See Demo
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full
                  bg-purple-600 text-white font-semibold shadow-md
                  hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```