import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tabs, TabList, useColorMode} from '@chakra-ui/react';
import './App.css';
import Home from "./components/homepage/Home";
import Register from "./components/user/Register";
import Footer from './components/layout/Footer';
import Navbar from './components/navbar/NavBar';

function App() {
  const colors = useColorMode(
    ['#ffe5e5', '#e6fffa', '#ebf8ff'],
    ['#7f1d1d', '#234e52', '#2a4365']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <div className="app-container">
      <div className="tabs-container">
        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Navbar />
          </TabList>
        </Tabs>
      </div>
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/product" element={<Product />*/}
          {/*<Route path="/basket" element={<Basket />*/}
          {/*<Route path="/profile" element={<Profile />*/}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;