import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [boosters, setBoosters] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const telegram = window.Telegram.WebApp;
      if (telegram && telegram.initDataUnsafe) {
        // const initDataUnsafe = telegram.initDataUnsafe;
        // const userId = initDataUnsafe.user;
        const userId = "ihj704222354";

        try {
          // Fetch user data
          const userResponse = await axios.post('https://api.saphirestreamapp.com/api/login', { telegram_user_id: userId });
          const token = userResponse.data.token;
          const points = userResponse.data.data.coins;
          localStorage.setItem('profile', JSON.stringify({ access_token: token }));
          localStorage.setItem('points', points);          setUser(userResponse.data);

          // Fetch boosters data
          const boostersResponse = await API.get('/boosters');
          setBoosters(boostersResponse.data);

          // Fetch tasks data
          const getTasksResponse = await API.get('/tasks');
          setTasks(getTasksResponse.data);

          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };


    fetchUserAndData();
  }, []);

  // New useEffect to update token in local storage if it changes
  useEffect(() => {
    if (user && user.token) {
      const storedProfile = JSON.parse(localStorage.getItem('profile'));
      if (!storedProfile || storedProfile.access_token !== user.token) {
        localStorage.setItem('profile', JSON.stringify({ access_token: user.token }));
      }
    }
  }, [user]);

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
    <UserContext.Provider value={{ user, boosters, tasks, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
