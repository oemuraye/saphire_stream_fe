import React from 'react';

import boltIcon from "../../../utils/images/Small Icons/Bolt.png";

import './progressBar.css'

const ProgressBar = ({ remainingPoints, progressPercentage, energyLevel }) => {
  const progressValue = !isNaN(progressPercentage) ? progressPercentage : 0;

  return (
    <section className='progressCount'>
      <div className="d-flex justify-content-center align-items-center my-2">
        <img src={boltIcon} alt="icon" width="25px" />
        <span className='fw-bold'>{remainingPoints}</span>
        <span className='tap_count'>/ {energyLevel}</span>
      </div>
      <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar bg-warning" style={{width: `${progressValue}%`}}></div>
      </div>
    </section>
  );
};

export default ProgressBar