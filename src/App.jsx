import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/NavBar'
import Home from './components/homepage/Home';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Home />
      <Navbar />
      <main className="card">
        <br />
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </main>
    </div>
  );
}

export default App;

