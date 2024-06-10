import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import trophyIcon from "../../utils/svgs/bronze trophy.svg";


import './ref.css';
import API from '../../api/api';
import Loading from '../LoadingSection/Loading';


const Ref = () => {
  const user = JSON.parse(localStorage.getItem('user'));  
  const [hasReferrals, sethasReferrals] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [referralInfo, setReferralInfo] = useState();

  const referralLink = `https://t.me/SapphireStreamBot?start=${user?.data.referral_id}`;
  // console.log(user?.data);

  const getReferralInfo = async () => {
    try {
      const response = await API.get('/referrals');
      setReferralInfo(response.data);
      console.log(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getReferralInfo();
  }, []);

  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setSuccessAlert(true);
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  };

  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successAlert]);


  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <section className='referral_section container mt-4'>
      <div className="d-flex flex-column text-center text-white">
        <h2>{user?.data?.referral_count} Referrals</h2>
        {/* <span className='increase_ref'>+0</span> */}
      </div>

      <hr />

      <section className="d-flex flex-column text-white my-3 pt-2">
        <h6>My Referrals:</h6>
        <div className='refer-link d-flex align-items-center'>
          <input type='text' value={referralLink} readOnly className='form-control' />
          <span onClick={handleCopyLink} className='ref_link'>Invite a friend</span>
        </div>      
      </section>

      <section className="text-center text-white mt-5">
        {referralInfo?.data?.length > 0 ? (
          referralInfo.data.map((referredUser) => (
            <section key={referredUser.telegram_user_id} className='taskPad container d-flex flex-column rounded-3 p-2'>
              <h6 className='text-start'>{referredUser.username}</h6>

              {/* <div className="trophy-point d-flex gap-2 justify-content-between">
                <div className="d-flex gap-1">
                  <img src={trophyIcon} alt="coin-icon" className='trophy-img' width="18px" height="15px" />
                  <span className='muted-color'>bronze |</span>
                  <img src={coinIcon} alt="coin-icon" width="20px" height="20px" />
                  <span className=''>652</span>
                </div>
                <div className="d-flex gap-2">
                  <h6>+2000</h6>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
              </div> */}

              <div className=''>
                <p>{referralInfo.name}</p>
              </div>

              {/* <div className="progress mt-2" role="progressbar" aria-label="Warning example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar rounded-4" style={{width: "20%"}}></div>
              </div> */}
            </section>
          ))
        ) : (
          <h6>You don't have referrals &#128557;</h6>
        )}
      </section>

      {successAlert && (
        <section className="alert-toast d-flex align-items-center rounded-3 py-3 px-3 gap-2">
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <h6 className="mb-0">Copied!</h6>
        </section>
      )}
    </section>
  )
}

export default Ref
