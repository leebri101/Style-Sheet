import { Link } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingBasket, faHeartCirclePlus, faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function Navbar() {
  return (
    <Flex as="nav" className="navbar">
      <Link to="/" className="navbar-link">
        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faHouse} size="xl" />}>
        </Button>
      </Link>
      <Link to="/search" className="navbar-link">
        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlassDollar} size="xl" />}>
        </Button>
      </Link>
      <Link to="/favorites" className="navbar-link">
        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faHeartCirclePlus} size="xl" />}>
        </Button>
      </Link>
      <Link to="/basket" className="navbar-link">
        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faShoppingBasket} size="xl" />}>
        </Button>
      </Link>
    </Flex>
  );
}

export default Navbar;
