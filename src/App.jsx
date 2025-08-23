import { useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Dashboard from './pages/Dashboard'
import ManPower from './pages/ManPower'
import Blocks from './pages/Blocks'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('dashboard')

  const renderContent = () => {
    switch (activeCategory) {
      case 'dashboard':
        return <Dashboard />
      case 'manpower':
        return <ManPower />
      case 'blocks':
        return <Blocks />
      case 'utilities':
        return <div className="coming-soon">Utilities - Coming Soon</div>
      case 'fire-system':
        return <div className="coming-soon">Fire System - Coming Soon</div>
      case 'electrical-system':
        return <div className="coming-soon">Electrical System - Coming Soon</div>
      case 'helpdesk':
        return <div className="coming-soon">HelpDesk - Coming Soon</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
