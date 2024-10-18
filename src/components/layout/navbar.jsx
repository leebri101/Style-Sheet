import { useState } from 'react'
import {Tabs, TabList, Tab, useColorMode,  Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button} from '@chakra-ui/react'

function Links() {
  const  colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
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
                <MenuItem>Register</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </TabList>
      </Tabs>
    </div>
  );
}
export default Links


