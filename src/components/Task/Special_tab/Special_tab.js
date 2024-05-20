import React from 'react'

import taskIcon from '../../../utils/images/task.png';
import coinIcon from '../../../utils/images/goldCoin.png';

import './special_tabs.css';
import { useNavigate } from 'react-router-dom';

const Special_tab = () => {
  const navigate = useNavigate();

  const goToJoinSocialPage = () => {
    navigate(`/join_socials`);
  }
  const goToConnectWallet = () => {
    navigate(`/connect_wallet`);
  }
  
  return (
    <section className='special-tab_section d-flex flex-column gap-2 text-white'>
      <section onClick={goToJoinSocialPage} role='button' className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
        <div className='d-flex gap-2 align-items-center'>
          <img src={taskIcon} alt="taskIcon" width="70px" height="75px" />
          <div className="d-flex flex-column">
            <h6>Join Our Socials</h6>
            <div className='d-flex align-items-center gap-1'>
              <img src={coinIcon} alt="coin-icon" width="20px" />
              <span>200000</span>
            </div>
          </div>
        </div>
        <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
      </section>

      <section onClick={goToConnectWallet} role='button' className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
        <div className='d-flex gap-2 align-items-center'>
          <img src={taskIcon} alt="taskIcon" width="70px" height="75px" />
          <div className="d-flex flex-column">
            <h6>Connect Solana Wallet</h6>
            <div className='d-flex align-items-center gap-1'>
              <img src={coinIcon} alt="coin-icon" width="20px" />
              <span>100000</span>
            </div>
          </div>
        </div>
        <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
      </section>
    </section>
  )
}

export default Special_tab;