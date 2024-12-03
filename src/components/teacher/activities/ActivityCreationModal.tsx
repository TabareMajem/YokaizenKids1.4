import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const activitySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['discussion', 'exercise', 'assessment']),
  grade: z.string().min(1, 'Grade is required'),
  duration: z.string().min(1, 'Duration is required'),
  materials: z.array(z.string()).optional(),
  instructions: z.array(z.object({
    text: z.string(),
    image: z.any().optional()
  }))
});

type ActivityFormData = z.infer<typeof activitySchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ActivityFormData) => Promise<void>;
  activity?: ActivityFormData;
};

export default function ActivityCreationModal({
  isOpen,
  onClose,
  onSave,
  activity
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: activity || {
      title: '',
      description: '',
      type: 'exercise',
      grade: '',
      duration: '30',
      materials: [],
      instructions: [{ text: '' }]
    }
  });

  const handleFormSubmit = async (data: ActivityFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSave(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addInstruction = () => {
    const instructions = watch('instructions');
    setValue('instructions', [...instructions, { text: '' }]);
  };

  const removeInstruction = (index: number) => {
    const instructions = watch('instructions');
    setValue('instructions', instructions.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, upload to cloud storage and get URL
    const imageUrl = URL.createObjectURL(file);
    const instructions = watch('instructions');
    instructions[index].image = imageUrl;
    setValue('instructions', instructions);
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
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {activity ? 'Edit Activity' : 'Create Activity'}
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
              <div className="p-6 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      {...register('type')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    >
                      <option value="discussion">Discussion</option>
                      <option value="exercise">Exercise</option>
                      <option value="assessment">Assessment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <select
                      {...register('grade')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    >
                      <option value="">Select grade</option>
                      {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((grade) => (
                        <option key={grade} value={grade}>{grade} Grade</option>
                      ))}
                    </select>
                    {errors.grade && (
                      <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    {...register('duration')}
                    min="5"
                    max="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Instructions
                    </label>
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="text-sm text-purple-600 hover:text-purple-700 
                        flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>
                  <div className="space-y-4">
                    {watch('instructions').map((_, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <textarea
                            {...register(`instructions.${index}.text`)}
                            placeholder={`Step ${index + 1}`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                              resize-none"
                            rows={2}
                          />
                          <div className="flex items-center gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              className="hidden"
                              id={`instruction_image_${index}`}
                            />
                            <label
                              htmlFor={`instruction_image_${index}`}
                              className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
                                hover:bg-purple-100 transition-colors cursor-pointer
                                flex items-center gap-2"
                            >
                              <Upload className="w-5 h-5" />
                              Upload Image
                            </label>
                            {watch(`instructions.${index}.image`) && (
                              <div className="relative w-24 h-24">
                                <img
                                  src={watch(`instructions.${index}.image`)}
                                  alt={`Step ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const instructions = watch('instructions');
                                    instructions[index].image = undefined;
                                    setValue('instructions', instructions);
                                  }}
                                  className="absolute -top-2 -right-2 p-1 bg-red-100 
                                    rounded-full text-red-600 hover:bg-red-200"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg
                              transition-colors h-fit"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
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
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg
                      hover:bg-purple-700 transition-colors flex items-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent 
                          rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Activity
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