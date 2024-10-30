import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Tabs, TabList, Tab, useColorModeValue,  Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button} from '@chakra-ui/react'
import Register from './Register';

function Home() {
    const colors = [
        ['#ffe5e5', '#e6fffa', '#ebf8ff'],
        ['#7f1d1d', '#234e52', '#2a4365']
    ];
    const [tabIndex, setTabIndex] = useState(0);
    const bg = useColorModeValue(colors[0][tabIndex], colors[1][tabIndex]);
return (
    <Router>
        <Routes>
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
                                <MenuItem>Login</MenuItem>
                                <MenuItem onClick={() => window.location.href = '/register'}>Register</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </TabList>
            </Tabs>
        </div>
    </Router>
);
};
export default Home;
