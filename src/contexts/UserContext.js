import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [boosters, setBoosters] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [userInfo, setUserInfo] = useState(null);

  const parseTelegramInitData = (initData) => {
    if (!initData) return null;

      // Convert URL encoded string to object
      const params = new URLSearchParams(initData);
      
      // Extract user data as JSON
      const userData = params.get('user');
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
  };

  useEffect(() => {
    const fetchUserAndData = async () => {
      const telegram = window.Telegram.WebApp;
      if (telegram && telegram.initData) {
        const initData = telegram.initData;
        // const userId = initData.user;
        // const userInfo = parseTelegramInitData(initData);
        // let referralID
        // alert(initData.user.id)
        const userId = "dxz704222354";

      try {
        // Fetch user data
          const userResponse = await axios.post('https://api.saphirestreamapp.com/api/login', { telegram_user_id: userId });
          
          //  const userResponse = await axios.post('https://api.saphirestreamapp.com/api/login', 
          //   { 
          //     telegram_user_id: userInfo?.id,  
          //     username: userInfo?.username,
          //     first_name: userInfo?.first_name,
          //     last_name: userInfo?.last_name,
          //     referred_by: referralID !== undefined ? referralID : null,
          //   }
          // );
          
          const newUser = userResponse.data;
          const token = userResponse.data.token;
          const points = userResponse.data.data.coins;


           const storedUser = localStorage.getItem('user');
           const storedUserId = storedUser.data.telegram_user_id;

           if (storedUserId !== userId) {
             localStorage.clear();
           }

          localStorage.setItem('user', JSON.stringify(newUser));
          localStorage.setItem('profile', JSON.stringify({ access_token: token }));
          localStorage.setItem('points', points);          
          setUser(userResponse.data);

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

  const updateBoosters = async () => {
    try {
      const boostersResponse = await API.get('/boosters');
      const userResponse = await API.get('/user');
      setBoosters(boostersResponse.data);
      setUser(userResponse.data)
      console.log(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = (updatedData) => {
    if (!user) {
      console.error("User is null");
      return;
    }

    const updatedUser = {
      ...user,
      data: {
        ...user.data,
        ...updatedData,
      },
    };

    // console.log("Original User:", user);
    // console.log("Updated Data:", updatedData);
    // console.log("Updated User:", updatedUser);

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateUserCoins = (newPoints) => {
    const updatedUser = {
      ...user,
      data: {
        ...user.data,
        coins: newPoints,
      },
    };
    setUser(updatedUser);
    // localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log(newPoints);
    // localStorage.setItem('points', newPoints); // Update the points in local storage
  };


  const actionsTitle = {
    tappingGuru: 'tapping_guru',
    fullTank: 'full_tank',
    multiTap: 'tap_level',
    energyLimit: 'energy_limit_level',
    rechargeSpeed: 'energy_recharge_level',
    tapBot: 'tap_bot',

}

  const handleBoosterUpdate = (boosterType) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const updatedBoosterData = { ...storedUser.booster_data };
console.log(storedUser);
    if (boosterType === 'tapping_guru') {
      storedUser.daily_booster.tapping_guru -= 1;
    } else if (boosterType === 'full_tank') {
      console.log(storedUser.daily_boosters.fullTank);
      storedUser.daily_booster.full_tank -= 1;
    } else if (boosterType === 'tap_level') {
      storedUser.tap_level += 1;
    } else if (boosterType === 'energy_limit_level') {
      storedUser.energy_limit_level += 1;
    } else if (boosterType === 'energy_recharge_level') {
      storedUser.energy_recharge_level += 1;
    } else if (boosterType === 'tap_bot') {
      storedUser.tap_bot += 1;
    }

    updateUser({ booster_data: updatedBoosterData });
  };

  return (
    <UserContext.Provider value={{ user, boosters, tasks, updateUser, updateBoosters, handleBoosterUpdate, updateUserCoins, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
