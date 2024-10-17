import {Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button } from '@chakra-ui/react'

const Home = () => {
    return (
        <div>
            <h1>Style-Sheet</h1>
            <p>Find all the unique styles that you need right here... </p>
            <Menu>
                <MenuButton as={Button}>
                    Account
                </MenuButton>
                <MenuList>
                    <MenuGroup>
                        <MenuItem>Login</MenuItem>
                        <MenuItem>Register</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Home;
