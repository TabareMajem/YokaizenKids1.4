import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  LayoutDashboard, 
  Users, 
  CreditCard,
  BookOpen,
  Brain,
  Wand2,
  BarChart2,
  Settings,
  X,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Redirect if not authenticated or not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/app/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/admin/users', icon: Users, label: 'Users' },
    { path: '/app/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { path: '/app/admin/content', icon: BookOpen, label: 'Content' },
    { path: '/app/admin/parent-activities', icon: Brain, label: 'Parent Activities' },
    { path: '/app/admin/quiz', icon: Brain, label: 'Quiz Management' },
    { path: '/app/admin/paths', icon: Map, label: 'Learning Paths' },
    { path: '/app/admin/prompts', icon: Wand2, label: 'Prompts' },
    { path: '/app/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/app/admin/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed inset-y-0 left-0 transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 w-64 bg-white border-r border-gray-200 
        transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600">Kokoro Quest</h1>
          <p className="text-sm text-gray-600">Admin Panel</p>
        </div>

        <div className="px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                mb-2 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-2 h-2 rounded-full bg-purple-600"
                />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}