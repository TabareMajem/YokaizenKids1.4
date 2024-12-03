import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Save, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

type Props = {
  settings: {
    backupSchedule: string;
    retentionDays: number;
    lastBackup?: string;
    compressionEnabled: boolean;
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function DatabaseSettings({ settings, onSave, isLoading, error }: Props) {
  const [formData, setFormData] = useState(settings);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const handleBackup = async () => {
    setBackupStatus('running');
    try {
      // In a real app, this would call your backup API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBackupStatus('success');
      setTimeout(() => setBackupStatus('idle'), 3000);
    } catch (err) {
      setBackupStatus('error');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Backup Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Database Backup</h3>
              {settings.lastBackup && (
                <p className="text-sm text-gray-500">
                  Last backup: {new Date(settings.lastBackup).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleBackup}
            disabled={backupStatus === 'running'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed flex items-center gap-2"
          >
            {backupStatus === 'running' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent 
                  rounded-full animate-spin" />
                Running Backup...
              </>
            ) : backupStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Backup Complete
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Backup Now
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Backup Schedule
          </label>
          <select
            value={formData.backupSchedule}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              backupSchedule: e.target.value
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retention Period (days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={formData.retentionDays}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              retentionDays: parseInt(e.target.value)
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="compressionEnabled"
            checked={formData.compressionEnabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              compressionEnabled: e.target.checked
            }))}
            className="rounded border-gray-300 text-purple-600 
              focus:ring-purple-200"
          />
          <label htmlFor="compressionEnabled" className="text-sm text-gray-700">
            Enable Backup Compression
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent 
                rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}