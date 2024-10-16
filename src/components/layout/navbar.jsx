import { useState } from 'react'
import { Tabs, TabList, Tab,  useColorMode } from '@chakra-ui/react'

function Links() {
    const colors = useColorMode(
      ['red.50', 'teal.50', 'blue.50'],
      ['red.900', 'teal.900', 'blue.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
    return (
      <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList>
          <Tab>Products</Tab>
          <Tab>My Styles(Wishlist)</Tab>
          <Tab>Basket</Tab>
          <Tab>Login/Register</Tab>
        </TabList>
      </Tabs>
    )
  }

export default Links
