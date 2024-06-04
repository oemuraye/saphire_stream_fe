import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const RemainingPointsContext = createContext();

export const RemainingPointsProvider = ({ children }) => {
  const [remainingPoints, setRemainingPoints] = useState(() => {
    const savedRemainingPoints = localStorage.getItem('remainingPoints');
    return savedRemainingPoints ? parseInt(savedRemainingPoints, 10) : 500;
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (remainingPoints < 500) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => {
          const newRemainingPoints = Math.min(prev + 1, 500);
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
