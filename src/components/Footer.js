import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../base";
import './Styles/Footer.css'

function Footer(){
  const [generalCount, setGeneralCount] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${apiUrl}crew/generalcount`).then(res => res.json()).then((result) => {
      console.log(result)
      setLoading(false)
      setGeneralCount(result)
    })
  }, [])

    return (
        <>
            <div className='footer-container'>
      
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Project Link</h2>
            <a href="https://github.com/Abin-k-Rajan/AMRP/tree/React-App" target="_blank">AMRP REACT APP</a>
            <a href="https://github.com/Abin-k-Rajan/AMRP/tree/Dotnet-Backend" target='_blank'>AMRP ASP.NET</a>
            <a href="https://programmablesearchengine.google.com/" target='_blank'>Custom Serach Engine</a>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <a href="https://www.linkedin.com/in/abin-k-732a18136/" target='_blank'>LinkedIn</a>
            <a href="https://www.linkedin.com/in/asprakash9/" target='_blank'>LinkedIn</a>
          </div>
          <div class='footer-link-items'>
            <h2>Page Details</h2>
            {
              loading ? 
              <p>Loading...</p> : 
              generalCount.map((count, index) => (
                <>
                <p>{count.nomovies}   MOVIES | {count.noactors} ACTORS</p>
                <p>{count.nowriters} WRITERS | {count.nodirectors} DIRECTORS | {count.nowriters} WRITERS</p>
                </>
              ))
              
            }
          </div>
        </div>
        
      </div>
      <section class='row d-flex align-items-center'>
        <div class='social-media-wrap'>
          <div class='d-flex'>
            <Link to='/' style={{"color": "white"}} className='social-logo'>
              AMRP
            </Link>
          </div>
          </div>
      </section>
    </div>
        </>
    );
}

export default Footer;