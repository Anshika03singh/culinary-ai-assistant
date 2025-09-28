import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthModal from './components/AuthModal'; // Import the modal
import { useAuth } from './context/AuthContext'; // Import useAuth

function App() {
  // Get the modal state and the close function from our central context
  const auth = useAuth();

  // It's good practice to wait until the context is ready
  if (!auth) {
    return null; // Or show a loading spinner
  }
  
  const { isModalOpen, closeAuthModal } = auth;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      {/* This line will now show or hide the modal based on the global state */}
      <AuthModal isOpen={isModalOpen} onClose={closeAuthModal} />
    </div>
  );
}

export default App;

