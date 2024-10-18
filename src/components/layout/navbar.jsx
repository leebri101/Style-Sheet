import { useState } from 'react'
import {Tabs, TabList, Tab, useColorMode,  Menu, MenuButton, MenuItem, MenuGroup, MenuList, Button} from '@chakra-ui/react'


function Links() {
  const { colorMode } = useColorMode();
  const lightColors = ['#ffe5e5', '#e6fffa', '#ebf8ff'];
  const darkColors = ['#7f1d1d', '#234e52', '#2a4365'];
  const colors = colorMode === 'light' ? lightColors : darkColors;
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <div>
      <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList style={{ position: 'relative' }}>
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


