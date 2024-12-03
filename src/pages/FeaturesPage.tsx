import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Heart, 
  Star, 
  Sparkles,
  PenTool,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import MainNavbar from '../components/layout/MainNavbar';
import MainFooter from '../components/layout/MainFooter';

// Mock showcase data - in a real app, this would come from your backend
const showcaseSlides = [
  {
    id: 1,
    title: "Journey Through Emotions",
    description: "Students create personal manga stories reflecting their emotional growth",
    imageUrl: "https://images.unsplash.com/photo-1515041219749-89347f83291a?w=1200&h=800"
  },
  {
    id: 2,
    title: "Interactive Learning Paths",
    description: "Personalized learning journeys inspired by Japanese culture",
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&h=800"
  },
  {
    id: 3,
    title: "AI Companions",
    description: "Friendly AI guides supporting emotional development",
    imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800"
  }
];

const features = [
  {
    id: 1,
    title: "AI-Powered Journaling",
    description: "Transform thoughts and feelings into beautiful manga stories with the help of AI",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    preview: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600"
  },
  {
    id: 2,
    title: "Emotional Learning Paths",
    description: "Journey through personalized learning experiences inspired by Japanese culture",
    icon: Heart,
    color: "from-red-500 to-orange-500",
    preview: "https://images.unsplash.com/photo-1614107707379-283a65774553?w=800&h=600"
  },
  {
    id: 3,
    title: "AI Companions",
    description: "Friendly AI guides that support emotional growth and learning",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    preview: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600"
  },
  {
    id: 4,
    title: "Interactive Activities",
    description: "Engage with AR experiences and gamified learning modules",
    icon: Star,
    color: "from-amber-500 to-yellow-500",
    preview: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600"
  }
];

export default function FeaturesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
              Features that Transform Learning
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how Kokoro Quest combines AI, manga, and emotional learning
              to create an engaging educational experience
            </motion.p>
          </div>
        </div>
      </div>

      {/* Showcase Slider */}
      <div className="relative max-w-6xl mx-auto px-4 mb-16">
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          {showcaseSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ display: currentSlide === index ? 'block' : 'none' }}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg text-gray-200">{slide.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => 
              prev === 0 ? showcaseSlides.length - 1 : prev - 1
            )}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 
              p-2 rounded-full bg-white/20 backdrop-blur-sm text-white
              hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => 
              (prev + 1) % showcaseSlides.length
            )}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
              p-2 rounded-full bg-white/20 backdrop-blur-sm text-white
              hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
            flex items-center gap-2">
            {showcaseSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-4 bg-white' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden
                hover:shadow-xl transition-shadow"
            >
              <div className="absolute inset-0">
                <img
                  src={feature.preview}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform 
                    duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/80 via-black/50 to-transparent" />
              </div>
              <div className="relative p-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} 
                  flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-200 mb-4">
                  {feature.description}
                </p>
                <button className="inline-flex items-center text-white 
                  group-hover:text-purple-300 transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 
                    transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Learning?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Join thousands of students on their journey of emotional discovery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg
              hover:bg-purple-50 transition-colors flex items-center justify-center 
              gap-2">
              <BookOpen className="w-5 h-5" />
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center justify-center 
              gap-2">
              <MessageCircle className="w-5 h-5" />
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}