import React, { useState } from 'react';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';

const actionsTitle = {
    tappingGuru: "Tapping Guru",
    fullTank: "Full Tank",
    multiTap: "Multitap",
    energyLimit: "Energy Limit",
    rechargeSpeed: "Recharging Speed",
    tapBot: "Tap Bot",

}

const BoostersModal = ({onClose, iconSrc, selectedBooster, title, setSuccessAlert, setSpeedTapping, levels, setFullEnergyLevel}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const targetValue = selectedBooster?.data?.levels && selectedBooster?.data.levels[0].value;
    const filteredLevel = selectedBooster?.data?.levels && selectedBooster?.data.levels.filter(level => level.value === targetValue);

    const handleBooster = async (level) => {
        setIsLoading(true);
        try {
            if (title === actionsTitle.tappingGuru) {
                const response = await API.post('/boosters/activate', {"daily_booster": "tapping_guru"});
                console.log(response.data);
                onClose();
                navigate('/');
                setIsLoading(false);
                setSuccessAlert(true);
                setSpeedTapping(true);
            } else if (title === actionsTitle.fullTank) {
                const response = await API.post('/boosters/activate', {"daily_booster": "full_tank"});
                console.log(response.data);
                onClose();
                navigate('/');
                setSuccessAlert(true);
                setFullEnergyLevel(true);
            } else if (title === actionsTitle.multiTap) {
                const response = await API.post('/boosters/upgrade', {"booster": "tap", "level": level + 1});
                console.log(response.data);
                onClose();
                setSuccessAlert(true);
            } else if (title === actionsTitle.energyLimit) {
                const response = await API.post('/boosters/upgrade', {"booster":"energy_limit", "level": level + 1000});
                console.log(response.data);
                onClose();
                setSuccessAlert(true);
            } else if (title === actionsTitle.rechargeSpeed) {
                const response = await API.post('/boosters/upgrade', {"booster":"energy_recharge", "level": level});
                console.log(response.data);
                onClose();
                setSuccessAlert(true);
            } else if (title === actionsTitle.tapBot) {
                const response = await API.post('/claim', {"booster":"tap_bot_coins"});
                console.log(response.data);
                onClose();
                setSuccessAlert(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
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


            {selectedBooster != null ? (
                <section key={selectedBooster?.data.id}>
                    <h3>{title}</h3>
                    {selectedBooster.data.description && (<p className='muted-color mb-0'>{selectedBooster.data.description}.</p>)}
                    {selectedBooster.data.action_description && (<p className='muted-color mb-0'>{selectedBooster.data.action_description}.</p>)}
                    {filteredLevel.map((level, index) => (
                        <>
                            <div key={index} className='d-flex justify-content-center align-items-center gap-2'>
                                <img src={coinIcon} alt="coin-icon" width="25px" />
                                <h4 className='text-white mb-0'>{level.price}</h4>
                                {title === "Tap Bot" ? null : <h6 className='muted-color mb-0'>| {level.value} level</h6>}
                            </div>
                            <section key={index + 1} className='action-btn container'>
                                {isLoading ? (
                                    <div role='button' className='start-mission loadingBtn my-3 h5'>Get it!</div>
                                ) : (
                                    <div role='button' onClick={() => handleBooster(level.value)} className='start-mission basic-gradient my-3 h5'>Get it!</div>
                                )}
                            </section>
                        </>
                    ))}
                   
                </section>
            ) : (
                <>
                    <h3>{title}</h3>
                    {title === "Tap Bot" ? (
                       <p className='muted-color mb-0'>Multiply your income by x5 for 20seconds. Do not use energy while active.</p> 
                    ):(
                        <p className='muted-color mb-0'>Fill your energy to the max.</p> 
                    )}
                    <div className='d-flex justify-content-center align-items-center gap-1 pt-3'>
                        <img src={coinIcon} alt="coin-icon" width="16px" />
                        <h5 className='text-white mb-0'>Free</h5>
                    </div>
        
                    <section className='action-btn container'>
                        {isLoading ? (
                            <div role='button' className='start-mission loadingBtn my-3 h5'>Get it!</div>
                        ) : (
                            <div role='button' onClick={() => handleBooster()} className='start-mission basic-gradient my-3 h5'>Get it!</div>
                        )}
                    </section>
                </>
            )}
            
        </section>
        


    </section>
  )
}

export default BoostersModal