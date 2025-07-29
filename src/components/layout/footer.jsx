import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer bg-gray-100">
            <div className="footer-social max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8" >
                <p>&copy; {new Date().getFullYear()} Style-Sheet. All rights reserved.</p>
                <hr />
            </div>
        </footer>
    );
};

export default Footer;
