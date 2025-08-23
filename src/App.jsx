import { useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Dashboard from './pages/Dashboard'
import ManPower from './pages/ManPower'
import Blocks from './pages/Blocks'
import WTP from './pages/utilities/WTP'
import STP from './pages/utilities/STP'
import Borewell from './pages/utilities/Borewell'
import Dewatering from './pages/utilities/Dewatering'
import Subsoil from './pages/utilities/Subsoil'
import Garbage from './pages/utilities/Garbage'
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
      case 'wtp':
        return <WTP /> 
      case 'stp':
        return <STP /> 
      case 'borewell':
        return <Borewell />
      case 'dewatering':
        return <Dewatering />
      case 'subsoil':
        return <Subsoil />
      case 'garbage':
        return <Garbage />
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
