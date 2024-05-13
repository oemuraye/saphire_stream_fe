import React from 'react';

import coinIcon from "../../utils/images/goldCoin.png";

import './menu.css'

const Menu = () => {
  return (
    <footer className='container'>
      <section className='d-flex justify-content-between gap-2 my-3'>
        <div className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Ref</span>
        </div>
        <div className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Task</span>
        </div>
        <div className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Tap</span>
        </div>
        <div className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Boost</span>
        </div>
        <div className="tab_box p-2 px-4 rounded-3">
          <img src={coinIcon} alt="coin-img" width="25px" />
          <span className='menu-text'>Stats</span>
        </div>
      </section>
    </footer>
  )
}

export default Menu