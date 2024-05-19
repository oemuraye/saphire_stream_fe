import React from 'react';

import coinIcon from "../../utils/images/goldCoin.png";

const BoostersModal = ({onClose, iconSrc, title}) => {
  return (
    <section className='boosters-modal_section container'>
        <div className="d-flex justify-content-end p-4 closeBtn">
            <i onClick={onClose} className="fa fa-times" aria-hidden="true"></i>
        </div>

        <section className='d-flex flex-column gap-2 justify-content-center text-center mt-2'>
            <span className="booster-icon">
                <img src={iconSrc} alt="booster-img" className='img-fluid' width="75px" />
            </span>

            <h2>{title}</h2>

            <p className='muted-color mb-0'>Increase amount of TAP you can earn per one tap.</p>
            <p className='muted-color'>+1 per tap for each level</p>

            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={coinIcon} alt="coin-icon" width="25px" />
                <h3 className='text-white'>200000</h3>
                <h6 className='muted-color'>| 1 level</h6>
            </div>
        </section>
        
        <section className='action-btn'>
            <div role='button' className='start-mission basic-gradient my-3 h3'>Get it!</div>
        </section>


    </section>
  )
}

export default BoostersModal