import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

import './ref.css';
import API from '../../api/api';
import Loading from '../LoadingSection/Loading';

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
import { useNavigate } from 'react-router-dom';


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
  const [currentIndex, setCurrentIndex] = useState(0);

  const referralLink = `https://t.me/SapphireStreamBot?start=${user?.data.referral_id}`;

  // const getCurrentTrophyIndex = () => {
  //   for (let i = 0; i < trophyImages.length; i++) {
  //     if (points >= trophyImages[i].rangeStart && points < trophyImages[i].rangeEnd) {
  //       return i;
  //     }
  //   }
  //   return trophyImages.length - 1;
  // };
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

  const navigate = useNavigate();

  const goToUserTelegram = (username) => {
    navigate(`https://t.me/${username}`);
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

  // const currentTrophy = trophyImages[currentIndex];
  // const rangeSize = currentTrophy.rangeEnd - currentTrophy.rangeStart;
  // const progressBarWidth = Math.min(((points - currentTrophy.rangeStart) / rangeSize) * 100, 100) + '%';
  // const pointsInRange = points >= currentTrophy.rangeStart && points < currentTrophy.rangeEnd;

  const calculatePercentage = (expectedReferral, referralCount) => {
    const percentage = (expectedReferral / referralCount) * 100;
    return percentage;
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
          referralInfo.data.map((referredUser) => (
            <section role='button' onClick={() => goToUserTelegram(referredUser.username)} key={referredUser.telegram_user_id} className='taskPad container d-flex flex-column rounded-3 p-2'>
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
                <p>{referredUser.name}</p>
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
