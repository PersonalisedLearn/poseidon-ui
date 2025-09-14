import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider, useUser } from './context/UserContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Settings from './components/Settings';
import LoginOverlay from './components/LoginOverlay';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App content
const AppContent = () => {
  const { user, isLoading } = useUser();
  const [showLogin, setShowLogin] = useState(!user && !isLoading);

  useEffect(() => {
    if (!isLoading) {
      setShowLogin(!user);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <>
      <div className="app">
        {user && <Sidebar />}
        <div className={`main-content ${!user ? 'ml-0' : ''}`}>
          {user && <Header />}
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginOverlay />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

// App wrapper with providers
function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;