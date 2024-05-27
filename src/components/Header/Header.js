import React, { useEffect } from 'react';

import './header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    
    // Show or hide the back button based on the current route
    if (location.pathname === '/join_socials' || location.pathname === '/connect_wallet' || location.pathname === '/trophy') {
      backButton.show();
    } else {
      backButton.hide();
    }
    
    // Set the onClick event handler for the back button
    backButton.onClick(() => {
      // Implement your navigation logic here
      console.log('Back button clicked');
    });

    // Clean up event listener when the component unmounts
    return () => backButton.offClick();
  }, [location.pathname]);


  const showGoBackArrow = location.pathname === '/join_socials' || location.pathname === '/connect_wallet' || location.pathname === '/trophy';

  return (
    <header className='container shadow-sm'>
        <section className='header_section text-white container py-2'>
            <div className='d-flex align-items-center gap-3'>
                {showGoBackArrow ? (
                  <i role='button' onClick={() => navigate(-1)} className="fa fa-arrow-left" aria-hidden="true"></i>
                ) : (
                  <i role='button' className="fa fa-times" aria-hidden="true"></i>
                )}
                <h4>SaphireStream</h4>
            </div>
            <div>
                <i className="fa fa-ellipsis-v" role='button' aria-hidden="true"></i>
            </div>
        </section>
    </header>
  )
}

export default Header