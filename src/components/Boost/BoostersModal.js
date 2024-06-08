import React, { useContext, useState } from 'react';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import UserContext from '../../contexts/UserContext';

const actionsTitle = {
    tappingGuru: "Tapping Guru",
    fullTank: "Full Tank",
    multiTap: "Multitap",
    energyLimit: "Energy Limit",
    rechargeSpeed: "Recharging Speed",
    tapBot: "Tap Bot",

}

const BoostersModal = ({onClose, iconSrc, selectedBooster, title, setSuccessAlert, setSpeedTapping, setFullEnergyLevel, boosterPrice, userBoosterLevel, boosterValue, updateBoosters, setGuruCount, setFullTankCount, setTapSequence,  setTapLevel, setEnergyLimitLevel, setEnergyRechargeLevel, accumulatedTaps, setAccumulatedTaps, setPoints, setEnergyLevel }) => {
    const { updateUser } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user'));
    // const points = JSON.parse(localStorage.getItem('points'));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleBooster = async () => {
        setIsLoading(true);
console.log(accumulatedTaps);
        if (accumulatedTaps > 0) {
            await API.post('/tap', { "taps": accumulatedTaps });
            console.log("points sent");
            setAccumulatedTaps(0);
            const userResponse = await API.get('/user');
            updateUser(userResponse.data);
        }

        setTimeout(async () => {
            try {
                let response;
                if (title === actionsTitle.tappingGuru) {
                    response = await API.post('/boosters/activate', {"daily_booster": "tapping_guru"});
                    setSpeedTapping(true)
                    setGuruCount((prev) => prev - 1)
                    navigate('/');
                } else if (title === actionsTitle.fullTank) {
                    response = await API.post('/boosters/activate', {"daily_booster": "full_tank"});
                    setFullTankCount((prev) => prev - 1)
                    setFullEnergyLevel(true)
                    navigate('/');
                } else if (title === actionsTitle.multiTap) {
                    response = await API.post('/boosters/upgrade', {"booster": "tap", "level": `${userBoosterLevel}`});
                    const newPoints = user.coins - boosterPrice;
                    setTapLevel((prev) => prev + 1)
                    setPoints((prev) => prev - boosterPrice);
                    updateUser({ coins: newPoints });
                    setTapSequence((prev) => prev + 1);
                } else if (title === actionsTitle.energyLimit) {
                    response = await API.post('/boosters/upgrade', {"booster":"energy_limit", "level": `${userBoosterLevel}`});
                    const newPoints = user.coins - boosterPrice;
                    setEnergyLimitLevel((prev) => prev + 1)
                    setEnergyLevel((prev) => prev + 1)
                    setPoints((prev) => prev - boosterPrice);
                    updateUser({ coins: newPoints });
                } else if (title === actionsTitle.rechargeSpeed) {
                    response = await API.post('/boosters/upgrade', {"booster":"energy_recharge", "level": `${userBoosterLevel}`});
                    const newPoints = user.coins - boosterPrice;
                    setEnergyRechargeLevel((prev) => prev + 1)
                    setPoints((prev) => prev - boosterPrice);
                    updateUser({ coins: newPoints });
                } else if (title === actionsTitle.tapBot) {
                    response = await API.post('/claim', {"booster":"tap_bot_coins"});
                    const newPoints = user.coins - boosterPrice;
                    setPoints((prev) => prev - boosterPrice);
                    updateUser({ coins: newPoints });
                }
    
                console.log(response.data);
                await updateBoosters();
                setSuccessAlert(true);
                onClose();
    
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

console.log(userBoosterLevel);

  return (
    <section className='boosters-modal_section container'>
        <div className="d-flex justify-content-end p-2 closeBtn">
            <i onClick={onClose} role='button' className="fa fa-times" aria-hidden="true"></i>
        </div>

        <section className='d-flex flex-column gap-2 justify-content-center text-center'>


            {selectedBooster != null ? (
                <section key={selectedBooster?.data.id}>
                    <span className="booster-icon">
                        <img src={iconSrc} alt="booster-img" className='img-fluid' width="40px" />
                    </span>
                    <section key={selectedBooster?.data.id}>
                        <h3>{title}</h3>
                        {selectedBooster.data.description && (<p className='muted-color mb-0'>{selectedBooster.data.description}.</p>)}
                        {selectedBooster.data.action_description && (<p className='muted-color'>{selectedBooster.data.action_description}.</p>)}
                            <div className='d-flex justify-content-center align-items-center gap-2'>
                                <img src={coinIcon} alt="coin-icon" width="25px" />
                                <h4 className='text-white mb-0'>{boosterPrice}</h4>
                                {title !== "Tap Bot" && <h6 className='muted-color mb-0'>| {title === "Energy Limit" ? `${boosterValue}` : `${userBoosterLevel}`} level</h6>}
                            </div>
                            <section className='action-btn container'>
                                {isLoading ? (
                                    <div role='button' className='start-mission loadingBtn my-3 h5'>Get it!</div>
                                ) : (
                                    <div role='button' onClick={handleBooster} className='start-mission basic-gradient my-3 h5'>Get it!</div>
                                )}
                            </section>
                        {/* {filteredLevel.map((level, index) => (
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
                        ))} */}
                    
                    </section>
                </section>
            ) : (
                <>
                    <span className="booster-icon">
                        <img src={iconSrc} alt="booster-img" className='img-fluid' width="40px" />
                    </span>
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
                            <div role='button' onClick={handleBooster} className='start-mission basic-gradient my-3 h5'>Get it!</div>
                        )}
                    </section>
                </>
            )}
            
        </section>
        


    </section>
  )
}

export default BoostersModal