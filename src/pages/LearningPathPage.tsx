import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HanamiPathView from '../components/learning-path/HanamiPathView';
import { useAuth } from '../contexts/AuthContext';

export default function LearningPathPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to appropriate dashboard if not a student
  if (user && user.role !== 'student') {
    navigate(`/app/${user.role}-dashboard`);
    return null;
  }

  return (
    <div className="min-h-screen">
      <HanamiPathView />
    </div>
  );
}