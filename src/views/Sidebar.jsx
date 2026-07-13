import React from 'react';
import { LayoutGrid, Compass, Award, FolderOpen } from 'lucide-react';
import '../components/Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutGrid },
    { id: 'roadmap', name: 'Roadmap', icon: Compass },
    { id: 'premium', name: 'Premium', icon: Award },
    { id: 'resources', name: 'Resources', icon: FolderOpen },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-edu">Edu</span>
        <span className="logo-flow">Flow</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                <Icon size={20} />
              </div>
              <span>{item.name}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
