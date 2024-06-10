import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const RemainingPointsContext = createContext();

export const RemainingPointsProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [remainingPoints, setRemainingPoints] = useState(user?.data?.energy);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (remainingPoints < user?.data.booster_data.energy_limit_level) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => {
          const newRemainingPoints = Math.min(prev + 1, Number(user.data.booster_data.energy_limit_level));
          localStorage.setItem('remainingPoints', newRemainingPoints);
          return newRemainingPoints;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (remainingPoints < user?.data?.booster_data.energy_limit_level) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => {
          const newRemainingPoints = Math.min(prev + 1, Number(user?.data?.booster_data.energy_limit_level));
          localStorage.setItem('remainingPoints', newRemainingPoints);
          return newRemainingPoints;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [remainingPoints]);

  return (
    <RemainingPointsContext.Provider value={{ remainingPoints, setRemainingPoints }}>
      {children}
    </RemainingPointsContext.Provider>
  );
};

export const useRemainingPoints = () => useContext(RemainingPointsContext);
