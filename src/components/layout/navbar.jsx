import { useState } from 'react'
import { Tabs, TabList, Tab, extendTheme, ChakraProvider } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        customRed: {
            50: '#ffe5e5',
            900: '#660000',
        },
        customTeal: {
            50: '#e6fffa',
            900: '#004d40',
        },
        customBlue: {
            50: '#e3f2fd',
            900: '#0d47a1',
        },
    },
})

function Links() {
    const [tabIndex, setTabIndex] = useState(0)
    const bg = ['customRed.50', 'customTeal.50', 'customBlue.50'][tabIndex]
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

function App() {
    return (
        <ChakraProvider theme={customTheme}>
            <Links />
        </ChakraProvider>
    )
}

export default App