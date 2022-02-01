import React from "react";
import { Link } from "react-router-dom";
import './Styles/Footer.css'

function Footer(){
    return (
        <>
            <div className='footer-container'>
      
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Project Link</h2>
            <a href="https://github.com/Abin-k-Rajan/AMRP/tree/React-App" target="_blank">AMRP REACT APP</a>
            <a href="https://github.com/Abin-k-Rajan/AMRP/tree/Dotnet-Backend" target='_blank'>AMRP ASP.NET</a>
            <a href="https://programmablesearchengine.google.com/cse/setup/basic?cx=6c1d57204d0f32abc" target='_blank'>Custom Serach Engine</a>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <a href="https://www.linkedin.com/in/abin-k-732a18136/" target='_blank'>LinkedIn</a>
            <a href="#" target='_blank'>LinkedIn</a>
          </div>
        </div>
        
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              AMRP
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>All Movie Review Platform</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
        </>
    );
}

export default Footer;