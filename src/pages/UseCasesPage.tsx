import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { School, TrendingUp, Heart, Users, ArrowRight, Download, Calendar } from 'lucide-react';
import MainNavbar from '../components/layout/MainNavbar';
import MainFooter from '../components/layout/MainFooter';

export default function UseCasesPage() {
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
              Real-World Success: Kokoro Quest in Schools
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how schools across Japan are transforming education with Kokoro Quest. 
              Read about real-life implementations and the positive outcomes experienced by 
              students, teachers, and communities.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Sakura Elementary School */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <School className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Sakura Elementary School
                  </h3>
                  <p className="text-gray-600">Tokyo, Japan</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-600">
                    A public elementary school with 500 students aimed to improve emotional 
                    regulation and reduce classroom disruptions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600">
                    Implemented Kokoro Quest in grades 3-6, integrating it into daily 
                    homeroom activities.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Results</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      40% decrease in behavioral incidents
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      15% improvement in test scores
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Harmony Middle School */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <School className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Harmony Middle School
                  </h3>
                  <p className="text-gray-600">Osaka, Japan</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-600">
                    Private middle school seeking to enhance SEL curriculum and support 
                    students during transitional years.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600">
                    Deployed Kokoro Quest in advisory periods and counseling sessions with 
                    comprehensive teacher training.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Results</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Significant improvement in emotional awareness
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Enhanced peer relationships
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Takeaways */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Key Takeaways from Schools
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Enhanced Well-Being",
                description: "Significant improvements in students' emotional health and resilience."
              },
              {
                icon: TrendingUp,
                title: "Academic Growth",
                description: "Integration of SEL led to better focus and academic performance."
              },
              {
                icon: Users,
                title: "Stronger Communities",
                description: "Improved relationships among students and between students and teachers."
              }
            ].map((takeaway, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                  <takeaway.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {takeaway.title}
                </h3>
                <p className="text-gray-600">{takeaway.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join the Growing Community of Kokoro Quest Schools
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-6 py-3 
                border border-transparent text-base font-medium rounded-md 
                text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Request a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 
                border border-purple-200 text-base font-medium rounded-md 
                text-purple-600 bg-white hover:bg-purple-50 transition-colors"
            >
              Contact Sales
              <Download className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}