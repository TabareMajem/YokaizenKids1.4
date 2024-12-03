import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, AlertCircle } from 'lucide-react';
import type { PromptTemplate } from '../../../hooks/usePromptTemplates';

type Props = {
  template?: PromptTemplate | null;
  onSave: (templateData: Partial<PromptTemplate>) => Promise<void>;
  onCancel: () => void;
};

export default function PromptEditor({ template, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    template: template?.template || '',
    variables: template?.variables || [],
    isActive: template?.isActive ?? true
  });

  const [newVariable, setNewVariable] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.description.trim() || !formData.template.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if all variables are used in the template
    const unusedVariables = formData.variables.filter(variable => 
      !formData.template.includes(`{{${variable}}}`)
    );

    if (unusedVariables.length > 0) {
      setError(`The following variables are not used in the template: ${unusedVariables.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save template');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddVariable = () => {
    if (!newVariable.trim()) return;
    
    if (formData.variables.includes(newVariable)) {
      setError('This variable already exists');
      return;
    }

    setFormData(prev => ({
      ...prev,
      variables: [...prev.variables, newVariable]
    }));
    setNewVariable('');
    setError(null);
  };

  const handleRemoveVariable = (variable: string) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter(v => v !== variable)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {template ? 'Edit Prompt Template' : 'Create Prompt Template'}
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
          className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
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
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              resize-none"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Variables
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newVariable}
              onChange={(e) => setNewVariable(e.target.value)}
              placeholder="Add a variable..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
            <button
              type="button"
              onClick={handleAddVariable}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.variables.map((variable) => (
              <span
                key={variable}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full
                  flex items-center gap-2"
              >
                {variable}
                <button
                  type="button"
                  onClick={() => handleRemoveVariable(variable)}
                  className="hover:text-purple-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template
          </label>
          <textarea
            value={formData.template}
            onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              font-mono text-sm"
            rows={10}
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Use variables in your template with the syntax: {'{{variableName}}'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              isActive: e.target.checked 
            }))}
            className="rounded border-gray-300 text-purple-600 
              focus:ring-purple-200"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Template is active
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2"
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
              Save Template
            </>
          )}
        </button>
      </div>
    </form>
  );
}