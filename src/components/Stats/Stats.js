import React from 'react';

import coinIcon from "../../utils/images/goldCoin.png";

import './stats.css';

const Stats = () => {
  return (
    <section className='container stats_section text-white'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 py-3'>
        <h5 className='text-center muted-color mt-2'>Your Share balance:</h5>
        <div className='points d-flex justify-content-center align-items-center gap-1'>
          <img src={coinIcon} alt="coin-logo" width="50px" />
          <span className=''>34.013 S</span>
        </div>
      </section>

      <hr />

      <section className='d-flex flex-column gap-4 text-center my-2'>
        <div className="touches-count d-flex flex-column">
          <h5 className="muted-color mb-0">Total Touches:</h5>
          <h2>432 567 553 853</h2>
        </div>
        <div className="touches-count d-flex flex-column">
          <h5 className="muted-color mb-0">Total Players:</h5>
          <h2>43 567 553</h2>
        </div>
        <div className="touches-count d-flex flex-column">
          <h5 className="muted-color mb-0">Daily Users:</h5>
          <h2>3 657 553</h2>
        </div>
        <div className="touches-count d-flex flex-column">
          <h5 className="muted-color mb-0">Online Players:</h5>
          <h2>47 553</h2>
        </div>
      </section>

    </section>
  )
}

export default Stats