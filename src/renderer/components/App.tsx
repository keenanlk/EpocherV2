import '../index.css';
import { useState, useEffect, useRef } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { parse } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
const App = () => {
  const [isVisible, setIsVisible] = useState(document?.hidden);
  const [date, setDate] = useState(new Date());

  const timeRef = useRef<HTMLInputElement>(null);

  function getLocalTimeString() {
    try {
      return format(date, 'MMMM d, yyyy h:mm:ss a z');
    } catch {
      return '';
    }
  }

  function getUtcTimeString() {
    try {
      const utcDate = utcToZonedTime(date, 'UTC');
      return `${format(utcDate, 'MMMM d, yyyy h:mm:ss a')} UTC`;
    } catch {
      return '';
    }
  }

  function getDateInputFormatted() {
    return format(date, 'yyyy-MM-dd');
  }

  function getTimeInputFormatted() {
    return format(date, 'HH:mm:ss');
  }

  function handleDateSelected(newDate: Date) {
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(date.getSeconds());
    setDate(newDate);
  }

  function handleDateInputChange(value: string) {
    if (!value) return;
    const newDate = parse(value, 'yyyy-MM-dd', new Date());
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(date.getSeconds());
    setDate(newDate);
  }

  function handleTimeInputChange(value: string) {
    if (!value) return;
    const [hours, minutes, seconds] = value.split(':');
    const newDate = new Date(date);
    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));
    newDate.setSeconds(Number(seconds));
    setDate(newDate);
  }

  function dateToSeconds() {
    return Math.floor(date.getTime() / 1000);
  }

  useEffect(() => {
    if (isVisible) {
      setDate(new Date());
    }
  }, [isVisible]);

  const onVisibilityChange = () => {
    const hidden = document?.hidden;
    setIsVisible(hidden);
    timeRef?.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange, false);

    return () => {
      document?.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className='container p-6 overflow-hidden'>
      <h1 className='h1'>Epocher</h1>
      <div>
        <input
          className='input bg-transparent text-foreground epoch-input border border-white p-2 focus:outline-none rounded mt-2'
          data-testId='epoch-input'
          id='time'
          value={dateToSeconds()}
          onChange={(e) => {
            setDate(new Date(Number(e.target.value) * 1000));
          }}
          type='number'
          autoFocus
          ref={timeRef}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div>
        <input
          className='input bg-transparent text-foreground epoch-input p-2 focus:outline-none rounded mt-2 w-full'
          data-testId='localString'
          onClick={(e) => (e.target as HTMLInputElement).select()}
          value={getLocalTimeString()}
          readOnly
        />
        <input
          className='input bg-transparent text-foreground epoch-input  p-2 focus:outline-none rounded w-full'
          data-testId='localString'
          onClick={(e) => (e.target as HTMLInputElement).select()}
          value={getUtcTimeString()}
          readOnly
        />
      </div>
      <div>
        <DayPicker
          className='margin-left-0'
          selected={date}
          mode='single'
          defaultMonth={date}
          onSelect={(e) => handleDateSelected(e || new Date())}
        />
      </div>
      <div className='flex justify-between'>
        <input
          className='input bg-transparent text-foreground epoch-input  p-2 focus:outline-none rounded mt-4 border border-white'
          data-testid='dateInput'
          value={getDateInputFormatted()}
          type='date'
          onChange={(e) => handleDateInputChange(e?.target?.value)}
        />
        <input
          className='input bg-transparent text-foreground epoch-input  p-2 focus:outline-none rounded mt-4 border border-white'
          data-testid='timeINput'
          value={getTimeInputFormatted()}
          type='time'
          onChange={(e) => handleTimeInputChange(e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default App;
