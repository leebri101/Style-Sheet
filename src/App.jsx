import { useState } from 'react'; 
import { Routes, Route, useNavigate, } from 'react-router-dom';
import { Tabs, TabList, Tab, useColorMode, Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUser , faHeartCirclePlus, faMagnifyingGlass, faShirt } from '@fortawesome/free-solid-svg-icons';
import Register from "./components/user/Register";
import Footer from './components/layout/Footer'; 
import Logo from './components/ui/Logo';
import Header from './components/layout/Header';
import './App.css';

function App() {
  const navigate = useNavigate();
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  //const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  const handleTabChange = (index) => {
    setTabIndex(index);
    switch (index) {
      case 0:
        navigate('/search');
        break;
      case 1:
        navigate('/favorites');
        break;
      case 2:
        navigate('/basket');
        break;
      case 3:
        navigate('/products');
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="tabs-container">
        <Tabs onChange={handleTabChange} bg={bg}>
          <TabList>
            <div onClick={() => navigate('/')}>
              <Logo />
            </div>
            <Tab mr={5} onClick={() => navigate('/search')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
            </Tab>
            <Tab mr={5} onClick={() => navigate('/wishlist')}>
              <FontAwesomeIcon icon={faHeartCirclePlus} size="2xl" />
            </Tab>
            <Tab mr={5} onClick={() => navigate('/basket')}>
              <FontAwesomeIcon icon={faShoppingBasket} size="2xl" />
            </Tab>
            <Tab mr={5} onClick={() => navigate('/products')}>
            <FontAwesomeIcon icon={faShirt} size="2xl"/>
            </Tab>
            <Menu>
              <MenuButton as={Button} variant="solid" size="md">
                <FontAwesomeIcon icon={faUser} size="2xl" />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem mb={3.5}>Profile</MenuItem>
                  <MenuItem mb={3.5}>Login</MenuItem>
                  <MenuItem mb={3.5}>Logout</MenuItem>
                  <MenuItem mb={3.5} onClick={() => navigate('/register')}>Register</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </TabList>
        </Tabs>
      </div>
      <div className="routes-container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>404 Not Found</ div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;