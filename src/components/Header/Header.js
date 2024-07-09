import React from 'react';

import './header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const showGoBackArrow = location.pathname === '/join_socials' || location.pathname === '/general_task' || location.pathname === '/connect_wallet' || location.pathname === '/trophy';

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