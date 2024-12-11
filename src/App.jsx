import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tabs, TabList, Tab, useColorMode, Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUser , faHeartCirclePlus, faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Register from "./components/user/Register";
import Footer from './components/layout/footer'; // Ensure this path is correct
import Products from './components/products/Products'; // Ensure this path is correct


function App() {
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <div className="app-container">
      <h1>Style-Sheet</h1>
      <div className="tabs-container">
        <div className='logo' onClick={() => window.location.href= '/'}>
          <img src="src/assets/images/logo.png" alt="Logo" style={{ cursor: 'pointer' }} />
        </div>
        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Tab mr={5} onClick={() => window.location.href= '/search'}>
              <FontAwesomeIcon icon={faMagnifyingGlassDollar} size="xl"/>
            </Tab>
            <Tab mr={5} onClick={() => window.location.href= '/favorites'}>
              <FontAwesomeIcon icon={faHeartCirclePlus} size="xl"/>
            </Tab>
            <Tab mr={5} onClick={() => window.location.href= '/basket'}>
              <FontAwesomeIcon icon={faShoppingBasket} size="xl"/>
            </Tab>
            <Menu>
              <MenuButton as={Button}>
                <FontAwesomeIcon icon={faUser } size="xl"/>
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
        </Tabs>
      </div>
      <div className="routes-container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          {/* Add other routes here */}
          <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;