import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

import './ref.css';
import API from '../../api/api';
import Loading from '../LoadingSection/Loading';

import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import woodImg from '../../utils/images/trophies/wood.png';
import bronzeImg from '../../utils/images/trophies/Bronze.png';
import silverImg from '../../utils/images/trophies/Silver.png';
import goldImg from '../../utils/images/trophies/Gold.png';
import platinumImg from '../../utils/images/trophies/Platinum.png';
import diamondImg from '../../utils/images/trophies/Diamond.png';
import masterImg from '../../utils/images/trophies/Master.png';
import grandMasterImg from '../../utils/images/trophies/Grandmaster.png';
import eliteImg from '../../utils/images/trophies/Elite league.png';
import legendaryImg from '../../utils/images/trophies/Legendary.png';
import mythicImg from '../../utils/images/trophies/Mystic league.png';


const Ref = () => {
  const trophyImages = [
    { src: woodImg, title: 'Wood', rangeStart: 0, rangeEnd: 1 },
    { src: bronzeImg, title: 'Bronze', rangeStart: 1, rangeEnd: 500 },
    { src: silverImg, title: 'Silver', rangeStart: 500, rangeEnd: 5000 },
    { src: goldImg, title: 'Gold', rangeStart: 5000, rangeEnd: 50000 },
    { src: platinumImg, title: 'Platinum', rangeStart: 50000, rangeEnd: 500000 },
    { src: diamondImg, title: 'Diamond', rangeStart: 500000, rangeEnd: 1000000 },
    { src: masterImg, title: 'Master', rangeStart: 1000000, rangeEnd: 2500000 },
    { src: grandMasterImg, title: 'Grand Master', rangeStart: 2500000, rangeEnd: 5000000 },
    { src: eliteImg, title: 'Elite League', rangeStart: 5000000, rangeEnd: 10000000 },
    { src: legendaryImg, title: 'Legendary', rangeStart: 10000000, rangeEnd: 50000000 },
    { src: mythicImg, title: 'Mythic', rangeStart: 50000000, rangeEnd: Infinity },
  ];

  const user = JSON.parse(localStorage.getItem('user'));  
  const [successAlert, setSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [referralInfo, setReferralInfo] = useState();

  const referralLink = `https://t.me/SapphireStreamBot?start=${user?.data.referral_id}`;

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

  const goToUserTelegram = (username) => {
    window.location.href = `https://t.me/${username}`;
  };

  
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

  const calculatePercentage = (points, rangeStart, rangeEnd) => {
    const rangeSize = rangeEnd - rangeStart;
    const progress = ((points - rangeStart) / rangeSize) * 100;
    return Math.min(progress, 100);
  };

  const getUserTrophy = (points) => {
    for (let i = 0; i < trophyImages.length; i++) {
      if (points >= trophyImages[i].rangeStart && points < trophyImages[i].rangeEnd) {
        return trophyImages[i];
      }
    }
    return trophyImages[trophyImages.length - 1];
  };



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
          referralInfo.data.map((referredUser) => {
            const userPoints = referredUser.coins;
            const userTrophy = getUserTrophy(userPoints);
            const progressBarWidth = calculatePercentage(userPoints, userTrophy.rangeStart, userTrophy.rangeEnd);

            return (
              <section role='button' onClick={() => goToUserTelegram(referredUser.username)} key={referredUser.telegram_user_id} className='taskPad container d-flex flex-column gap-2 rounded-3 p-2'>
                <h6 className='text-start'>{referredUser.username}</h6>

                <div className="trophy-point d-flex gap-2 justify-content-between">
                  <div className="d-flex gap-1">
                    <img src={userTrophy.src} alt="trophy-icon" className='trophy-img' width="18px" height="15px" />
                    <span className='muted-color'>{userTrophy.title} |</span>
                    <img src={coinIcon} alt="coin-icon" width="20px" height="20px" />
                    <span className=''>{userPoints}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {/* <h6>+{referredUser.bonusPoints}</h6> */}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                </div>

                <div className="progress mt-2" role="progressbar" aria-label="Warning example" aria-valuenow={progressBarWidth} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar rounded-4" style={{ width: `${progressBarWidth}%` }}></div>
                </div>
              </section>
            );
          })
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
