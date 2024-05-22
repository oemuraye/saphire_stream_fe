import React, { useState } from 'react';
import { Link } from "react-router-dom";

import coinIcon from "../../utils/images/goldCoin.png";
import trophyIcon from "../../utils/svgs/bronze trophy.svg";


import './ref.css';

const Ref = () => {
  const [hasReferrals, sethasReferrals] = useState(false)
  return (
    <section className='referral_section container mt-4'>
      <div className="d-flex flex-column text-center text-white">
        <h2>0 Referrals</h2>
        <span className='increase_ref'>+0</span>
      </div>

      <hr />

      <section className="d-flex align-items-center justify-content-between text-white my-3 pt-2">
        <h6>My Referrals:</h6>
        <Link className='ref_link'>Invite a friend</Link>
      </section>

      <section className="text-center text-white mt-5">
        {hasReferrals ? (
          <section className='taskPad container d-flex flex-column rounded-3 p-2'>
            <h6 className='text-start'>Vovos</h6>

            <div className="trophy-point d-flex gap-2 justify-content-between">
              <div className="d-flex gap-1">
                <img src={trophyIcon} alt="coin-icon" className='trophy-img' width="20px" height="15px" />
                <span className='muted-color'>bronze |</span>
                <img src={coinIcon} alt="coin-icon" width="20px" height="20px" />
                <span className=''>652</span>
              </div>
              <div className="d-flex gap-2">
                <h6>+2000</h6>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </div>

            <div className="progress mt-2" role="progressbar" aria-label="Warning example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar rounded-4" style={{width: "20%"}}></div>
            </div>
          </section>
        ) : (
          <h6>You don't have referrals &#128557;</h6>
        )}
      </section>

    </section>
  )
}

export default Ref