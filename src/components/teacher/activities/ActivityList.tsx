import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Clock,
  Users,
  Calendar
} from 'lucide-react';
import ActivityCreationModal from './ActivityCreationModal';

type Activity = {
  id: string;
  title: string;
  description: string;
  type: 'discussion' | 'exercise' | 'assessment';
  grade: string;
  duration: string;
  scheduledDate?: string;
  assignedStudents: number;
  status: 'draft' | 'published';
};

type Props = {
  activities: Activity[];
  onCreateActivity: (data: any) => Promise<void>;
  onEditActivity: (id: string, data: any) => Promise<void>;
  onDeleteActivity: (id: string) => Promise<void>;
};

export default function ActivityList({
  activities,
  onCreateActivity,
  onEditActivity,
  onDeleteActivity
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || activity.type === selectedType;
    const matchesGrade = !selectedGrade || activity.grade === selectedGrade;
    return matchesSearch && matchesType && matchesGrade;
  });

  const handleSave = async (data: any) => {
    if (selectedActivity) {
      await onEditActivity(selectedActivity.id, data);
    } else {
      await onCreateActivity(data);
    }
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            {['discussion', 'exercise', 'assessment'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedType === type
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedActivity(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Activity
        </button>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedActivity(activity);
                      setIsModalOpen(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDeleteActivity(activity.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{activity.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{activity.assignedStudents} students</span>
                </div>
                {activity.scheduledDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(activity.scheduledDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full
                  bg-purple-100 text-purple-700">
                  {activity.grade}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full
                  bg-gray-100 text-gray-700">
                  {activity.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${activity.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Creation/Edit Modal */}
      <ActivityCreationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedActivity(null);
        }}
        onSave={handleSave}
        activity={selectedActivity || undefined}
      />
    </div>
  );
}