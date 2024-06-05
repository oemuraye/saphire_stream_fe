import React, { useContext, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/LoadingSection/Loading";
import axios from "axios";
import UserContext, { UserProvider } from './contexts/UserContext';
import { RemainingPointsProvider, useRemainingPoints } from './contexts/RemainingPointsContext';


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


const telegram = window.Telegram.WebApp;

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [speedTapping, setSpeedTapping] = useState(false);
  const [fullEnergyLevel, setFullEnergyLevel] = useState(false);
  const [points, setPoints] = useState(user.data.coins);
  const [remainingPoints, setRemainingPoints] = useState(() => {
    const savedRemainingPoints = localStorage.getItem('remainingPoints');
    return savedRemainingPoints ? parseInt(savedRemainingPoints, 10) : 500;
  });
  const [guruCount, setGuruCount] = useState(user.data.booster_data?.daily_boosters.tapping_guru);
  const [fullTankCount, setFullTankCount] = useState(user.data.booster_data?.daily_boosters.full_tank);
  const [tapSequence, setTapSequence] = useState(user?.data?.booster_data.tap);

  // useEffect(() => {
  //   setPoints(user.coins);
  // }, [points]);


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramMiniApp(true);

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        setIsMobile(true);
      }

    } else {
      setIsTelegramMiniApp(false);
    }
  }, []);

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

  const showFooter = location.pathname !== '/join_socials' && location.pathname !== '/connect_wallet';
  
  if (isMobile) {
    return <div><Loading /></div>;
  }

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <UserProvider>
      <RemainingPointsProvider>
        <section className="app">
          <section className="main_section">
            <section className="main-section">
              {!isTelegramMiniApp && <Header />}
              
              <Routes>
                <Route path="/" element={<Tap 
                                            points={points} setPoints={setPoints} 
                                            remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints} 
                                            speedTapping={speedTapping} setSpeedTapping={setSpeedTapping} 
                                            fullEnergyLevel={fullEnergyLevel} setFullEnergyLevel={setFullEnergyLevel} 
                                            tapSequence={tapSequence} setTapSequence={setTapSequence}
                                        />} />
                <Route path="/ref" element={<Ref />} />
                <Route path="/task" element={<Task points={points} setPoints={setPoints} />} />
                <Route path="/boost" element={<Boost 
                                                    setTapSequence={setTapSequence}
                                                    points={points} setPoints={setPoints} 
                                                    setSpeedTapping={setSpeedTapping} setFullEnergyLevel={setFullEnergyLevel} 
                                                    guruCount={guruCount} setGuruCount={setGuruCount} 
                                                    fullTankCount={fullTankCount} setFullTankCount={setFullTankCount} 
                                              />} />
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
      </RemainingPointsProvider>
    </UserProvider>
  );
}

export default App;