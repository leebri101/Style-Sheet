import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, useColorMode, Menu, MenuButton, MenuItem, MenuGroup, MenuList } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUser , faHeartCirclePlus, faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Register from "./components/user/Register";
import Footer from './components/layout/footer'; // Ensure this path is correct
import Products from './components/products/Products'; // Ensure this path is correct
import Button from './components/ui/button'; // Ensure this path is correct

function App() {
  const navigate = useNavigate(); // Use the useNavigate hook
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
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
      default:
        break;
    }
  };

  return (
    <div className="app-container">
      <h1>Style-Sheet</h1>
      <div className="tabs-container">
        <div className='logo' onClick={() => navigate('/')}>
          <img src="src/assets/images/logo.png" alt="Logo" style={{ cursor: 'pointer' }} />
        </div>
        <Tabs onChange={handleTabChange} bg={bg}>
          <TabList>
            <Tab mr={5}>
              <FontAwesomeIcon icon={faMagnifyingGlassDollar} size="xl" />
            </Tab>
            <Tab mr={5}>
              <FontAwesomeIcon icon={faHeartCirclePlus} size="xl" />
            </Tab>
            <Tab mr={5}>
              <FontAwesomeIcon icon={faShoppingBasket} size="xl" />
            </Tab>
            <Menu>
              <MenuButton as={Button} variant="solid" size="md">
                <FontAwesomeIcon icon={faUser } size="xl" />
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
          <Route path="/products" element={<Products />} />
          {/* Add other routes here */}
          <Route path="*" element={<div>404 Not Found</ div>} /> {/* Fallback route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;