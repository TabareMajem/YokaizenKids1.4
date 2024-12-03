import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, AlertCircle, ArrowRight } from 'lucide-react';

type Props = {
  onSelect: (assessmentId: string) => void;
};

export default function AssessmentSelector({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Select an assessment to begin your journey of self-discovery
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: 'ei',
              title: 'Emotional Intelligence',
              description: 'Understand how you recognize and manage emotions',
              icon: Brain,
              duration: '15-20 mins',
              questions: 20
            },
            {
              id: 'big-five',
              title: 'Big Five Personality',
              description: 'Discover your unique personality traits',
              icon: Users,
              duration: '10-15 mins',
              questions: 20
            },
            {
              id: 'bullying',
              title: 'Social Dynamics',
              description: 'Understand social interactions and relationships',
              icon: AlertCircle,
              duration: '10-15 mins',
              questions: 15
            }
          ].map((assessment) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
              onClick={() => onSelect(assessment.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <assessment.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {assessment.title}
                    </h2>
                    <p className="text-purple-600">
                      {assessment.duration} • {assessment.questions} questions
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {assessment.description}
                </p>

                <div className="flex items-center text-purple-600 group">
                  <span className="font-medium">Start Assessment</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 
                    transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}