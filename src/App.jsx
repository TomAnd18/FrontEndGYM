import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function handleClickMore() {
    if (count < 100) {
      setCount(count + 1);
    }
  }

  function handleClickLess() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={ handleClickLess }> ➖ </button>
        <span style={{ margin: '0 1rem', background: '#1a1a1a', padding: '10px', borderRadius: '8px' }}> {count} </span>
        <button onClick={ handleClickMore }> ➕ </button> <br></br><br></br>
        <button onClick={() => setCount(0)}> Reset </button>
      </div>
    </>
  )
}

export default App
