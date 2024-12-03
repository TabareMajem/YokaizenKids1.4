import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Book, Brain, Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainNavbar from '../components/layout/MainNavbar';
import MainFooter from '../components/layout/MainFooter';
import EngagementSection from '../components/landing/EngagementSection';
import ResearchResults from '../components/landing/ResearchResults';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-pink-50 to-purple-50">
      <MainNavbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Previous hero section code remains the same */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* For Children */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
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

            {/* For Teachers/Parents */}
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

        {/* Floating Elements Animation */}
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
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Previous features grid code remains the same */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Your Journey to Emotional Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Discover how we make emotional learning fun and engaging
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Book,
              title: "Write Your Story",
              description: "Express your feelings through guided journaling with fun prompts",
              color: "from-teal-500 to-blue-500"
            },
            {
              icon: Sparkles,
              title: "Manga Magic",
              description: "Watch your journal transform into beautiful manga panels",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Brain,
              title: "Learn & Grow",
              description: "Complete quests and activities to develop emotional skills",
              color: "from-pink-500 to-red-500"
            },
            {
              icon: Heart,
              title: "Track Progress",
              description: "See your emotional growth through fun achievements",
              color: "from-red-500 to-orange-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 
                rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform 
                -rotate-2 group-hover:-rotate-1 transition-transform">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color}
                  rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engagement Section */}
      <EngagementSection />

      {/* Research Results */}
      <ResearchResults />

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-500 to-purple-600 py-24">
        {/* Previous CTA code remains the same */}
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
                  <Star className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center px-8 py-4 rounded-full
                    bg-purple-700 text-white font-semibold shadow-lg
                    hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Users className="w-5 h-5 mr-2" />
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
                { label: "Students", value: "10,000+" },
                { label: "Schools", value: "50+" },
                { label: "Stories Created", value: "100,000+" },
                { label: "Happy Parents", value: "5,000+" }
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

      <MainFooter />
    </div>
  );
}