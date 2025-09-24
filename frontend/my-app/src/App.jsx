import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Networks from './components/Networks';
import Home from './components/Home';
import Me from './components/Me';

function App() {
  const [Form, setForm] = useState(false)

  return (
    <BrowserRouter>
      <div>
        {/* Header with blue background */}
        <div className='bg-blue-300 flex justify-evenly '>
          <div className='flex gap-10 text-center'>
            <h1 className='mt-2'>
              <span>logo</span>
              <span className='bg-linear-to-r from-cyan-500 to-blue-500'>Planor</span>
            </h1>
            <input className='rounded-20% bg-white "border-2 border-black border-2 rounded-md font-serif'
            placeholder='Search Profile...' type='text'/>
          </div>
          <div className=''>
            <nav className='flex gap-10 text-center '>
              <Link to="/" className='border-2 border-black rounded-md p-2 m-2 bg-white'>Home</Link>
              <Link to="/components/Networks" className='border-2 border-black rounded-md p-2 m-2 bg-white'>Connect</Link>
              <Link to="/components/Me" className='border-2 border-black rounded-md p-2 m-2 bg-white'>Me</Link>
            </nav>
          </div>
        </div>

        {/* Content area below the blue header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/Networks" element={<Networks />} />
          <Route path='/components/Me' element={<Me />}/>
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
