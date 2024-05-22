import React from 'react';

import coinIcon from "../../utils/images/goldCoin.png";

import './stats.css';

const Stats = () => {
  return (
    <section className='container stats_section text-white'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 py-1'>
        <h6 className='text-center muted-color mt-2'>Your Share balance:</h6>
        <div className='points d-flex justify-content-center align-items-center gap-1'>
          <img src={coinIcon} alt="coin-logo" width="30px" />
          <span className=''>34.013 S</span>
        </div>
      </section>

      <hr />

      <section className='d-flex flex-column gap-4 text-center my-2'>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Total Touches:</h6>
          <h5>432 567 553 853</h5>
        </div>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Total Players:</h6>
          <h5>43 567 553</h5>
        </div>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Daily Users:</h6>
          <h5>3 657 553</h5>
        </div>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Online Players:</h6>
          <h5>47 553</h5>
        </div>
      </section>

    </section>
  )
}

export default Stats