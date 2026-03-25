import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScheduleMeetingPage.css';
import { MeetingContext } from '../providers/MeetingContext';

function ScheduleMeetingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const creator = location.state?.creator;

  const { addAppointment } = useContext(MeetingContext);

  const [isRepeating, setIsRepeating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [repeatDay, setRepeatDay] = useState("Friday");

  const availableDates = [
    { date: '2024-11-08', times: ['11:30 am', '12:00 pm', '2:45 pm', '4:00 pm'] },
    { date: '2024-11-10', times: ['9:00 am', '10:30 am', '1:00 pm', '3:15 pm'] },
    { date: '2024-11-12', times: ['8:00 am', '11:00 am', '1:30 pm', '5:00 pm'] },
    { date: '2024-11-15', times: ['9:30 am', '12:00 pm', '2:00 pm', '4:30 pm'] },
    { date: '2024-11-18', times: ['10:00 am', '12:30 pm', '3:00 pm', '6:00 pm'] },
    { date: '2024-11-20', times: ['9:00 am', '11:30 am', '1:15 pm', '4:45 pm'] },
    { date: '2024-11-22', times: ['8:15 am', '10:45 am', '2:00 pm', '5:30 pm'] },
    { date: '2024-11-25', times: ['9:00 am', '12:30 pm', '3:45 pm', '6:15 pm'] },
    { date: '2024-11-28', times: ['8:00 am', '10:15 am', '2:30 pm', '5:00 pm'] },
    { date: '2024-11-30', times: ['9:30 am', '12:00 pm', '2:45 pm', '4:30 pm'] },
    { date: '2024-12-02', times: ['10:00 am', '1:00 pm', '3:30 pm', '6:00 pm'] },
    { date: '2024-12-05', times: ['8:30 am', '11:00 am', '1:45 pm', '5:15 pm'] },
    { date: '2024-12-08', times: ['9:00 am', '11:30 am', '2:15 pm', '4:45 pm'] },
    { date: '2024-12-10', times: ['10:00 am', '12:30 pm', '3:15 pm', '6:30 pm'] },
    { date: '2024-12-12', times: ['8:15 am', '10:45 am', '2:00 pm', '5:45 pm'] },
    { date: '2024-12-15', times: ['9:30 am', '11:00 am', '1:30 pm', '4:15 pm'] },
    { date: '2024-12-18', times: ['9:00 am', '12:00 pm', '2:45 pm', '5:30 pm'] },
    { date: '2024-12-20', times: ['10:30 am', '1:00 pm', '3:45 pm', '6:15 pm'] },
    { date: '2024-12-22', times: ['8:00 am', '10:15 am', '1:45 pm', '5:00 pm'] },
    { date: '2024-12-25', times: ['9:00 am', '11:30 am', '2:30 pm', '4:45 pm'] },
    { date: '2024-12-28', times: ['10:00 am', '12:45 pm', '3:15 pm', '6:00 pm'] },
    { date: '2024-12-30', times: ['8:30 am', '11:15 am', '1:45 pm', '5:15 pm'] }
  ];
  

  // Standardize day names here to match the `daysOfWeek` format
  const availableTimesForRepeating = [
    { day: 'Friday', times: ['11:30 am', '7:00 pm'] },
    { day: 'Monday', times: ['10:00 am', '3:00 pm'] },
    { day: 'Wednesday', times: ['9:00 am', '1:30 pm', '5:00 pm'] },
    // Add more as needed for testing
  ];

  const today = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };


  const handleRequestMeeting = () => {
    if (!selectedTime) {
      return;
    }

    if (isRepeating) {
      const newAppointment = {
        name: creator.name,
        date: `Repeats every week on ${repeatDay}`,
        time: selectedTime,
        status: 'PENDING',
      };

      addAppointment(newAppointment);

      navigate('/meeting-request-submitted', {
        state: {
          ...newAppointment,
          isRepeating: true,
          repeatFrequency: 'week',
          repeatDay,
        },
      });
    } else {
      if (!selectedDate) return;

      const selectedDateObj = new Date(selectedDate + 'T00:00');
      const formattedDate = selectedDateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const newAppointment = {
        name: creator.name,
        date: formattedDate,
        time: selectedTime,
        status: 'PENDING',
      };

      addAppointment(newAppointment);

      navigate('/meeting-request-submitted', { state: newAppointment });
    }
  };

  const generateCalendarDates = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

    // Get the weekday index (0-6) of the first day of the month
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    // Add blank spaces for days of the previous month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`blank-${i}`} className="calendar-blank"></div>);
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = date.toISOString().split('T')[0];

      // Check if the date is before today to disable past dates
      const isPastDate = date < today;
      const isSelected = selectedDate === dateString;

      days.push(
        <button
          key={dateString}
          onClick={() => handleDateClick(dateString)}
          className={`date ${isSelected ? 'selected' : ''} ${isPastDate ? 'disabled' : ''}`}
          disabled={isPastDate}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const selectedDateData = availableDates.find((d) => d.date === selectedDate);
  const availableTimes = selectedDateData ? selectedDateData.times : [];

  const repeatAvailableTimes = availableTimesForRepeating.find((d) => d.day === repeatDay)?.times || [];

  if (!creator) {
    return <div className="schedule-missing">Select a creator before planning the collaboration.</div>;
  }

  return (
    <div className="schedule-meeting-container">
      <header className="schedule-header">
        <span className="eyebrow">Collaboration kickoff</span>
        <h2>Plan your session with {creator.name}</h2>
        <p>Choose a time for your creative briefing or set up a recurring check-in cadence.</p>
      </header>

      <div className="repeating-option">
        <span>Set as repeating touchpoint?</span>
        <button onClick={() => setIsRepeating(true)} className={isRepeating ? 'selected' : ''}>Yes</button>
        <button onClick={() => setIsRepeating(false)} className={!isRepeating ? 'selected' : ''}>No</button>
      </div>

      {/* Repeating Meeting Options */}
      {isRepeating && (
        <div className="repeating-options">
          <label>Repeating every week on:</label>
          <div className="repeat-days">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setRepeatDay(day)}
                className={`repeat-day-button ${repeatDay === day ? 'selected' : ''}`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="time-slots">
            <h3>Creator availability on {repeatDay}:</h3>
            {repeatAvailableTimes.length > 0 ? (
              repeatAvailableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`time ${selectedTime === time ? 'selected' : ''}`}
                >
                  {time}
                </button>
              ))
            ) : (
              <p className="no-timeslots">No timeslots available for this day</p>
            )}
          </div>
        </div>
      )}

      {/* Calendar and Timeslot Selection for One-Time Meetings */}
      {!isRepeating && (
        <>
          <div className="calendar">
            <div className="calendar-navigation">
              <button onClick={handlePreviousMonth}>&lt;</button>
              <div className="calendar-header">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>

            {/* Days of the Week Header */}
            <div className="calendar-days">
              {daysOfWeek.map((day) => (
                <div key={day} className="calendar-day">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Dates */}
            <div className="calendar-grid">
              {generateCalendarDates()}
            </div>
          </div>

          {selectedDate && (
            <div className="time-slots">
              <h3>Times on {selectedDate}:</h3>
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={selectedTime === time ? 'time selected' : 'time'}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="no-timeslots">No timeslots available for this day</p>
              )}
            </div>
          )}
        </>
      )}

      <button
        onClick={handleRequestMeeting}
        disabled={!selectedTime}
        className="request-meeting-button"
      >
        Send {isRepeating ? 'recurring' : 'one-time'} collab request
      </button>
    </div>
  );
}

export default ScheduleMeetingPage;
