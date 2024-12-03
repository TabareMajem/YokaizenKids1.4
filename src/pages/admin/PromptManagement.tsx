import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PromptList from '../../components/admin/prompt/PromptList';
import PromptEditor from '../../components/admin/prompt/PromptEditor';
import PromptHistory from '../../components/admin/prompt/PromptHistory';
import { usePromptTemplates } from '../../hooks/usePromptTemplates';
import type { PromptTemplate } from '../../hooks/usePromptTemplates';

export default function PromptManagement() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { 
    getTemplates, 
    createTemplate, 
    updateTemplate, 
    deleteTemplate,
    isLoading,
    error 
  } = usePromptTemplates();

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getTemplates();
      setTemplates(result);
    };

    fetchTemplates();
  }, []);

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsEditing(true);
  };

  const handleEditTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(true);
  };

  const handleViewHistory = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setShowHistory(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    
    try {
      await deleteTemplate(templateId);
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    } catch (err) {
      console.error('Failed to delete template:', err);
    }
  };

  const handleSaveTemplate = async (templateData: Partial<PromptTemplate>) => {
    try {
      if (selectedTemplate) {
        const updatedTemplate = await updateTemplate(selectedTemplate.id, templateData);
        setTemplates(prev => prev.map(t => 
          t.id === selectedTemplate.id ? updatedTemplate : t
        ));
      } else {
        const newTemplate = await createTemplate(templateData);
        setTemplates(prev => [...prev, newTemplate]);
      }
      setIsEditing(false);
      setSelectedTemplate(null);
    } catch (err) {
      console.error('Failed to save template:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isEditing ? (
          <PromptEditor
            template={selectedTemplate}
            onSave={handleSaveTemplate}
            onCancel={() => {
              setIsEditing(false);
              setSelectedTemplate(null);
            }}
          />
        ) : showHistory && selectedTemplate ? (
          <PromptHistory
            templateId={selectedTemplate.id}
            onClose={() => {
              setShowHistory(false);
              setSelectedTemplate(null);
            }}
          />
        ) : (
          <PromptList
            templates={templates}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteTemplate}
            onCreate={handleCreateTemplate}
            onViewHistory={handleViewHistory}
          />
        )}
      </div>
    </AdminLayout>
  );
}