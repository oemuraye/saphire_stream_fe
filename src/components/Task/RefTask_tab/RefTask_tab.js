import React from 'react';

import refIcon from '../../../utils/images/Small Icons/Referral.png';
import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import './refTask.css';

const RefTask_tab = () => {
  return (
    <section className='refTask-tab_section d-flex flex-column gap-2 text-white'>
      <section className='taskPad rounded-3 py-2 px-3'>
        <div className="d-flex justify-content-between align-items-center">
          <div className='d-flex gap-3 align-items-center'>
              <img src={refIcon} alt="taskIcon" width="40px" height="45px" />
              <div className="d-flex flex-column">
                <h6 className="mb-0">Invite 1 Friends</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>2500</span>
                </div>
              </div>
            </div>
            <div>
              <span className='notClaim_link py-2'>Claim</span>
            </div>
        </div>

        <div className="task_progress my-2">
          <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{width: "20"}}></div>
          </div>
        </div>
      </section>

      <section className='taskPad rounded-3 py-2 px-3'>
        <div className="d-flex justify-content-between align-items-center">
          <div className='d-flex gap-3 align-items-center'>
              <img src={refIcon} alt="taskIcon" width="40px" height="45px" />
              <div className="d-flex flex-column">
                <h6 className="mb-0">Invite 3 Friends</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>50000</span>
                </div>
              </div>
            </div>
            <div>
              <span className='notClaim_link py-2'>Claim</span>
            </div>
        </div>

        <div className="task_progress my-2">
          <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{width: "20"}}></div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default RefTask_tab