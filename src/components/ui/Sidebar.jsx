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
    { id: 'manpower', label: 'Man Power', icon: '👥' },
    { id: 'blocks', label: 'Blocks', icon: '🏢' },
    {
      id: 'utilities',
      label: 'Utilities',
      icon: '🔧',
      subCategories: [
        {
          id: 'utilities-water',
          label: 'Water System',
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
      subCategories: [{ id: 'complaint-calls', label: 'Complaint Calls' }]
    }
  ]

  const toggle = (id) =>
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }))

  // Recursive submenu (animation needs the container always mounted)
  const SubMenu = ({ list, parentId }) => (
    <div className={`sidebar-subcategories ${openDropdowns[parentId] ? 'open' : ''}`}>
      {list.map(sub => {
        const hasChildren = Array.isArray(sub.subCategories) && sub.subCategories.length > 0
        return (
          <div key={sub.id}>
            {hasChildren ? (
              <>
                <button
                  className={`nav-item sub-dropdown ${openDropdowns[sub.id] ? 'active' : ''}`}
                  onClick={() => toggle(sub.id)}
                >
                  <span className="nav-label">{sub.label}</span>
                  <span className="dropdown-arrow">{openDropdowns[sub.id] ? '▼' : '▶'}</span>
                </button>
                <SubMenu list={sub.subCategories} parentId={sub.id} />
              </>
            ) : (
              <button
                className={`nav-item sub-item ${activeCategory === sub.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(sub.id)}
              >
                <span className="nav-label">{sub.label}</span>
              </button>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏢</span>
          {!isCollapsed && <span className="logo-text">IoT Dashboard</span>}
        </div>
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map(item => {
          const hasChildren = Array.isArray(item.subCategories) && item.subCategories.length > 0
          return (
            <div key={item.id}>
              {hasChildren ? (
                <>
                  <button
                    className={`nav-item ${openDropdowns[item.id] ? 'active' : ''}`}
                    onClick={() => toggle(item.id)}
                    title={isCollapsed ? item.label : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    {!isCollapsed && <span className="dropdown-arrow">
                      {openDropdowns[item.id] ? '▼' : '▶'}
                    </span>}
                  </button>

                  {!isCollapsed && (
                    <SubMenu list={item.subCategories} parentId={item.id} />
                  )}
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
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
