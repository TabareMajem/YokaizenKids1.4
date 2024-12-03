import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Calendar, Clock } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: any) => Promise<void>;
  onDelete: () => Promise<void>;
  event?: any;
  selectedDate?: Date | null;
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDate
}: Props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'activity',
    startTime: '',
    endTime: '',
    grade: '',
    recurring: 'none'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.extendedProps?.description || '',
        type: event.extendedProps?.type || 'activity',
        startTime: event.start?.toISOString().slice(0, 16) || '',
        endTime: event.end?.toISOString().slice(0, 16) || '',
        grade: event.extendedProps?.grade || '',
        recurring: event.extendedProps?.recurring || 'none'
      });
    } else if (selectedDate) {
      const startTime = new Date(selectedDate);
      const endTime = new Date(selectedDate);
      endTime.setHours(endTime.getHours() + 1);

      setFormData(prev => ({
        ...prev,
        startTime: startTime.toISOString().slice(0, 16),
        endTime: endTime.toISOString().slice(0, 16)
      }));
    }
  }, [event, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
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
                  <h2 className="text-xl font-semibold text-gray-800">
                    {event ? 'Edit Event' : 'Add Event'}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      title: e.target.value 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      description: e.target.value 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        type: e.target.value 
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    >
                      <option value="activity">Activity</option>
                      <option value="assessment">Assessment</option>
                      <option value="thematic-path">Thematic Path</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        grade: e.target.value 
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    >
                      <option value="">Select grade</option>
                      {['1st', '2nd', '3rd', '4th', '5th', '6th'].map(grade => (
                        <option key={grade} value={grade}>{grade} Grade</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        startTime: e.target.value 
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        endTime: e.target.value 
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recurring
                  </label>
                  <select
                    value={formData.recurring}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      recurring: e.target.value 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  >
                    <option value="none">No Recurrence</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between">
                  {event && (
                    <button
                      type="button"
                      onClick={onDelete}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 
                        rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Event
                    </button>
                  )}
                  <div className="flex gap-3">
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
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg
                        hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Event
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}