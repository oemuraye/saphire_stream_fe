import React, { useContext } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/LoadingSection/Loading";
import axios from "axios";
import { UserProvider } from './contexts/UserContext';


import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Tap from "./components/Tap_homePage/Tap_homePage";
import Ref from "./components/Ref/Ref";
import Task from "./components/Task/Task";
import Boost from "./components/Boost/Boost";
import Stats from "./components/Stats/Stats";
import JoinSocials from "./components/Task/Special_tab/JoinSocials";
import ConnectWallet from "./components/Task/Special_tab/ConnectWallet";
import TrophySection from "./components/Trophy_Section/TrophySection";


const telegram = window.Telegram.WebApp

function App() {
  const [userId, setUserId] = useState('dfe704222354');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);
  const [speedTapping, setSpeedTapping] = useState(false);
  const [fullEnergyLevel, setFullEnergyLevel] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramMiniApp(true);

      // Initialize Telegram WebApp and get user info
      // telegram.ready();
      // const initDataUnsafe = telegram.initDataUnsafe;
      // const user = initDataUnsafe.user;

      // if (user) {
      //   setUserId(user.id);
      // }
    } else {
      setIsTelegramMiniApp(false);
    }
  }, []);

  // useEffect(() => {
  //   if (userId) {
  //     axios.post('https://api.saphirestreamapp.com/api/login', { "telegram_user_id": userId })
  //       .then(response => {
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  // adding back button to telegram default header
  useEffect(() => {
      const backButton = window.Telegram.WebApp.BackButton;

      if (telegram.setHeaderColor) {
        telegram.setHeaderColor('#2f062f');
      }
      
      if (location.pathname === '/join_socials' || location.pathname === '/connect_wallet' || location.pathname === '/trophy') {
        backButton.show();
      } else {
        backButton.hide();
      }
      
      backButton.onClick(() => {
        navigate(-1);
      });

      return () => backButton.offClick();
    }, [location.pathname, navigate]);


    // initialize loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  
  if (isLoading) {
    return <div><Loading /></div>;
  }
  const showFooter = location.pathname !== '/join_socials' && location.pathname !== '/connect_wallet';

  return (
    <UserProvider>
      <section className="app">
        <section className="main_section">
          <section className="main-section">
            {!isTelegramMiniApp && <Header />}
            
            <Routes>
              <Route path="/" element={<Tap speedTapping={speedTapping} setSpeedTapping={setSpeedTapping} fullEnergyLevel={fullEnergyLevel} setFullEnergyLevel={setFullEnergyLevel} />} />
              <Route path="/ref" element={<Ref />} />
              <Route path="/task" element={<Task />} />
              <Route path="/boost" element={<Boost setSpeedTapping={setSpeedTapping} setFullEnergyLevel={setFullEnergyLevel} />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/join_socials" element={<JoinSocials />} />
              <Route path="/connect_wallet" element={<ConnectWallet />} />
              <Route path="/trophy" element={<TrophySection />} />
            </Routes>
          </section>

          {showFooter && (
            <footer className="container">
              <Menu />
            </footer>
          )}
        </section>
      </section>
    </UserProvider>
  );
}

export default App;