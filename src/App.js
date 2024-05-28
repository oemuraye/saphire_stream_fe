import { Routes, Route, useLocation, useNavigate } from "react-router-dom";


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
import { useEffect, useState } from "react";
import Loading from "./components/LoadingSection/Loading";


const telegram = window.Telegram.WebApp

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramMiniApp(true);

      // Initialize Telegram WebApp and get user info
      telegram.ready();
      const initDataUnsafe = telegram.initDataUnsafe;
      const user = initDataUnsafe.user;

      if (user) {
        setUserId(user.username);
        alert(user); // For debugging purposes
      }
    } else {
      setIsTelegramMiniApp(false);
    }
  }, []);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const showFooter = location.pathname !== '/join_socials' && location.pathname !== '/connect_wallet';

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <section className="app">
      <section className="main_section">
        <section className="main-section">
          {!isTelegramMiniApp && <Header />}
          {userId && <h31>{userId}</h31>}
          
          <Routes>
            <Route path="/" element={<Tap />} />
            <Route path="/ref" element={<Ref />} />
            <Route path="/task" element={<Task />} />
            <Route path="/boost" element={<Boost />} />
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
  );
}

export default App;