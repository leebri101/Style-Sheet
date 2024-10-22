import { useState } from 'react'
import './App.css'
import Home from "./components/homepage/Home"
import NavBar from "./components/layout/NavBar";


function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Home />
      <NavBar />
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

