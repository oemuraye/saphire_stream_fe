import React from 'react';

import coinIcon from "../../utils/images/goldCoin.png";
import taskIcon from '../../utils/images/task.png';
import flameIcon from '../../utils/images/fire.png';

import './boost.css';

const Boost = () => {
  return (
    <section className='boost_section container'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 py-3'>
        <h5 className='text-center my-2'>Your Share balance</h5>
        <div className='points d-flex justify-content-center align-items-center gap-1'>
          <img src={coinIcon} alt="coin-logo" width="30px" />
          <span className=''>15</span>
        </div>
      </section>

      <hr />

      <section className='daily-boosters text-white my-3'>
        <h2>Your daily boosters:</h2>
        <section className="d-flex justify-content-between align-items-center gap-2">
          <div className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2'>
            <img src={flameIcon} alt="taskIcon" width="40px" height="" />
            <div className="d-flex flex-column">
              <h6>Taping Guru</h6>
              <div className=''>
                <span>3/3</span>
              </div>
            </div>
          </div>
          <div className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2'>
            <img src={flameIcon} alt="taskIcon" width="40px" height="" />
            <div className="d-flex flex-column">
              <h6>Full Task</h6>
              <div className=''>
                <span>3/3</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className='boosters text-white my-3'>
        <h2>Boosters:</h2>
        <section className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
          <div className='d-flex gap-2 align-items-center'>
            <img src={taskIcon} alt="taskIcon" width="70px" height="" />
            <div className="d-flex flex-column">
              <h6>Multitap</h6>
              <div className='d-flex align-items-center gap-2'>
                <img src={coinIcon} alt="coin-icon" width="25px" />
                <span>200</span>
                <span className='text-muted'>| 1 level</span>
              </div>
            </div>
          </div>
          <div><i class="fa fa-angle-right" aria-hidden="true"></i></div>
        </section>

      </section>
    </section>
  )
}

export default Boost