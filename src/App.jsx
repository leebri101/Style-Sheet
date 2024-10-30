import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Tabs, TabList, Tab, useColorMode,  Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button} from '@chakra-ui/react'

import './App.css'
import Home from "./components/homepage/Home";
import Register from "./components/user/Register";


function App() {
  const [count, setCount] = useState(0);
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <main className="card">
        <br />
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </main>
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
                  <MenuItem>Login</MenuItem>
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
