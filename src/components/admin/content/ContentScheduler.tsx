import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Plus, X } from 'lucide-react';

type ScheduledContent = {
  id: string;
  title: string;
  publishAt: Date;
  timezone: string;
  status: 'scheduled' | 'published' | 'failed';
};

type Props = {
  content: {
    id: string;
    title: string;
  };
  scheduledContent: ScheduledContent[];
  onSchedule: (date: Date, timezone: string) => void;
  onCancel: (scheduleId: string) => void;
};

export default function ContentScheduler({ 
  content, 
  scheduledContent,
  onSchedule,
  onCancel
}: Props) {
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleSchedule = () => {
    if (!publishDate || !publishTime) return;
    
    const date = new Date(`${publishDate}T${publishTime}`);
    onSchedule(date, timezone);
    setPublishDate('');
    setPublishTime('');
  };

  return (
    <div className="space-y-6">
      {/* Schedule New */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Schedule Publication
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 w-5 h-5" />
              <input
                type="time"
                value={publishTime}
                onChange={(e) => setPublishTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              {Intl.supportedValuesOf('timeZone').map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSchedule}
          disabled={!publishDate || !publishTime}
          className="w-full py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Schedule Publication
        </button>
      </div>

      {/* Scheduled Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Scheduled Publications
        </h3>
        <div className="space-y-4">
          {scheduledContent.map((schedule) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{schedule.title}</h4>
                <button
                  onClick={() => onCancel(schedule.id)}
                  className="p-1 hover:bg-red-50 rounded-lg 
                    text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(schedule.publishAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(schedule.publishAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{schedule.timezone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}