import { Search, LogOut, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserAvatar } from '../services/avatarService';

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
              <img 
                src={getUserAvatar({
                  username: user.username,
                  name: user.name,
                  gender: user.gender,
                  avatar: user.avatar,
                  firstName: user.firstName
                })}
                alt={user.name || user.username}
                className="user-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  // Fallback to a default avatar if there's an error
                  e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4&radius=25';
                }}
              />
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
