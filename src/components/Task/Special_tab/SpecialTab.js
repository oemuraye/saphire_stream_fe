import React from 'react'

import taskIcon from '../../../utils/images/Small Icons/Task.png';
import coinIcon from '../../../utils/images/Small Icons/Tap coin.png';

import './special_tabs.css';
import { useNavigate } from 'react-router-dom';

const Special_tab = ({specialTasks}) => {
  const navigate = useNavigate();
  console.log(specialTasks);

  const goToTaskPage = (userTask) => {
    switch (userTask.name) {
      case 'Join our Socials':
        navigate(`/join_socials`);
        break;
      case 'Connect Solana Wallet':
        navigate(`/connect_wallet`);
        break;
      default:
        navigate(`/general_task`, { state: { userTask } });
        break;
    }
  }
  return (
    <section className='special-tab_section d-flex flex-column gap-2 text-white'>
      {specialTasks.map(task => (
        <section key={task.id} onClick={() => goToTaskPage(task)} role='button'
          className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3"
        >
          <div className='d-flex gap-3 align-items-center'>
            <img src={taskIcon} alt="taskIcon" className='img-fluid' width="45px" height="45px" />
            <div className="d-flex flex-column">
              <h6>{task.name}</h6>
              <div className='d-flex align-items-center gap-1'>
                <img src={coinIcon} alt="coin-icon" width="20px" />
                <span>{task.reward_in_coins}</span>
              </div>
            </div>
          </div>
          <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
        </section>
      ))}
    </section>
  )
}

export default Special_tab;