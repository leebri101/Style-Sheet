import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-social" >
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="xl" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} size="xl"/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="xl"/>
                </a>
            </div>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Style-Sheet. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Returns</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;


