import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, Award, Book, Heart, Users, ArrowRight, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainNavbar from '../components/layout/MainNavbar';
import MainFooter from '../components/layout/MainFooter';

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <MainNavbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Evidence-Based Approach to Social-Emotional Learning
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how Kokoro Quest leverages proven psychological principles and cutting-edge 
              technology to foster emotional intelligence and academic success in students.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* SEL and CBT Integration */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Integrating SEL and CBT in Education
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Emotional Intelligence Development
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our platform integrates CASEL frameworks to help students recognize, understand, 
                and manage their emotions effectively.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  "SEL interventions that address CASEL's five core competencies increased students' 
                  academic performance by 11 percentile points"
                  <br />
                  - Durlak et al. (2011)
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  CBT Integration
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Cognitive Behavioral Therapy principles are seamlessly woven into our manga stories 
                and interactive activities.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  "CBT interventions showed significant effectiveness in reducing anxiety and 
                  depression symptoms in children"
                  <br />
                  - Weisz et al. (2006)
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technology and Learning */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Technology-Enhanced Learning
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Personalization",
                description: "Our AI companions adapt to each student's unique needs, providing personalized support and guidance throughout their learning journey.",
                icon: Brain
              },
              {
                title: "Gamified Engagement",
                description: "Research shows that gamification increases student motivation and participation in learning activities.",
                icon: Star
              },
              {
                title: "Real-Time Analytics",
                description: "Advanced analytics provide teachers and parents with actionable insights into emotional development.",
                icon: Award
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Insights */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Research-Backed Results
          </motion.h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Academic Performance",
                  stat: "11%",
                  description: "Average improvement in academic achievement through SEL integration",
                  source: "Taylor et al. (2017)"
                },
                {
                  title: "Emotional Regulation",
                  stat: "45%",
                  description: "Reduction in behavioral incidents through emotional awareness training",
                  source: "Durlak et al. (2011)"
                }
              ].map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {result.stat}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{result.description}</p>
                  <p className="text-sm text-purple-600">Source: {result.source}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Educational Environment?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-6 py-3 
                border border-transparent text-base font-medium rounded-md 
                text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              See a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 
                border border-purple-200 text-base font-medium rounded-md 
                text-purple-600 bg-white hover:bg-purple-50 transition-colors"
            >
              Contact Us
              <Download className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}