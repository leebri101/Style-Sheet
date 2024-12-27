import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-social" >
                <p>&copy; {new Date().getFullYear()} Style-Sheet. All rights reserved.</p>
                <hr />
                <br />
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> 
                <FontAwesomeIcon icon={faFacebook} size="xl" /> 
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} size="xl"/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="xl"/>
                </a>
                <br />
                <div className="other-container">
                    <a href="/about-us">About Us</a> |
                    <a href="/contact">Contact</a> |
                    <a href="/privacy">Returns</a> 
                </div>
            </div>
        </footer>
    );
};

export default Footer;


