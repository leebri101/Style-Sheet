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
          <Route path="/register" element={<Register />} />
        </Routes>
      <div>
        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Tab mr={10}>Products</Tab>
            <Tab mr={10}>My Styles</Tab>
            <Tab mr={10}>Basket</Tab>
            <Menu>
              <MenuButton as={Button}>
                Account
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Login</MenuItem>
                  <MenuItem>Logout</MenuItem>
                  <MenuItem onClick={() => window.location.href = '/register'}>Register</MenuItem>
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
