import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, CheckCircle2 } from 'lucide-react';

export default function CodeGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [codes, setCodes] = useState<{ student: string; code: string; }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCodes = () => {
    // Mock code generation
    const newCodes = Array.from({ length: 10 }, (_, i) => ({
      student: `Student ${i + 1}`,
      code: Math.random().toString(36).substring(2, 8).toUpperCase()
    }));
    setCodes(newCodes);
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
          flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Access Codes
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {codes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Generate access codes for your students
                </p>
                <button
                  onClick={generateCodes}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 transition-colors"
                >
                  Generate Codes
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {codes.map((code, index) => (
                    <div
                      key={code.code}
                      className="flex items-center justify-between p-3 
                        bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {code.student}
                        </p>
                        <p className="text-sm text-gray-500">
                          Code: {code.code}
                        </p>
                      </div>
                      <button
                        onClick={() => copyCode(code.code, index)}
                        className="p-2 hover:bg-gray-200 rounded-lg 
                          transition-colors"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {/* Download CSV */}}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg
                      hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download CSV
                  </button>
                  <button
                    onClick={() => setCodes([])}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg
                      hover:bg-purple-700 transition-colors"
                  >
                    Generate New Codes
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}