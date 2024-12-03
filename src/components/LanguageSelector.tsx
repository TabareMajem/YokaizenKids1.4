import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../types/language';

type Props = {
  variant?: 'button' | 'dropdown';
  className?: string;
};

export default function LanguageSelector({ variant = 'button', className = '' }: Props) {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 
            transition-colors ${className}`}
        >
          <Globe className="w-5 h-5" />
          <span>{languages[language].nativeName}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg 
                  border border-gray-200 py-2 z-50"
              >
                {Object.entries(languages).map(([code, { nativeName }]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageSelect(code as Language)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 
                      transition-colors flex items-center justify-between"
                  >
                    <span>{nativeName}</span>
                    {language === code && (
                      <Check className="w-4 h-4 text-purple-600" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Object.entries(languages).map(([code, { nativeName }]) => (
        <button
          key={code}
          onClick={() => setLanguage(code as Language)}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-colors
            ${language === code
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {nativeName}
        </button>
      ))}
    </div>
  );
}