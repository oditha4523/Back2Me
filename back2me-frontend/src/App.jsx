import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindItem from './pages/FindItem';
import ReportItem from './pages/ReportItem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<FindItem />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/services" element={<div>Services Page - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
