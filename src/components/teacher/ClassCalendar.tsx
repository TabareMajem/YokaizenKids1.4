```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';
import { useSchedule } from '../../hooks/useSchedule';
import ScheduleEventModal from './ScheduleEventModal';
import type { ClassSchedule } from '../../types/teacher';

type Props = {
  classId: string;
  thematicPaths?: Array<{
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
  }>;
};

export default function ClassCalendar({ classId, thematicPaths = [] }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ClassSchedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    createScheduleEvent,
    updateScheduleEvent,
    deleteScheduleEvent,
    isLoading,
    error 
  } = useSchedule();

  // Convert thematic paths to calendar events
  const thematicPathEvents = thematicPaths.map(path => ({
    id: path.id,
    title: `Path: ${path.name}`,
    start: path.startDate,
    end: path.endDate,
    backgroundColor: '#8b5cf6',
    borderColor: '#7c3aed',
    classNames: ['thematic-path-event']
  }));

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps as ClassSchedule);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData: Partial<ClassSchedule>) => {
    try {
      if (selectedEvent) {
        await updateScheduleEvent(classId, selectedEvent.id, eventData);
      } else {
        await createScheduleEvent(classId, eventData);
      }
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedDate(null);
    } catch (err) {
      console.error('Failed to save event:', err);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteScheduleEvent(classId, selectedEvent.id);
      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Class Schedule</h3>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Calendar */}
      <div className={`transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={false}
          events={thematicPathEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
        />
      </div>

      {/* Event Modal */}
      <ScheduleEventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
```