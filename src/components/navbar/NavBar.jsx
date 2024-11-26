import { Link } from 'react-router-dom';
import { Flex, Button, Tab, TabList, Menu, MenuButton, MenuItem, MenuGroup, MenuList} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingBasket, faHeartCirclePlus, faMagnifyingGlassDollar, faUser} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
return (
    <Flex as="nav" className="navbar">
            <TabList>
                <Tab>
                    <Link to="/" className="navbar-link">
                        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faHouse} size="xl" />}>
                        </Button>
                    </Link>
                </Tab>
                <Tab>
                    <Link to="/search" className="navbar-link">
                        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlassDollar} size="xl" />}>
                        </Button>
                    </Link>
                </Tab>
                <Tab>
                    <Link to="/favorites" className="navbar-link">
                        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faHeartCirclePlus} size="xl" />}>
                        </Button>
                    </Link>
                </Tab>
                <Tab>
                    <Link to="/basket" className="navbar-link">
                        <Button variant="ghost" className="navbar-button" leftIcon={<FontAwesomeIcon icon={faShoppingBasket} size="xl" />}>
                        </Button>
                    </Link>
                </Tab>
                <Menu>
              <MenuButton as={Button}><FontAwesomeIcon icon={faUser} size="xl"/>
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem mb={3.5}>Profile</MenuItem>
                  <MenuItem mb={3.5}>Login</MenuItem>
                  <MenuItem mb={3.5}>Logout</MenuItem>
                  <MenuItem mb={3.5} onClick={() => window.location.href = '/register'}>Register</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            </TabList>
    </Flex>
);
}

export default Navbar;
