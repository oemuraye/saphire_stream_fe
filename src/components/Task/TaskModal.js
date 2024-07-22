import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext';
import API from '../../api/api';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import taskIcon from "../../utils/images/taskIcon.png";

const TaskModal = ({closeTaskModal, setSuccessAlert, setIsRewardClaimed, setPoints, taskId, rewardInCoins}) => {
    const { updateTasks, updateUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleBooster = async () => {
        setIsLoading(true);
    
        try {
            const response = await API.post('/tasks/complete', { "task_id": taskId });
            console.log(response.data);
    
            setTimeout(async () => {
                try {
                    setIsLoading(true);
                    const response = await API.post('/claim', { "type": "task", "task_id": taskId });
    
                    closeTaskModal();
                    setPoints((prevPoints) => {
                        const newPoints = Number(prevPoints) + Number(rewardInCoins);
                        localStorage.setItem('points', newPoints);
                        updateUser({ coins: newPoints });
                        return newPoints;
                    });
                    setSuccessAlert(true);
                    console.log(response.data);
                    await updateTasks();
                    setIsRewardClaimed(true);
                } catch (error) {
                    console.log(error);
                }
            }, 2000);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <section className='boosters-modal_section container'>
        <div className="d-flex justify-content-end p-2 closeBtn">
            <span onClick={closeTaskModal} role='button' className="fa fa-times" aria-hidden="true"></span>
        </div>

        <section className='d-flex flex-column gap-2 justify-content-center text-center'>
            <span className="booster-icon">
                <img src={taskIcon} alt="booster-img" className='img-fluid' width="40px" />
            </span>
            
            <h3>Congratulations</h3>

            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={coinIcon} alt="coin-icon" width="25px" />
                <h4 className='text-white mb-0'>{rewardInCoins}</h4>
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

export default TaskModal