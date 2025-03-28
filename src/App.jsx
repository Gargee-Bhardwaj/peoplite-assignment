import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  // Track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Set the user as authenticated
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center mx-2">
      {!isAuthenticated && (
        <div className="tabs flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md cursor-pointer"
            onClick={() => navigate('/')}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={!isAuthenticated ? <SignIn onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Home route */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home onSignOut={handleSignOut} /> : <Navigate to="/" />} // Redirect to Sign In if not authenticated
        />
      </Routes>
    </div>
  );
}

export default App;
