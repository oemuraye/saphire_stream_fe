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

const BoostersModal = ({onClose, iconSrc, selectedBooster, title, setSuccessAlert, setSpeedTapping, setFullEnergyLevel}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const targetValue = selectedBooster?.data?.levels && selectedBooster?.data.levels[0].value;
    const filteredLevel = selectedBooster?.data?.levels && selectedBooster?.data.levels.filter(level => level.value === targetValue);
console.log(isLoading);


// setIsLoading(true);
    const handleBooster = async () => {
        setIsLoading(true);
        try {
            if (title === actionsTitle.tappingGuru) {
                const data = {"daily_booster": "tapping_guru"}
                const response = await API.post('/boosters/activate', {data: data});
                console.log(response.data);
                // onClose();
                // navigate('/');
                // setIsLoading(false);
                // setSuccessAlert(true);
                // setSpeedTapping(true);
            } else if (title === actionsTitle.fullTank) {
                const data = {"daily_booster": "full_tank"}
                const response = await API.post('/boosters/activate', {data: data});
                console.log(response.data);
                // onClose();
                // navigate('/');
                // setSuccessAlert(true);
                // setFullEnergyLevel(true);
            } else if (title === actionsTitle.multiTap) {
                const data = {
                    "booster": "tap",
                    "level": "2"
                }
                const response = await API.post('/boosters/upgrade', {data: data});
                console.log(response.data);
                // onClose();
                // setSuccessAlert(true);
            } else if (title === actionsTitle.energyLimit) {
                const data = {
                    "booster":"energy_limit",
                    "level":"2"
                }
                const response = await API.post('/boosters/upgrade', {data: data});
                console.log(response.data);
                // onClose();
                // setSuccessAlert(true);
            } else if (title === actionsTitle.rechargeSpeed) {
                const data = {
                    "booster":"energy_recharge",
                    "level":"2"
                }
                const response = await API.post('/boosters/upgrade', {data: data});
                console.log(response.data);
                // onClose();
                // setSuccessAlert(true);
            } else if (title === actionsTitle.tapBot) {
                const data = {"type": "tap_bot_coins"}
                const response = await API.post('/claim', {data: data});
                console.log(response.data);
                // onClose();
                // setSuccessAlert(true);
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

            <h3>{title}</h3>

            {selectedBooster != null && (
                <>
                    {selectedBooster.data.description && (<p className='muted-color mb-0'>{selectedBooster.data.description}</p>)}
                    {selectedBooster.data.action_description && (<p className='muted-color mb-0'>{selectedBooster.data.action_description}</p>)}
                    {filteredLevel.map((level, index) => (
                        <div key={index} className='d-flex justify-content-center align-items-center gap-2'>
                            <img src={coinIcon} alt="coin-icon" width="25px" />
                            <h4 className='text-white mb-0'>{level.price}</h4>
                            {title === "Tap Bot" ? null : <h6 className='muted-color mb-0'>| {level.value} level</h6>}
                        </div>
                    ))}
                </>
            )}
            
        </section>
        
        <section className='action-btn container'>
            {isLoading ? (
                <div role='button' className='start-mission loadingBtn my-3 h5'>Get it!</div>
            ) : (
                <div role='button' onClick={handleBooster} className='start-mission basic-gradient my-3 h5'>Get it!</div>
            )}
        </section>


    </section>
  )
}

export default BoostersModal