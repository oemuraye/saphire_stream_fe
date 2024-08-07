import React, { useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/LoadingSection/Loading";
import { UserProvider } from './contexts/UserContext';
import { RemainingPointsProvider } from './contexts/RemainingPointsContext';


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
import GeneralTask from './components/Task/Special_tab/GeneralTask';


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
  const [points, setPoints] = useState(user?.data?.coins);

  const [guruCount, setGuruCount] = useState(user?.data?.booster_data?.daily_boosters.tapping_guru);
  const [fullTankCount, setFullTankCount] = useState(user?.data?.booster_data?.daily_boosters.full_tank);
  const [tapSequence, setTapSequence] = useState(Number(user?.data?.booster_data.tap));
  const [energyLevel, setEnergyLevel] = useState(Number(user?.data?.energy));
  const [energyLimit, setEnergyLimit] = useState(Number(user?.data?.booster_data.energy_limit));
  const [tapLevel, setTapLevel] = useState(Number(user?.data?.booster_data.tap_level));
  const [energyLimitLevel, setEnergyLimitLevel] = useState(Number(user?.data?.booster_data.energy_limit_level));
  const [energyRechargeLevel, setEnergyRechargeLevel] = useState(Number(user?.data?.booster_data.energy_recharge_level));
  const [energyRecharge, setEnergyRecharge] = useState(Number(user?.data?.booster_data.energy_recharge));

  const [tapBot, setTapBot] = useState(Number(user?.data?.booster_data.tap_bot));
  const [tapBotCoins, setTapBotCoins] = useState(Number(user?.data?.tap_bot_coins));
  const [tapBotCoinsCount, setTapBotCoinsCount] = useState(0);
  const [isTapBotModalOpen, setIsTapBotModalOpen] = useState(false);
  const tapBotIntervalRef = useRef(null);
  
  const [remainingPoints, setRemainingPoints] = useState(Number(energyLevel));
  const [accumulatedTaps, setAccumulatedTaps] = useState(0);

  const [previousUrl, setPreviousUrl] = useState('/');


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramMiniApp(true);

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        setIsMobile(true);
      }

      if (telegram.isExpanded === false) {
        telegram.expand();
      }

    } else {
      setIsTelegramMiniApp(false);
    }
  }, []);

  // adding back button to telegram default header
  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    const backButton = window.Telegram.WebApp.BackButton;
    const showBackButtonPages = [
      '/join_socials',
      '/connect_wallet',
      '/trophy',
      '/general_task',
    ];

    if (telegram.setHeaderColor) {
      telegram.setHeaderColor('#2f062f');
    }

    const handleBackButtonClick = () => {
      navigate(previousUrl);
    };
    
    if (showBackButtonPages.includes(location.pathname)) {
      backButton.show();
    } else {
      backButton.hide();
    }
    
    telegram.onEvent('backButtonClicked', handleBackButtonClick)


    return () => backButton.offClick();
  }, [location.pathname, navigate]);

  useEffect(() => {
    setPreviousUrl(location.pathname);
  }, [location.pathname]);


    // initialize loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // TapBot auto tapping
  useEffect(() => {
    if (tapBotCoins > 0) {
      setIsTapBotModalOpen(true);
    }
  }, [])

  useEffect(() => {
    if (tapBot === 1) {
      tapBotIntervalRef.current = setInterval(() => {
        setPoints(prevPoints => {
          const newPoints = prevPoints + 3;
          localStorage.setItem('points', newPoints);
          return newPoints;
        });
        setTapBotCoinsCount(prevCoins => prevCoins + 3);
      }, 1000);
    }

    return () => {
      if (tapBotIntervalRef.current) {
        clearInterval(tapBotIntervalRef.current);
      }
    };
  }, [tapBot]);

  useEffect(() => {
    return () => {
      if (tapBotIntervalRef.current) {
        clearInterval(tapBotIntervalRef.current);
      }
    };
  }, []);
  

  const showFooter = location.pathname !== '/general_task' && location.pathname !== '/join_socials' && location.pathname !== '/connect_wallet';
  
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
              {/* {isTelegramMiniApp && <Header />} */}
              {!isTelegramMiniApp && <Header />}
              
              <Routes>
                <Route path="/" element={<Tap 
                                            points={points} setPoints={setPoints} 
                                            remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints} 
                                            speedTapping={speedTapping} setSpeedTapping={setSpeedTapping} 
                                            fullEnergyLevel={fullEnergyLevel} setFullEnergyLevel={setFullEnergyLevel} 
                                            tapSequence={tapSequence} setTapSequence={setTapSequence}
                                            energyLevel={energyLevel} setEnergyLevel={setEnergyLevel}
                                            energyLimit={energyLimit} setEnergyLimit={setEnergyLimit}
                                            accumulatedTaps={accumulatedTaps} setAccumulatedTaps={setAccumulatedTaps}
                                            energyRecharge={energyRecharge} setEnergyRecharge={setEnergyRecharge}
                                            tapBotCoinsCount={tapBotCoinsCount} setTapBotCoinsCount={setTapBotCoinsCount}
                                            tapBotCoins={tapBotCoins} setTapBotCoins={setTapBotCoins}
                                            tapBot={tapBot} setTapBot={setTapBot}
                                            isTapBotModalOpen={isTapBotModalOpen} setIsTapBotModalOpen={setIsTapBotModalOpen}
                                        />} />
                <Route path="/ref" element={<Ref />} />
                <Route path="/task" element={<Task points={points} setPoints={setPoints} />} />
                <Route path="/boost" element={<Boost 
                                                    setTapSequence={setTapSequence}
                                                    points={points} setPoints={setPoints} 
                                                    setSpeedTapping={setSpeedTapping} setFullEnergyLevel={setFullEnergyLevel} 
                                                    guruCount={guruCount} setGuruCount={setGuruCount} 
                                                    fullTankCount={fullTankCount} setFullTankCount={setFullTankCount} 
                                                    tapLevel={tapLevel} setTapLevel={setTapLevel} 
                                                    setEnergyLevel={setEnergyLevel}
                                                    setEnergyRecharge={setEnergyRecharge}
                                                    energyLimitLevel={energyLimitLevel} setEnergyLimitLevel={setEnergyLimitLevel} 
                                                    energyRechargeLevel={energyRechargeLevel} setEnergyRechargeLevel={setEnergyRechargeLevel} 
                                                    tapBot={tapBot} setTapBot={setTapBot}
                                                    tapBotCoins={tapBotCoins} setTapBotCoins={setTapBotCoins}
                                                    accumulatedTaps={accumulatedTaps} setAccumulatedTaps={setAccumulatedTaps} 
                                              />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/join_socials" element={<JoinSocials setPoints={setPoints} />} />
                <Route path="/connect_wallet" element={<ConnectWallet setPoints={setPoints} />} />
                <Route path="/general_task" element={<GeneralTask setPoints={setPoints} />} />
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