import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;

    if (telegram && telegram.initDataUnsafe) {
    //   const userId = telegram.initDataUnsafe.user.id;
      const userId = "abc704222354";

      axios.post('https://api.saphirestreamapp.com/api/login', { "telegram_user_id": userId })
        .then(response => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, []);

  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      data: {
        ...prevUser.data,
        ...updatedData
      }
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
