import { useState } from 'react'
import {Tabs, TabList, Tab, useColorMode } from '@chakra-ui/react'


function Links() {
    const colors = useColorMode(
      ['#ffe5e5', '#e6fffa', '#ebf8ff'], // Light mode colors in hex custom colors
      ['#7f1d1d', '#234e52', '#2a4365'], // Dark mode colors in hex custom colors
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
return (
  <div style={{ position: 'relative' }}>
    <Tabs Change={(index) => setTabIndex(index)} bg={bg}>
      <TabList>
        <Tab style={{ color: '#ff0000' }} mr={5}>Products</Tab>
        <Tab style={{ color: '#008080' }} mr={5}>My Styles</Tab>
        <Tab style={{ color: '#2a4365' }} mr={5}>Basket</Tab>
      </TabList>
    </Tabs>
  </div>
)
  }
export default Links


