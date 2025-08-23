import { useState } from 'react'
import '../../styles/components/Sidebar.css'

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'manpower', label: 'Man Power', icon: '👥', hasSubCategories: true },
    { id: 'blocks', label: 'Blocks', icon: '🏢', hasSubCategories: true },
    { id: 'utilities', label: 'Utilities', icon: '🔧', hasSubCategories: true },
    { id: 'fire-system', label: 'Fire System', icon: '🔥', hasSubCategories: true },
    { id: 'electrical-system', label: 'Electrical System', icon: '⚡', hasSubCategories: true },
    { id: 'helpdesk', label: 'HelpDesk', icon: '💬', hasSubCategories: true }
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏢</span>
          {!isCollapsed && <span className="logo-text">IoT Dashboard</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeCategory === item.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
