import React from 'react';

import coinImg from "../../../utils/images/coin.png";

import './tapCoin.css';

const TapCoin = () => {
  return (
    <section className='coinTap_section container d-flex justify-content-center '>
        <img src={coinImg} alt="coin-img" className='' width="100%" />
    </section>
  )
}

export default TapCoin