import { Search } from 'lucide-react';

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
