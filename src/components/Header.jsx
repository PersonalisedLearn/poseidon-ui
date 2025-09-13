import { Search, Plus } from 'lucide-react'

const Header = ({ currentUser }) => {
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
        
        <div className="header-actions">
          <button className="post-btn">
            <Plus size={20} />
            <span>Post</span>
          </button>
          
          <div className="user-menu">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="header-avatar"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
