import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Lock, CheckCircle2 } from 'lucide-react';
import { fabric } from 'fabric';
import MilestoneForm from './MilestoneForm';
import type { ThematicPath, Milestone } from '../../../types/thematicPath';
import { useContent } from '../../../hooks/useContent';

type Props = {
  path?: ThematicPath | null;
  onSave: (pathData: Partial<ThematicPath>) => Promise<void>;
  onCancel: () => void;
};

export default function PathEditor({ path, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: path?.name || '',
    theme: path?.theme || '',
    backgroundImage: path?.backgroundImage || '',
    milestones: path?.milestones || [],
    startDate: path?.startDate || '',
    endDate: path?.endDate || '',
    grade: path?.grade || ''
  });

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const { contents } = useContent();

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f3f4f6'
    });

    // Load background image if exists
    if (formData.backgroundImage) {
      fabric.Image.fromURL(formData.backgroundImage, (img) => {
        img.scaleToWidth(800);
        fabricCanvasRef.current?.setBackgroundImage(img, 
          fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current)
        );
      });
    }

    // Add milestones
    formData.milestones.forEach(milestone => {
      const circle = new fabric.Circle({
        left: milestone.position.x,
        top: milestone.position.y,
        radius: 20,
        fill: milestone.status === 'completed' ? '#10B981' : '#E5E7EB',
        stroke: milestone.status === 'completed' ? '#059669' : '#D1D5DB',
        strokeWidth: 2,
        selectable: true,
        data: { milestoneId: milestone.id }
      });

      fabricCanvasRef.current?.add(circle);
    });

    // Event listeners
    fabricCanvasRef.current.on('object:moving', (e) => {
      const target = e.target;
      if (!target) return;

      const milestoneId = target.data?.milestoneId;
      if (!milestoneId) return;

      setFormData(prev => ({
        ...prev,
        milestones: prev.milestones.map(m =>
          m.id === milestoneId
            ? { ...m, position: { x: target.left || 0, y: target.top || 0 } }
            : m
        )
      }));
    });

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.theme.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save path');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {path ? 'Edit Thematic Path' : 'Create Thematic Path'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Path Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <input
            type="text"
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>
      </div>

      {/* Schedule and Grade */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          >
            <option value="">Select grade</option>
            {['1st', '2nd', '3rd', '4th', '5th', '6th'].map(grade => (
              <option key={grade} value={grade}>{grade} Grade</option>
            ))}
          </select>
        </div>
      </div>

      {/* Background Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setFormData(prev => ({ ...prev, backgroundImage: imageUrl }));

              // Update canvas background
              fabric.Image.fromURL(imageUrl, (img) => {
                img.scaleToWidth(800);
                fabricCanvasRef.current?.setBackgroundImage(img, 
                  fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current)
                );
              });
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Canvas Editor */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>

      {/* Milestone Controls */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            const newMilestone: Milestone = {
              id: Date.now().toString(),
              position: { x: 400, y: 300 },
              activityId: '',
              status: 'locked'
            };

            setFormData(prev => ({
              ...prev,
              milestones: [...prev.milestones, newMilestone]
            }));

            // Add milestone to canvas
            const circle = new fabric.Circle({
              left: newMilestone.position.x,
              top: newMilestone.position.y,
              radius: 20,
              fill: '#E5E7EB',
              stroke: '#D1D5DB',
              strokeWidth: 2,
              selectable: true,
              data: { milestoneId: newMilestone.id }
            });

            fabricCanvasRef.current?.add(circle);
            setSelectedMilestone(newMilestone);
            setShowMilestoneForm(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Milestone
        </button>

        {selectedMilestone && (
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                milestones: prev.milestones.filter(m => m.id !== selectedMilestone.id)
              }));
              setSelectedMilestone(null);

              // Remove from canvas
              const objects = fabricCanvasRef.current?.getObjects() || [];
              const milestoneObject = objects.find(
                obj => obj.data?.milestoneId === selectedMilestone.id
              );
              if (milestoneObject) {
                fabricCanvasRef.current?.remove(milestoneObject);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg
              hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Remove Selected
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
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
              Save Path
            </>
          )}
        </button>
      </div>

      {/* Milestone Form Modal */}
      {showMilestoneForm && selectedMilestone && (
        <MilestoneForm
          milestone={selectedMilestone}
          onSave={(updatedMilestone) => {
            setFormData(prev => ({
              ...prev,
              milestones: prev.milestones.map(m =>
                m.id === selectedMilestone.id ? { ...m, ...updatedMilestone } : m
              )
            }));
            setShowMilestoneForm(false);
            setSelectedMilestone(null);
          }}
          onCancel={() => {
            setShowMilestoneForm(false);
            setSelectedMilestone(null);
          }}
        />
      )}
    </form>
  );
}