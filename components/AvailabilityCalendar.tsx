import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface AvailabilityCalendarProps {
  onRangeChange: (start: string, end: string) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ onRangeChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [busyDates, setBusyDates] = useState<Set<string>>(new Set());

  // Simulate fetching iCal data and parsing it into blocked dates
  useEffect(() => {
    const mockBusyDates = new Set<string>();
    const today = new Date();
    
    // Create some fake bookings for simulation
    // Booking 1: 5 days starting 3 days from now
    for(let i = 3; i < 8; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        mockBusyDates.add(d.toDateString());
    }
    
    // Booking 2: 4 days starting 15 days from now
    for(let i = 15; i < 19; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        mockBusyDates.add(d.toDateString());
    }

    setBusyDates(mockBusyDates);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Prevent selecting past dates or busy dates
    if (clickedDate < new Date(new Date().setHours(0,0,0,0))) return;
    if (busyDates.has(clickedDate.toDateString())) return;

    if (!startDate || (startDate && endDate) || clickedDate < startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
      onRangeChange(clickedDate.toISOString(), '');
    } else {
      // Check if range includes busy dates
      let isValidRange = true;
      let d = new Date(startDate);
      while (d <= clickedDate) {
        if (busyDates.has(d.toDateString())) {
          isValidRange = false;
          break;
        }
        d.setDate(d.getDate() + 1);
      }

      if (isValidRange) {
        setEndDate(clickedDate);
        onRangeChange(startDate.toISOString(), clickedDate.toISOString());
      } else {
        alert("O período selecionado inclui datas indisponíveis.");
        setStartDate(clickedDate);
        setEndDate(null);
        onRangeChange(clickedDate.toISOString(), '');
      }
    }
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const days = [];

    // Empty slots for days before start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isBusy = busyDates.has(dateObj.toDateString());
      const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
      const isDisabled = isBusy || isPast;

      let isSelected = false;
      let inRange = false;

      if (startDate && dateObj.toDateString() === startDate.toDateString()) isSelected = true;
      if (endDate && dateObj.toDateString() === endDate.toDateString()) isSelected = true;
      if (startDate && endDate && dateObj > startDate && dateObj < endDate) inRange = true;

      days.push(
        <button
          key={day}
          disabled={isDisabled}
          onClick={() => handleDateClick(day)}
          className={`
            h-9 w-9 text-sm rounded-full flex items-center justify-center transition-all relative
            ${isDisabled ? 'text-gray-300 cursor-not-allowed decoration-slice' : 'hover:bg-red-50 hover:text-brand-red font-medium text-gray-700'}
            ${isBusy ? 'bg-gray-100 text-gray-300 line-through' : ''}
            ${isSelected ? 'bg-brand-red text-white hover:bg-red-700 shadow-md z-10' : ''}
            ${inRange ? 'bg-red-50 text-brand-red rounded-none w-full mx-[-4px]' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <CalendarIcon size={18} className="text-brand-red" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={20}/></button>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
            <span key={d} className="text-xs font-bold text-gray-400">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 place-items-center">
        {renderDays()}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div> Disponível</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center text-[8px] font-bold line-through decoration-gray-400">X</div> Ocupado</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-brand-red"></div> Selecionado</div>
      </div>
    </div>
  );
};
