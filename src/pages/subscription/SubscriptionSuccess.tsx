import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would verify the subscription status here
    const timer = setTimeout(() => {
      navigate('/app/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white 
      flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center 
            justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Subscription Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to Kokoro Quest. You now have access to all features.
        </p>

        <Link
          to="/app/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 
            bg-purple-600 text-white rounded-lg hover:bg-purple-700 
            transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
}