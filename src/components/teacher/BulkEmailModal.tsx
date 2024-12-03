import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, Users } from 'lucide-react';
import { useParentEmail } from '../../hooks/useParentEmail';
import type { Student } from '../../types/teacher';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedStudents: Student[];
};

export default function BulkEmailModal({
  isOpen,
  onClose,
  selectedStudents
}: Props) {
  const [formData, setFormData] = useState({
    subject: `Class Update - ${new Date().toLocaleDateString()}`,
    message: '',
    includeProgress: true,
    includeActivities: true
  });

  const { sendBulkParentEmails, isLoading, error } = useParentEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await sendBulkParentEmails(
        selectedStudents.map(s => s.id),
        formData
      );
      onClose();
    } catch (err) {
      console.error('Failed to send bulk emails:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Bulk Email to Parents
                    </h2>
                    <p className="text-sm text-gray-600">
                      Sending to {selectedStudents.length} parents
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Selected Students */}
              <div className="px-6 py-4 bg-purple-50">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Selected Students</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedStudents.map(student => (
                    <span
                      key={student.id}
                      className="px-2 py-1 bg-white rounded-full text-sm text-gray-600"
                    >
                      {student.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      subject: e.target.value
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      message: e.target.value
                    }))}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeProgress}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        includeProgress: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-purple-600 
                        focus:ring-purple-200"
                    />
                    <span className="text-sm text-gray-700">
                      Include progress reports
                    </span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeActivities}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        includeActivities: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-purple-600 
                        focus:ring-purple-200"
                    />
                    <span className="text-sm text-gray-700">
                      Include recommended activities
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 
                      rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg
                      hover:bg-purple-700 transition-colors flex items-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent 
                          rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send to All
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}