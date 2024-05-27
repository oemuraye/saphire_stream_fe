import { Routes, Route, useLocation } from "react-router-dom";


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


const telegram = window.Telegram.WebApp

function App() {
  const location = useLocation();
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramMiniApp(true);
    } else {
      setIsTelegramMiniApp(false);
    }
  }, []);

  console.log(isTelegramMiniApp);

  useEffect(() => {
    telegram.ready();

    if (telegram.setHeaderColor) {
      telegram.setHeaderColor('#2f062f');
    }

    // Customize the header
    if (location.pathname === '/join_socials' || location.pathname === '/connect_wallet' || location.pathname === '/trophy') {
      telegram.BackButton.show();
    } else {
      telegram.BackButton.hide();
    }


  }, [location.pathname]);
  

  const showFooter = location.pathname !== '/join_socials' && location.pathname !== '/connect_wallet';

  return (
    <section className="app">
      <section className="main_section">
        <section className="main-section">
          {isTelegramMiniApp && <Header />}
          
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