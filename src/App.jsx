import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import {Tabs, TabList, Tab, useColorMode,  Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button} from '@chakra-ui/react'
import './App.css'
import Home from "./components/homepage/Home";
import Register from "./components/user/Register";


function App() {
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
        {/*<Route path="/product" element={<Product />*/}
        {/*<Route path="/basket" element={<Basket />*/}
        {/*<Route path="/profile" element={<Profile />*/}
          <Route path="/register" element={<Register />} />
        </Routes>
      <div>
        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Tab mr={5}>Products</Tab>
            <Tab mr={5}>My Styles</Tab>
            <Tab mr={5}>Basket</Tab>
            <Menu>
              <MenuButton as={Button}>
                Account
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem mb={3.5}>Profile</MenuItem>
                  <MenuItem mb={3.5}>Login</MenuItem>
                  <MenuItem mb={3.5}>Logout</MenuItem>
                  <MenuItem mb={3.5}onClick={() => window.location.href = '/register'}>Register</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </TabList>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
