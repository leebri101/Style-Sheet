import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.css'

const Footer = () => {
    return (
        <footer className="footer bg-gray-100">
            <div className="footer-social max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8" >
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
                    <a href="/about-us" className="text-base text-gray-500 hover:text-gray-900">About Us</a> |
                    <a href="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</a> |
                    <a href="/returns" className="text-base text-gray-500 hover:text-gray-900">Returns</a> 
                </div>
            </div>
        </footer>
    );
};

export default Footer;
