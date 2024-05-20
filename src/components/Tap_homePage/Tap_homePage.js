import React from 'react'

import TapCoin from './TapCoin/TapCoin';
import Menu from '../Menu/Menu';

import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/goldCoin.png";

import ProgressBar from './ProgressBar/ProgressBar';
import './tap.css'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Tap_homePage = () => {
  const navigate = useNavigate();

  const goToTrophyPage = () => {
    navigate(`/trophy`);
  }
  return (
    <>
      {/* <section>
        <Header />
      </section> */}
      <section className='tap_section'> 
        <section>
          <section className='points_section d-flex flex-column justify-content-center gap-1 pt-3'>
            <div className='points d-flex justify-content-center align-items-center gap-1'>
              <img src={coinIcon} alt="coin-logo" width="30px" />
              <span className=''>15</span>
            </div>
            <div onClick={goToTrophyPage} role='button' className='trophy d-flex justify-content-center align-items-center gap-1'>
              <img src={trophyIcon} alt="trophy-logo" width="13px" />
              <span className='muted-color'>Bronze</span>
              <i className="muted-color fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </section>

          <section className='coin-tap_section container mt-3'>
            <TapCoin />
          </section>
        </section>

        {/* <section className='footer container'>
          <section className="progress_section container">
            <ProgressBar />
          </section>

          <section className='menu_tabs container'>
            <Menu />
          </section>
        </section> */}
      </section>
    </>
  )
}

export default Tap_homePage