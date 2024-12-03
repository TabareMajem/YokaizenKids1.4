import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MoreVertical, CheckCircle2, Clock } from 'lucide-react';

type ParentConnection = {
  id: string;
  studentName: string;
  parentName: string | null;
  email: string | null;
  status: 'active' | 'pending';
  lastActivity: string | null;
};

// Mock data
const mockConnections: ParentConnection[] = Array.from({ length: 10 }, (_, i) => ({
  id: `connection-${i + 1}`,
  studentName: `Student ${i + 1}`,
  parentName: i % 3 === 0 ? null : `Parent ${i + 1}`,
  email: i % 3 === 0 ? null : `parent${i + 1}@example.com`,
  status: i % 3 === 0 ? 'pending' : 'active',
  lastActivity: i % 3 === 0 ? null : '2024-03-10'
}));

type Props = {
  searchQuery: string;
};

export default function ParentConnectionsTable({ searchQuery }: Props) {
  const filteredConnections = mockConnections.filter(connection => 
    connection.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (connection.parentName?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Parent Connections</h2>
        <p className="text-sm text-gray-600 mt-1">
          {mockConnections.filter(c => c.status === 'pending').length} pending invitations
        </p>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-gray-200">
        {filteredConnections.map((connection, index) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium text-gray-800">{connection.studentName}</h3>
              {connection.parentName ? (
                <div className="text-sm text-gray-600">
                  {connection.parentName} • {connection.email}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No parent connected
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Status */}
              <div className={`px-3 py-1 rounded-full flex items-center gap-1
                ${connection.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {connection.status === 'active' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="text-sm capitalize">{connection.status}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {connection.status === 'pending' && (
                  <button 
                    className="px-3 py-1 bg-purple-600 text-white rounded-lg
                      hover:bg-purple-700 transition-colors flex items-center gap-1"
                    onClick={() => {/* Resend invitation */}}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Invite</span>
                  </button>
                )}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}