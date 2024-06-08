import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext';
import API from '../../api/api';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import taskIcon from "../../utils/images/tapbot.png";

const TapBotModal = ({closeTaskModal, setTapBotCoinsCount, setPoints, tapBotCoins, setTapBotCoins}) => {
    const { updateBoosters, updateUser } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false);

    const handleBooster = async () => {
        setIsLoading(true);

        try {
            const response = await API.post('/claim', {"type": "tap_bot_coins"});
            setPoints((prev) => prev + tapBotCoins);
            const newPoints = user.coins + tapBotCoins;
            updateUser({ coins: newPoints });
            setTapBotCoins(0)
            setTapBotCoinsCount(0)
            await updateBoosters();
            closeTaskModal();
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <section className='boosters-modal_section container'>
        <div className="d-flex justify-content-end p-2 closeBtn">
            <span onClick={closeTaskModal} role='button' className="fa fa-times" aria-hidden="true"></span>
        </div>

        <section className='d-flex flex-column gap-2 justify-content-center text-center'>
            <span className="booster-icon">
                <img src={taskIcon} alt="booster-img" className='img-fluid' width="60px" />
            </span>
            
            <h3>Tap Bot</h3>

            <p className='text-light'>While you were asleep, your Tap Bot earned some shares for you </p>

            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={coinIcon} alt="coin-icon" width="25px" />
                <h4 className='text-white mb-0'>{tapBotCoins}</h4>
            </div>


            <section className='action-btn container'>
                {isLoading ? (
                    <div role='button' className='start-mission loadingBtn my-3 h5'>Claim</div>
                ) : (
                    <div role='button' onClick={handleBooster} className='start-mission goldBtn my-3 h5'>Claim</div>
                )}
            </section>
        </section>

    </section>
  )
}

export default TapBotModal