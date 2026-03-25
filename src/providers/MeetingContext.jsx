import React, { createContext, useState } from "react";

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([
    {
      name: 'Luna Bloom Beauty',
      date: 'Nov 18',
      time: '2:00 PM',
      status: 'CONFIRMED',
      zoomLink: '/virtual-session',
    },
    {
      name: 'Velvet Petal Boutique',
      date: 'Repeats every Tuesday',
      time: '10:30 AM',
      status: 'PLANNING',
      zoomLink: '/virtual-session',
    },

    {
      name: 'Orchid Atelier Events',
      date: 'Dec 02',
      time: '4:00 PM',
      status: 'PENDING',
      zoomLink: '/virtual-session',
    },
  ]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <MeetingContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </MeetingContext.Provider>
  );
};
