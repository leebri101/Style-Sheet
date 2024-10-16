import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function tab() {
    const colors = useColorModeValue(
      ['red.50', 'teal.50', 'blue.50'],
      ['red.900', 'teal.900', 'blue.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
    return (
      <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList>
          <Tab>Mens</Tab>
          <Tab>Women</Tab>
          <Tab>Kids</Tab>
        </TabList>
        <TabPanels p='2rem'>
          <TabPanel>Mens</TabPanel>
          <TabPanel>Women</TabPanel>
          <TabPanel>Kids</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

export default tab