import { Search, LogOut, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Poseidon..." 
            className="search-input"
          />
        </div>
        
        {user && (
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                <User size={16} className="text-white" />
              </div>
              <span className="username">{user.name || user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
