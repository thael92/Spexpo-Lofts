import React, { useState, useEffect } from 'react';
import { fetchICalEvents, CalendarEvent } from '../services/icalService';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { ptBR, es, enUS } from 'date-fns/locale';
import { useLanguage } from '../contexts/LanguageContext';
import './AvailabilityCalendar.css';

// Registrar os locales
registerLocale('pt', ptBR);
registerLocale('es', es);
registerLocale('en', enUS);

interface AvailabilityCalendarProps {
  icalUrl?: string;
  onRangeChange: (startDate: string, endDate: string) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ icalUrl, onRangeChange }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (icalUrl) {
      fetchICalEvents(icalUrl).then(fetchedEvents => {
        setEvents(fetchedEvents);
        const blockedDates = fetchedEvents.flatMap(event => {
          const dates: Date[] = [];
          let currentDate = new Date(event.startDate);
          // Simple block logic: include every day between start and end
          while (currentDate <= event.endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        });
        setExcludedDates(blockedDates);
      });
    }
  }, [icalUrl]);

  useEffect(() => {
    if (startDate && endDate) {
      onRangeChange(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
    } else {
      onRangeChange('', '');
    }
  }, [startDate, endDate, onRangeChange]);

  const filterPassedDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() >= today.getTime();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Calendar size={16} /> {t('prop.reserve')}
      </h3>
      <DatePicker
        selected={startDate}
        onChange={(dates: [Date | null, Date | null]) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate}
        endDate={endDate}
        excludeDates={excludedDates}
        filterDate={filterPassedDays}
        selectsRange
        inline
        monthsShown={1}
        className="w-full"
        dayClassName={() => "rounded-full hover:bg-red-100 text-sm"}
        popperPlacement="bottom-start"
        calendarClassName="border-0 shadow-none"
        dateFormat="dd/MM/yyyy"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        locale={language}
      />
    </div>
  );
};