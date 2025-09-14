import { Home, User, MessageCircle, Bell, Bookmark, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import poseidonIcon from '../assets/poseidonIcon.png';

const SmallIcon = styled.img`
  width: 80px;
  height: 80px;
  filter: invert(1);
  margin-right: 12px;
`;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo w-full flex justify-center items-center py-4">
          <div className="w-20 h-20 flex items-center justify-center">
            <SmallIcon src={poseidonIcon} alt="Poseidon" className="max-w-full max-h-full" />
          </div>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
