import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bike, setBike] = useState(() => {
    const saved = localStorage.getItem('motocare_bike');
    return saved ? JSON.parse(saved) : null;
  });
  const [serviceType, setServiceType] = useState(() => localStorage.getItem('motocare_serviceType'));
  const [serviceDetails, setServiceDetails] = useState(() => {
    const saved = localStorage.getItem('motocare_serviceDetails');
    return saved ? JSON.parse(saved) : {};
  });
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('motocare_location');
    return saved ? JSON.parse(saved) : null;
  });
  const [date, setDate] = useState(() => localStorage.getItem('motocare_date'));
  const [time, setTime] = useState(() => localStorage.getItem('motocare_time'));
  const [cost, setCost] = useState(() => Number(localStorage.getItem('motocare_cost')) || 0);

  // Sync with localStorage
  React.useEffect(() => {
    if (bike) localStorage.setItem('motocare_bike', JSON.stringify(bike));
    else localStorage.removeItem('motocare_bike');
  }, [bike]);

  React.useEffect(() => {
    if (serviceType) localStorage.setItem('motocare_serviceType', serviceType);
    else localStorage.removeItem('motocare_serviceType');
  }, [serviceType]);

  React.useEffect(() => {
    localStorage.setItem('motocare_serviceDetails', JSON.stringify(serviceDetails));
  }, [serviceDetails]);

  React.useEffect(() => {
    if (location) localStorage.setItem('motocare_location', JSON.stringify(location));
    else localStorage.removeItem('motocare_location');
  }, [location]);

  React.useEffect(() => {
    if (date) localStorage.setItem('motocare_date', date);
    else localStorage.removeItem('motocare_date');
  }, [date]);

  React.useEffect(() => {
    if (time) localStorage.setItem('motocare_time', time);
    else localStorage.removeItem('motocare_time');
  }, [time]);

  React.useEffect(() => {
    localStorage.setItem('motocare_cost', cost.toString());
  }, [cost]);

  const clearServiceDetails = () => {
    setServiceType(null);
    setServiceDetails({});
    setLocation(null);
    setDate(null);
    setTime(null);
    setCost(0);
  };

  const resetBooking = () => {
    setBike(null);
    clearServiceDetails();
  };

  return (
    <BookingContext.Provider
      value={{
        bike,
        setBike,
        serviceType,
        setServiceType,
        serviceDetails,
        setServiceDetails,
        location,
        setLocation,
        date,
        setDate,
        time,
        setTime,
        cost,
        setCost,
        resetBooking,
        clearServiceDetails,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
