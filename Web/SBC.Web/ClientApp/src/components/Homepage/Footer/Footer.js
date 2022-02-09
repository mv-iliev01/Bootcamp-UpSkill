import React from "react"

import FooterFigure from "../../assets/Path 8.png";
import FooterLOGO from "../../assets/Group 5.png";
import FacebookImg from "../../assets/Group 12.png";
import InstagramImg from "../../assets/Group 13.png";
import LinkedInImg from "../../assets/Group 14.png"
import { Link } from "react-router-dom";
import './Footer.css';

function FooterMenu() {
    return (
        <footer className="FooterMain">
            <img src={FooterFigure} />
            <ul>
                <li><h1 className="LogoHeader">upskill</h1></li>
                <li>  <img src={FooterLOGO} className="Logo" /></li>
                <li><p className="LogoText">Upskill gives everyone the opportunity to grow professionally and develop into a specialist in every field.</p></li>
                <li><Link to="/get-started"><button className="ButtonGetStarted">Get Started</button></Link></li>
            </ul>
            <ul>
                <li> <Link to="/company"><h3 className="Company">Company</h3></Link></li>
                <li><Link to="/about-us"><h3 className="AboutUs">About us</h3></Link></li>
                <li><Link to="/contact-us"><h3 className="ContactUs">Contact Us</h3></Link></li>
                <li><Link to="/privacy-policy"><h3 className="PrivacyPolicy">Privacy Policy</h3></Link></li>
            </ul>
            <ul>
                <li><Link to="/services"><h3 className="Services">Services</h3></Link></li>
                <li><Link to="/courses"><h3 className="Courses">Courses</h3></Link></li>
                <li><Link to="/coaches"><h3 className="Coaches">Coaches</h3></Link></li>
                <li><Link to="/requests"><h3 className="Requests">Requests</h3></Link></li>
            </ul>
            <ul>
                <li>  <Link to="/"><img src={FacebookImg} className="FacebookLogo" /></Link></li>
                <li>  <Link to="/"><img src={InstagramImg} className="InstagramLogo" /></Link> </li>
                <li>  <Link to="/"><img src={LinkedInImg} className="LinkedInLogo" /></Link></li>
            </ul>
            <div className='bottomDiv'>
                <p className="TextOnBottom">&copy; UpSkill {(new Date().getFullYear())}</p>
            </div>
        </footer>
    );
}

export default FooterMenu;