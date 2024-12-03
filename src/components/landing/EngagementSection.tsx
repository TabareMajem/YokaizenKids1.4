import { motion } from 'framer-motion';
import { Smile, BookOpen, Heart } from 'lucide-react';

const engagementTypes = [
  {
    title: "Student Engagement",
    icon: Smile,
    features: [
      "Daily mood check-in with AI companion",
      "Personalized SEL activities",
      "Interactive journaling and manga creation"
    ]
  },
  {
    title: "Teacher Involvement",
    icon: BookOpen,
    features: [
      "Real-time analytics dashboard",
      "Progress monitoring tools",
      "Customizable content alignment"
    ]
  },
  {
    title: "Parent Participation",
    icon: Heart,
    features: [
      "Regular progress updates",
      "Access to child's manga stories",
      "Collaborative home activities"
    ]
  }
];

export default function EngagementSection() {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transforming Education with Kokoro Quest
          </h2>
          <p className="text-xl text-gray-600">
            See How Kokoro Quest Empowers Students and Enhances Learning Outcomes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {engagementTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all"
            >
              <div className="p-4 bg-purple-100 rounded-2xl w-fit mb-6">
                <type.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {type.title}
              </h3>
              <ul className="space-y-3">
                {type.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}