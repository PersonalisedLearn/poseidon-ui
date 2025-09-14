import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import './App.css';

// Main App component with routing setup
function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Feed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;