import { Home, User, MessageCircle, Bell, Bookmark, Settings, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ currentUser }) => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <h1>Poseidon</h1>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="user-profile">
          <div className="user-info">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-username">@{currentUser.username}</div>
              <div className={`user-type ${currentUser.type}`}>
                {currentUser.type === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}
              </div>
            </div>
          </div>
          <button className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
