import React from 'react';

import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/goldCoin.png";


const Task = () => {
  return (
    <section className='task_section container'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 pt-3'>
            <div className='points d-flex justify-content-center align-items-center gap-1'>
              <img src={coinIcon} alt="coin-logo" width="30px" />
              <span className=''>15</span>
            </div>
            <div className='trophy d-flex justify-content-center align-items-center gap-1'>
              <img src={trophyIcon} alt="trophy-logo" width="13px" />
              <span className='trophy-text'>Bronze</span>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </section>

          <hr />

          <section className='my-3 pt-4'></section>
    </section>
  )
}

export default Task