import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindItem from './pages/FindItem';
import ReportItem from './pages/ReportItem';
import ReportItemForm from './components/ReportItemForm';
import LearnMoreModal from './components/LearnMoreModal';
import LoginRegister from './pages/LoginRegister';
import Profile from './components/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<FindItem />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/services" element={<div>Services Page - Coming Soon</div>} />
        <Route path="/reportItemForm" element={<ReportItemForm/>} />
        <Route path="/reportItemLearnMore" element={<LearnMoreModal/>} />
        <Route path="/login" element={<LoginRegister/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
