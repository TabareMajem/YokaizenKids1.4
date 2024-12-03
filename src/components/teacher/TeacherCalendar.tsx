import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useSchedule } from '../../hooks/useSchedule';
import { useThematicPaths } from '../../hooks/useThematicPaths';
import EventModal from './EventModal';
import type { ThematicPath } from '../../types/thematicPath';

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  thematicPathId?: string;
  classId?: string;
  type: 'thematic-path' | 'activity' | 'assessment';
  backgroundColor?: string;
  grade?: string;
};

export default function TeacherCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { getClassSchedule, createScheduleEvent, updateScheduleEvent, deleteScheduleEvent } = useSchedule();
  const { getPaths } = useThematicPaths();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      // Load class schedule
      const classId = localStorage.getItem('currentClassId');
      if (!classId) return;

      const [schedule, thematicPaths] = await Promise.all([
        getClassSchedule(classId, new Date(), new Date()),
        getPaths()
      ]);

      // Format regular schedule events
      const scheduleEvents = schedule.map(event => ({
        id: event.id,
        title: event.title,
        start: event.startTime,
        end: event.endTime,
        type: event.activityType,
        grade: event.grade,
        backgroundColor: getEventColor(event.activityType)
      }));

      // Format thematic path events
      const pathEvents = thematicPaths
        .filter(path => path.startDate && path.endDate)
        .map(path => ({
          id: `path-${path.id}`,
          title: `${path.name} (${path.grade})`,
          start: path.startDate,
          end: path.endDate,
          type: 'thematic-path' as const,
          thematicPathId: path.id,
          grade: path.grade,
          backgroundColor: getEventColor('thematic-path')
        }));

      setEvents([...scheduleEvents, ...pathEvents]);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const getEventColor = (type: string): string => {
    switch (type) {
      case 'thematic-path':
        return '#8B5CF6'; // Purple
      case 'activity':
        return '#EC4899'; // Pink
      case 'assessment':
        return '#10B981'; // Green
      default:
        return '#6B7280'; // Gray
    }
  };

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setShowEventModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start.toISOString(),
      end: clickInfo.event.end?.toISOString() || clickInfo.event.start.toISOString(),
      type: clickInfo.event.extendedProps.type,
      thematicPathId: clickInfo.event.extendedProps.thematicPathId,
      grade: clickInfo.event.extendedProps.grade,
      backgroundColor: clickInfo.event.backgroundColor
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = async (eventData: any) => {
    try {
      const classId = localStorage.getItem('currentClassId');
      if (!classId) return;

      if (selectedEvent) {
        await updateScheduleEvent(classId, selectedEvent.id, eventData);
      } else {
        await createScheduleEvent(classId, eventData);
      }

      await loadEvents();
      setShowEventModal(false);
      setSelectedEvent(null);
      setSelectedDate(null);
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (!selectedEvent) return;
      const classId = localStorage.getItem('currentClassId');
      if (!classId) return;

      await deleteScheduleEvent(classId, selectedEvent.id);
      await loadEvents();
      setShowEventModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Class Schedule</h2>
        <button
          onClick={() => setShowEventModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="h-[600px]">
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
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="100%"
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
        />
      </div>

      <EventModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
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