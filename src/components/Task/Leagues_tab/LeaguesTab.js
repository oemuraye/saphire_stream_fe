import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import trophyIcon from '../../../utils/svgs/bronze trophy.svg';
import silverTrophyIcon from '../../../utils/images/silverTrophy.png';
import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import './leagues.css';
import API from '../../../api/api';
import UserContext from '../../../contexts/UserContext';


// Function to get the appropriate trophy icon based on the league or task type
const getTrophyIcon = (type) => {
  switch (type) {
    case 'bronze':
      return trophyIcon;
    case 'silver':
      return silverTrophyIcon;
    default:
      return trophyIcon;
  }
};

const LeaguesTab = ({leagueTasks}) => {
  const { user } = useContext(UserContext);
  const claimReward = async (id) => {
    const response = await API.post('/claim', {"type": "task", "task_id": id});
      console.log(response.data);
  }

  const calculatePercentage = (totalCoins, rewardCoins) => {
    const percentage = (totalCoins / rewardCoins) * 100;
    return percentage;
  };

  return (
    <section className='leagues-tab_section d-flex flex-column gap-2 text-white'>
      {leagueTasks.map(task => (
        <section key={task.id} className="taskPad rounded-3 py-1 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className='d-flex gap-3 align-items-center'>
              <img src={getTrophyIcon(task.type)} alt="taskIcon" width="40px" height="70px" />
              <div className="d-flex flex-column">
                <h6>{task.name}</h6>
                <div className='d-flex align-items-center gap-2'>
                  <img src={coinIcon} alt="coin-icon" width="18px" />
                  <span>{task.reward_in_coins}</span>
                </div>
              </div>
            </div>
            <div>
              {task.completed ? (
                <span onClick={() => claimReward(task.id)} className='claim_link py-1'>Claim</span>
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