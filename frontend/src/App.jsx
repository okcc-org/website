/* import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx'; // this is your current App.jsx logic
import Register from './Register.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import Homepage from './pages/Test';
import Register from './pages/Register'; // ✅ Add this
import AboutPage from './pages/AboutPage'; 
import Classes from './pages/Classes';
import LanguageClass from './pages/LanguageClass';
import GroupTutoring from './pages/GroupTutoring';
import TravelerClass from './pages/TravelerClass';
import PaymentSuccess from './pages/PaymentSuccess';



const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} /> {/* ✅ New route */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/language-class" element={<LanguageClass />} />
        <Route path="/classes/group-tutoring" element={<GroupTutoring />} />
        <Route path="/classes/traveler-class" element={<TravelerClass />} />
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;
