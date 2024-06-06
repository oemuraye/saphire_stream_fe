import React, { useState } from 'react';
import { Link } from "react-router-dom";

import coinIcon from "../../../utils/images/Small Icons/Tap coin.png";


const Join_socials = () => {
  const [missionStarted, setMissionStarted] = useState(false);

  const start_mission = () => {
    setMissionStarted(true);
  }

  return (
    <section className='join_socials container text-white py-2'>
      <article>
        <h4>Join our socials</h4>
        <p className="muted-color">
          We regularly share valuable content on our socials. Join us there and get the rewards
        </p>
      </article>

      <section className='taskPad w-100 col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2'>
        <img src={coinIcon} alt="taskIcon" width="40px" height="" />
        <div className="d-flex flex-column">
          <h6 className='mb-0'>Reward</h6>
          <span className='text-light'>200000</span>
        </div>
      </section>

      <section>
        {/* <div onClick={start_mission()} role='button' className='start-mission basic-gradient my-3 h3'>Start mission</div> */}
        {missionStarted === false && (<div role='button' onClick={start_mission} className='start-mission basic-gradient my-3'>
          <h5 className='mb-0'>Start mission</h5>
        </div>)}
      </section>

      <section className='mission-tasks my-3'>
        <h5 className='py-2'>Your tasks</h5>
        <div className="mission_tasks d-flex flex-column gap-2 mt-2">
          <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
            {/* <h6 className="muted-color">Join the Telegram chat</h6> */}
            <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Join the Telegram chat</h6>
            {missionStarted === true && (<Link to="https://t.me/SapphireStream" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>)}
          </div>
          <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
            {/* <h6 className="muted-color">Follow X handle</h6> */}
            <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Follow X handle</h6>
            {missionStarted === true && (<Link to="https://twitter.com/sapphirestream_" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>)}
          </div>
          <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
            {/* <h6 className="muted-color">Visit website</h6> */}
            <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Visit website</h6>
            {missionStarted === true && (<Link to="https://t.me/SapphireStream" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>)}
          </div>
        </div>
      </section>

      <section>
        {missionStarted === true && (<div className='end-mission my-3'><h5 className="mb-0">Finish mission</h5></div>)}
      </section>
    </section>
  )
}

export default Join_socials