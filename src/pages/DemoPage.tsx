import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School, Users, BookOpen, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type DemoRole = 'student' | 'teacher' | 'parent' | null;

export default function DemoPage() {
  const [selectedRole, setSelectedRole] = useState<DemoRole>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();
  const { setDemoUser } = useAuth();

  const roles = [
    {
      id: 'student',
      title: 'Student Demo',
      description: 'Experience emotional learning through manga creation and AI companions',
      icon: BookOpen,
      features: [
        'Interactive Journaling',
        'AI Companion Support',
        'Manga Story Creation',
        'Emotional Check-ins'
      ]
    },
    {
      id: 'teacher',
      title: 'Teacher Demo',
      description: 'Monitor student progress and customize learning paths',
      icon: School,
      features: [
        'Student Progress Analytics',
        'Activity Management',
        'Class Insights',
        'Resource Library'
      ]
    },
    {
      id: 'parent',
      title: 'Parent Demo',
      description: 'Track your child\'s emotional growth and engagement',
      icon: Users,
      features: [
        'Progress Monitoring',
        'Activity Reports',
        'Communication Tools',
        'Support Resources'
      ]
    }
  ];

  const handleStartDemo = () => {
    if (!selectedRole) return;
    
    // Create mock user for demo
    const demoUser = {
      id: `demo-${selectedRole}`,
      name: `Demo ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`,
      email: `demo@${selectedRole}.example.com`,
      role: selectedRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=demo${selectedRole}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Set demo user in auth context
    setDemoUser(demoUser);

    // Navigate to appropriate dashboard
    switch (selectedRole) {
      case 'student':
        navigate('/app/learning-path');
        break;
      case 'teacher':
        navigate('/app/teacher-dashboard');
        break;
      case 'parent':
        navigate('/app/parent-dashboard');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Experience Kokoro Quest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Choose a role to explore our platform from different perspectives
          </motion.p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedRole(role.id as DemoRole)}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer
                  transition-all ${selectedRole === role.id 
                    ? 'ring-2 ring-purple-500 ring-offset-2' 
                    : 'hover:shadow-xl'
                  }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {role.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleStartDemo}
            disabled={!selectedRole}
            className={`inline-flex items-center justify-center px-8 py-3 
              rounded-lg font-medium transition-all transform
              ${selectedRole
                ? 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            Start Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            No registration required. Experience the full platform instantly.
          </p>
        </div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
          flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Welcome to the Demo</h3>
              <button
                onClick={() => setShowTutorial(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              This is a guided tour of our platform. You'll have access to all features
              in demo mode. Feel free to explore and interact with the interface.
            </p>
            <button
              onClick={() => setShowTutorial(false)}
              className="w-full py-3 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors"
            >
              Got it, let's start
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}