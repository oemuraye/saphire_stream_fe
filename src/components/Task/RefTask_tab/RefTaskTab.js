import React, { useContext } from 'react';

import refIcon from '../../../utils/images/Small Icons/Referral.png';
import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import './refTask.css';
import API from '../../../api/api';
import UserContext from '../../../contexts/UserContext';

const RefTaskTab = ({refTasks}) => {
  const { user } = useContext(UserContext);
  const claimReward = async (id) => {
    try {
      const response = await API.post('/claim', {"type": "task", "task_id": id});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(user);
  const calculatePercentage = (totalCoins, rewardCoins) => {
    const percentage = (totalCoins / rewardCoins) * 100;
    return percentage;
  };

  return (
    <section className='refTask-tab_section d-flex flex-column gap-2 text-white'>
      {refTasks.map((task) => (
        <section key={task.id} className='taskPad rounded-3 py-2 px-3'>
          <div className="d-flex justify-content-between align-items-center">
            <div className='d-flex gap-3 align-items-center'>
              <img src={refIcon} alt="taskIcon" width="40px" height="45px" />
              <div className="d-flex flex-column">
                <h6 className="mb-0">{task.name}</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>{task.reward_in_coins}</span>
                </div>
              </div>
            </div>
            <div>
              {task.completed ? (
                <span onClick={() => claimReward(task.id)} className='claim_link py-2'>Claim</span>
              ) : (
                <span className='notClaim_link py-2'>Claim</span>
              )}
            </div>
          </div>

          <div className="task_progress my-2">
            <div className="progress" role="progressbar" aria-valuenow={calculatePercentage(user.data.total_coins, task.reward_in_coins)} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar" style={{ width: `${calculatePercentage(user.data.total_coins, task.reward_in_coins)}%` }}></div>
            </div>
          </div>
        </section>
      ))}
    </section>
  )
}

export default RefTaskTab