import React, { useState } from 'react';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";

const BoostersModal = ({onClose, iconSrc, title, setSuccessAlert}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleBooster = async () => {
        setIsLoading(true);
        setTimeout(() => {
            onClose();
            setSuccessAlert(true);
        }, 3000);
    };
  return (
    <section className='boosters-modal_section container'>
        <div className="d-flex justify-content-end p-2 closeBtn">
            <i onClick={onClose} role='button' className="fa fa-times" aria-hidden="true"></i>
        </div>

        <section className='d-flex flex-column gap-2 justify-content-center text-center'>
            <span className="booster-icon">
                <img src={iconSrc} alt="booster-img" className='img-fluid' width="40px" />
            </span>

            <h3>{title}</h3>

            <p className='muted-color mb-0'>Increase amount of TAP you can earn per one tap.</p>
            <p className='muted-color'>+1 per tap for each level</p>

            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={coinIcon} alt="coin-icon" width="25px" />
                <h4 className='text-white mb-0'>200000</h4>
                <h6 className='muted-color mb-0'>| 1 level</h6>
            </div>
        </section>
        
        <section className='action-btn container'>
            <div role='button' onClick={handleBooster} className={`start-mission basic-gradient my-3 h5 ${isLoading && 'loadingBtn'} `}>Get it!</div>
        </section>


    </section>
  )
}

export default BoostersModal