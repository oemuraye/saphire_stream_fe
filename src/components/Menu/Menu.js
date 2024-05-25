import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import teddyIcon from "../../utils/images/Small Icons/Referral.png";
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import taskIcon from "../../utils/images/Small Icons/Task.png";
import flameIcon from "../../utils/images/Small Icons/Fire.png";
import statsIcon from "../../utils/images/Small Icons/Statistics.png";

import ProgressBar from '../Tap_homePage/ProgressBar/ProgressBar';
import './menu.css'

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className=''>
      {/* {location.pathname === '/' && <ProgressBar />} */}
      <section className='d-flex justify-content-between gap-2 my-2 pb-1'>
        <div role='button' onClick={() => navigate('/ref')} className="tab_box p-2 px-4 rounded-3">
          <img src={teddyIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Ref</span>
        </div>
        <div role='button' onClick={() => navigate('/task')} className="tab_box p-2 px-4 rounded-3">
          <img src={taskIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Task</span>
        </div>
        <div role='button' onClick={() => navigate('/')} className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Tap</span>
        </div>
        <div role='button' onClick={() => navigate('/boost')} className="tab_box p-2 px-4 rounded-3">
          <img src={flameIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Boost</span>
        </div>
        <div role='button' onClick={() => navigate('/stats')} className="tab_box p-2 px-4 rounded-3">
          <img src={statsIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Stats</span>
        </div>
      </section>
    </footer>
  )
}

export default Menu