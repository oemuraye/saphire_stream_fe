import React from 'react';
import { Link } from 'react-router-dom';

import trophyIcon from '../../../utils/svgs/bronze trophy.svg';
import silverTrophyIcon from '../../../utils/images/silverTrophy.png';
import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import './leagues.css'

const Leagues_tab = () => {
  return (
    <section className='leagues-tab_section d-flex flex-column gap-2 text-white'>
      <section className="taskPad rounded-3 py-1 px-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className='d-flex gap-3 align-items-center'>
              <img src={trophyIcon} alt="taskIcon" width="40px" height="70px" />
              <div className="d-flex flex-column">
                <h6>Bronze</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>1000</span>
                </div>
              </div>
            </div>
            <div><Link className='claim_link py-1'>Claim</Link></div>
        </div>
      </section>

      <section className='taskPad rounded-3 py-1 px-3'>
        <div className="d-flex justify-content-between align-items-center">
          <div className='d-flex gap-3 align-items-center'>
              <img src={silverTrophyIcon} alt="taskIcon" width="40px" height="45px" />
              <div className="d-flex flex-column">
                <h6>Silver</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>5000</span>
                </div>
              </div>
            </div>
            <div>
              <span className='notClaim_link py-2'>Claim</span>
            </div>
        </div>

        <div className="task_progress my-2">
          <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{width: "20%"}}></div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Leagues_tab