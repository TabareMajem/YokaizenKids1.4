import React from 'react';
import { motion } from 'framer-motion';
import { History, ArrowLeft, Clock, User } from 'lucide-react';

type Version = {
  id: string;
  version: number;
  changes: string;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: Date;
};

type Props = {
  versions: Version[];
  onRestore: (versionId: string) => void;
  onCompare: (versionId1: string, versionId2: string) => void;
};

export default function ContentVersionHistory({ versions, onRestore, onCompare }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <History className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Version History</h3>
          <p className="text-sm text-gray-600">
            Track changes and restore previous versions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {versions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Version {version.version}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {version.createdBy.name}
                </span>
              </div>
            </div>
            
            <p className="text-gray-800 mb-3">{version.changes}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(version.createdAt).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onRestore(version.id)}
                  className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 
                    rounded-lg transition-colors"
                >
                  Restore
                </button>
                {index < versions.length - 1 && (
                  <button
                    onClick={() => onCompare(version.id, versions[index + 1].id)}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 
                      rounded-lg transition-colors"
                  >
                    Compare
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}