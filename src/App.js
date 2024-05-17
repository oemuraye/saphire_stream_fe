import { Routes, Route, useLocation } from "react-router-dom";


import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Tap from "./components/Tap_homePage/Tap_homePage";
import Ref from "./components/Ref/Ref";
import Task from "./components/Task/Task";
import Boost from "./components/Boost/Boost";
import Stats from "./components/Stats/Stats";


function App() {
  const location = useLocation();

  return (
    <section className="app">
      <section className="main_section">
        <section>
          <Header />
          
          <Routes>
            <Route path="/" element={<Tap />} />
            <Route path="/ref" element={<Ref />} />
            <Route path="/task" element={<Task />} />
            <Route path="/boost" element={<Boost />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </section>

        <footer className="container">
          {location.pathname !== '/' && <Menu />}
          {location.pathname === '/' && <Menu />}
        </footer>
      </section>
    </section>
  );
}

export default App;