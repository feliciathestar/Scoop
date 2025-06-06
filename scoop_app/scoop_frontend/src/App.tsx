import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GeneratePodcast from './pages/GeneratePodcast';
import { TransitionProvider } from './context/TransitionContext';
import PageTransition from './components/PageTransition';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';

const App: React.FC = () => {
  return (
    <Router>
      <TransitionProvider>
        <Header />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/generate-podcast" element={<GeneratePodcast />} />
            {/* Add more routes as needed */}
          </Routes>
        </PageTransition>
        <Footer />
      </TransitionProvider>
    </Router>
  );
};

export default App;
