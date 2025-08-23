import { useState } from 'react'
import '../../styles/components/Sidebar.css'

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({
    utilities: false,
    'utilities-water': false,
    'fire-system': false,
    'electrical-system': false,
    helpdesk: false
  })

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'manpower', label: 'Man Power', icon: '👥', hasSubCategories: true },
    { id: 'blocks', label: 'Blocks', icon: '🏢', hasSubCategories: true },
    {
      id: 'utilities',
      label: 'Utilities',
      icon: '🔧',
      hasSubCategories: true,
      subCategories: [
        {
          id: 'utilities-water',
          label: 'Water System',
          hasSubCategories: true,
          subCategories: [
            { id: 'wtp', label: 'WTP' },
            { id: 'stp', label: 'STP' },
            { id: 'borewell', label: 'Borewell System' },
            { id: 'dewatering', label: 'Dewatering System' },
            { id: 'subsoil', label: 'Subsoil System' }
          ]
        },
        { id: 'garbage', label: 'Garbage System' }
      ]
    },
    {
      id: 'fire-system',
      label: 'Fire System',
      icon: '🔥',
      hasSubCategories: true,
      subCategories: [
        { id: 'fas', label: 'FAS' },
        { id: 'fps', label: 'FPS' },
        { id: 'basementventilation', label: 'Basement Ventilation' }
      ]
    },
    {
      id: 'electrical-system',
      label: 'Electrical System',
      icon: '⚡',
      hasSubCategories: true,
      subCategories: [
        { id: 'dg', label: 'DG - 3rd Party' },
        { id: 'solar', label: 'Solar - 3rd Party' },
        { id: 'street-light', label: 'Street Light' },
        { id: 'gate', label: 'Gate - 3rd Party' },
        { id: 'tneb', label: 'TNEB Service Log' }
      ]
    },
    {
      id: 'helpdesk',
      label: 'Helpdesk',
      icon: '💬',
      hasSubCategories: true,
      subCategories: [
        { id: 'complaint-calls', label: 'Complaint Calls' }
      ]
    }
  ]

  const handleDropdownToggle = (id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const renderSubCategories = (subCategories, parentId = '') => (
    <div className="sidebar-subcategories">
      {subCategories.map(sub => (
        <div key={sub.id}>
          {sub.hasSubCategories ? (
            <>
              <button
                className={`nav-item sub-dropdown ${openDropdowns[sub.id] ? 'active' : ''}`}
                onClick={() => handleDropdownToggle(sub.id)}
                style={{ fontWeight: 'bold', marginLeft: 16 }}
              >
                <span className="nav-label">{sub.label}</span>
                <span style={{ marginLeft: 'auto' }}>{openDropdowns[sub.id] ? '▼' : '▶'}</span>
              </button>
              {openDropdowns[sub.id] && renderSubCategories(sub.subCategories, sub.id)}
            </>
          ) : (
            <button
              className={`nav-item sub-item ${activeCategory === sub.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(sub.id)}
              style={{ marginLeft: 32 }}
            >
              <span className="nav-label">{sub.label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  )

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
          <div key={item.id}>
            {item.hasSubCategories ? (
              <>
                <button
                  className={`nav-item ${openDropdowns[item.id] ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle(item.id)}
                  title={isCollapsed ? item.label : ''}
                  style={{ fontWeight: 'bold' }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  {!isCollapsed && (
                    <span style={{ marginLeft: 'auto' }}>{openDropdowns[item.id] ? '▼' : '▶'}</span>
                  )}
                </button>
                {openDropdowns[item.id] && !isCollapsed && renderSubCategories(item.subCategories, item.id)}
              </>
            ) : (
              <button
                className={`nav-item ${activeCategory === item.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar