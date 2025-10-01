import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Home, User, Settings, FileText, Mail, BarChart3, Calendar, HelpCircle,Menu,X} from 'lucide-react';
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">CompanyName</h2>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index} className="nav-item">
                  <a 
                    href={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`} // Conditionally add the 'active' class
                  >
                    <IconComponent className="nav-icon" size={20} />
                    <span className="nav-text">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Navbar;