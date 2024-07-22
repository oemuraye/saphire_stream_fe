import React, { useContext, useState } from 'react';

import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import goldImg from '../../../utils/images/trophies/Gold.png';
import platinumImg from '../../../utils/images/trophies/Platinum.png';
import diamondImg from '../../../utils/images/trophies/Diamond.png';
import masterImg from '../../../utils/images/trophies/Master.png';
import grandMasterImg from '../../../utils/images/trophies/Grandmaster.png';
import eliteImg from '../../../utils/images/trophies/Elite league.png';
import legendaryImg from '../../../utils/images/trophies/Legendary.png';
import mythicImg from '../../../utils/images/trophies/Mystic league.png';

import './leagues.css';
import API from '../../../api/api';
import UserContext from '../../../contexts/UserContext';


// Function to get the appropriate trophy icon based on the league or task type
const getTrophyIcon = (type) => {
  switch (type) {
    case 'platinum':
      return platinumImg;
    case 'diamond':
      return diamondImg;
    case 'master':
      return masterImg;
    case 'grandmaster':
      return grandMasterImg;
    case 'elite':
      return eliteImg;
    case 'legendary':
      return legendaryImg;
    case 'mythic':
      return mythicImg;
    default:
      return goldImg;
  }
};

const LeaguesTab = ({leagueTasks, setSuccessAlert, setPoints}) => {
  const { user, updateUser, updateTasks } = useContext(UserContext);

  const claimReward = async (id, reward) => {
    try {
      const response = await API.post('/claim', {"type": "task", "task_id": id});
      setPoints((prevPoints) => {
        const newPoints = Number(prevPoints) + Number(reward);
        localStorage.setItem('points', newPoints);
        updateUser({ coins: newPoints });
        return newPoints;
      });
      await updateTasks();
      setSuccessAlert(true)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const calculatePercentage = (totalCoins, rewardCoins) => {
    const percentage = (totalCoins / rewardCoins) * 100;
    return percentage;
  };

  // console.log(leagueTasks);

  return (
    <section className='leagues-tab_section d-flex flex-column gap-2 text-white'>
      {leagueTasks?.map(task => (
        <section key={task.id} className="taskPad rounded-3 py-1 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className='d-flex gap-3 align-items-center'>
              <img src={getTrophyIcon(task.name)} alt="taskIcon" width="40px" height="70px" />
              <div className="d-flex flex-column">
                <h6>{task.name}</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>{task.reward_in_coins}</span>
                </div>
              </div>
            </div>
            <div>
              {task.completed === true ? (
                <>
                  {task.reward_claimed === true ? (
                    <span className='notClaim_link claimed-success py-2'>Claimed</span>
                  ):(
                    <span onClick={() => claimReward(task.id, task.reward_in_coins)} className='claim_link py-1'>Claim</span>
                  )}
                </>
              ) : (
                <span className='notClaim_link py-2'>Claim</span>
              )}
            </div>
          </div>
          {!task.completed && (
            <div className="task_progress my-2">
              <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={calculatePercentage(user.data.total_coins, task.reward_in_coins)} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: `${calculatePercentage(user.data.total_coins, task.reward_in_coins)}%` }}></div>
              </div>
            </div>
          )}
        </section>
      ))}
    </section>
  )
}

export default LeaguesTab;