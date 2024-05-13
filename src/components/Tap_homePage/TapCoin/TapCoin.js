import React from 'react';

import coinImg from "../../../utils/images/coin.png"

const TapCoin = () => {
  return (
    <section className='coinTap_section container d-flex justify-content-center'>
        <img src={coinImg} alt="coin-img" className='img-fluid' />
    </section>
  )
}

export default TapCoin