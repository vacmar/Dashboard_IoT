import { useState, useEffect } from 'react'
import '../styles/components/MetricCard.css'
import '../styles/pages/Blocks.css'

const Blocks = () => {
  const [selectedBlock, setSelectedBlock] = useState('Block 1')
  const [blockData, setBlockData] = useState({})

  // Block configurations
  const blocks = [
    'Block 1',
    'Block 2', 
    'Block 3',
    'Block 4',
    'Block 5',
    'Block 6',
    'Block 7',
    'Block 8'
  ]

  // Generate IoT sensor data for each block
  useEffect(() => {
    const generateBlockData = () => {
      const data = {}
      
      blocks.forEach((block, index) => {
        data[block] = {
          // Tank Levels (3 tanks: fire, flush, water)
          waterTanks: {
            fire: Math.floor(30 + Math.random() * 50), // 30-80%
            flush: Math.floor(20 + Math.random() * 60), // 20-80%
            water: Math.floor(60 + Math.random() * 30) // 60-90%
          },
          
          // Pressure Systems (BAR)
          pressure: {
            shaft1: (1.5 + Math.random() * 2).toFixed(1), // 1.5-3.5 BAR
            shaft2: (3.0 + Math.random() * 3).toFixed(1), // 3.0-6.0 BAR
            terraceBooster: (2.0 + Math.random() * 4).toFixed(1) // 2.0-6.0 BAR
          },
          
          // Lift Status (Floor numbers, door status, movement direction)
          lifts: {
            lift1: {
              floor: Math.floor(1 + Math.random() * 15), // 1-15 floors
              movement: Math.random() > 0.5 ? 'UP' : Math.random() > 0.5 ? 'DOWN' : 'IDLE',
              door: 'CLOSED' // Will be set correctly below
            },
            lift2: {
              floor: Math.floor(1 + Math.random() * 15),
              movement: Math.random() > 0.5 ? 'UP' : Math.random() > 0.5 ? 'DOWN' : 'IDLE',
              door: 'CLOSED'
            },
            lift3: {
              floor: Math.floor(1 + Math.random() * 15),
              movement: Math.random() > 0.5 ? 'UP' : Math.random() > 0.5 ? 'DOWN' : 'IDLE',
              door: 'CLOSED'
            },
            lift4: {
              floor: Math.floor(1 + Math.random() * 15),
              movement: Math.random() > 0.5 ? 'UP' : Math.random() > 0.5 ? 'DOWN' : 'IDLE',
              door: 'CLOSED'
            }
          },
          
          // System Status
          systems: {
            electricity: Math.random() > 0.2 ? 'Healthy' : 'Warning',
            terraceDoor: Math.random() > 0.3 ? 'CLOSED' : 'OPEN',
            towerLight: Math.random() > 0.4 ? 'ON' : 'OFF',
            inverterUPS: Math.random() > 0.2 ? 'EB' : 'UPS',
            aviationLight: Math.random() > 0.3 ? 'ON' : 'OFF'
          }
        }
      })
      
      // Apply safety rules for lift doors after all data is generated
      blocks.forEach(block => {
        Object.values(data[block].lifts).forEach(lift => {
          // Safety rule: Door must be closed when moving, can be open when idle
          if (lift.movement !== 'IDLE') {
            lift.door = 'CLOSED'
          } else {
            lift.door = Math.random() > 0.4 ? 'CLOSED' : 'OPEN' // 60% closed, 40% open when idle
          }
        })
      })
      
      return data
    }

    setBlockData(generateBlockData())
  }, [])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockData(prevData => {
        const newData = { ...prevData }
        const currentBlock = newData[selectedBlock]
        
        if (currentBlock) {
          // Update tank levels (3 tanks)
          currentBlock.waterTanks.fire = Math.max(0, Math.min(100, 
            currentBlock.waterTanks.fire + (Math.random() - 0.5) * 5))
          currentBlock.waterTanks.flush = Math.max(0, Math.min(100, 
            currentBlock.waterTanks.flush + (Math.random() - 0.5) * 5))
          currentBlock.waterTanks.water = Math.max(0, Math.min(100, 
            currentBlock.waterTanks.water + (Math.random() - 0.5) * 3))
          
          // Update pressure readings
          currentBlock.pressure.shaft1 = Math.max(0, Math.min(6, 
            parseFloat(currentBlock.pressure.shaft1) + (Math.random() - 0.5) * 0.3)).toFixed(1)
          currentBlock.pressure.shaft2 = Math.max(0, Math.min(8, 
            parseFloat(currentBlock.pressure.shaft2) + (Math.random() - 0.5) * 0.4)).toFixed(1)
          currentBlock.pressure.terraceBooster = Math.max(0, Math.min(7, 
            parseFloat(currentBlock.pressure.terraceBooster) + (Math.random() - 0.5) * 0.3)).toFixed(1)
          
          // Randomly update lift floors, doors, and movement
          if (Math.random() > 0.7) {
            currentBlock.lifts.lift1.floor = Math.max(1, Math.min(15, 
              currentBlock.lifts.lift1.floor + (Math.random() > 0.5 ? 1 : -1)))
            currentBlock.lifts.lift1.movement = Math.random() > 0.6 ? 'UP' : Math.random() > 0.6 ? 'DOWN' : 'IDLE'
            // Safety rule: Door must be closed when moving
            currentBlock.lifts.lift1.door = currentBlock.lifts.lift1.movement !== 'IDLE' ? 'CLOSED' : 
              (Math.random() > 0.5 ? 'CLOSED' : 'OPEN')
          }
          if (Math.random() > 0.8) {
            currentBlock.lifts.lift2.floor = Math.max(1, Math.min(15, 
              currentBlock.lifts.lift2.floor + (Math.random() > 0.5 ? 1 : -1)))
            currentBlock.lifts.lift2.movement = Math.random() > 0.6 ? 'UP' : Math.random() > 0.6 ? 'DOWN' : 'IDLE'
            // Safety rule: Door must be closed when moving
            currentBlock.lifts.lift2.door = currentBlock.lifts.lift2.movement !== 'IDLE' ? 'CLOSED' : 
              (Math.random() > 0.5 ? 'CLOSED' : 'OPEN')
          }
          if (Math.random() > 0.75) {
            currentBlock.lifts.lift3.floor = Math.max(1, Math.min(15, 
              currentBlock.lifts.lift3.floor + (Math.random() > 0.5 ? 1 : -1)))
            currentBlock.lifts.lift3.movement = Math.random() > 0.6 ? 'UP' : Math.random() > 0.6 ? 'DOWN' : 'IDLE'
            // Safety rule: Door must be closed when moving
            currentBlock.lifts.lift3.door = currentBlock.lifts.lift3.movement !== 'IDLE' ? 'CLOSED' : 
              (Math.random() > 0.5 ? 'CLOSED' : 'OPEN')
          }
          if (Math.random() > 0.85) {
            currentBlock.lifts.lift4.floor = Math.max(1, Math.min(15, 
              currentBlock.lifts.lift4.floor + (Math.random() > 0.5 ? 1 : -1)))
            currentBlock.lifts.lift4.movement = Math.random() > 0.6 ? 'UP' : Math.random() > 0.6 ? 'DOWN' : 'IDLE'
            // Safety rule: Door must be closed when moving
            currentBlock.lifts.lift4.door = currentBlock.lifts.lift4.movement !== 'IDLE' ? 'CLOSED' : 
              (Math.random() > 0.5 ? 'CLOSED' : 'OPEN')
          }
        }
        
        return newData
      })
    }, 1000) // Update every 1 second (1 floor per second travel speed)

    return () => clearInterval(interval)
  }, [selectedBlock])

  const currentData = blockData[selectedBlock] || {}

  const getWaterTankColor = (level) => {
    if (level >= 70) return '#4CAF50' // Green
    if (level >= 40) return '#FF9800' // Orange  
    return '#F44336' // Red
  }

  const getPressurePercentage = (barValue) => {
    // Convert BAR to percentage (assuming max 6 BAR = 100%)
    return Math.min(100, (parseFloat(barValue) / 6) * 100)
  }

  const getPressureColor = (percentage) => {
    if (percentage >= 80) return '#F44336' // Red - High pressure
    if (percentage >= 60) return '#FF9800' // Orange - Medium-high
    if (percentage >= 40) return '#4CAF50' // Green - Normal
    if (percentage >= 20) return '#2196F3' // Blue - Low
    return '#9E9E9E' // Gray - Very low
  }

  const getSystemStatusColor = (status) => {
    if (status === 'Healthy' || status === 'ON' || status === 'EB' || status === 'CLOSED') {
      return '#4CAF50' // Green
    }
    return '#F44336' // Red
  }

  return (
    <div className="blocks-container">
      {/* Header with Block Selector */}
      <div className="blocks-header">
        <div className="header-content">
          <h1>Building Monitoring System</h1>
          <p className="header-subtitle">Real-time IoT sensor data and building automation</p>
        </div>
        
        <div className="block-selector">
          <label htmlFor="block-dropdown">Select Building:</label>
          <select 
            id="block-dropdown"
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="block-dropdown"
          >
            {blocks.map(block => (
              <option key={block} value={block}>{block}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Block Display */}
      <div className="current-block-info">
        <h2>{selectedBlock}</h2>
        <div className="block-status">
          <div className="status-indicator active"></div>
          <span>Systems Online</span>
        </div>
      </div>

      {/* IoT Dashboard Grid */}
      <div className="iot-dashboard-grid">
        
        {/* Tank Level Section */}
        <section className="iot-section water-tanks">
          <h3 className="section-title">Tank Level</h3>
          <div className="water-tanks-grid">
            
            {/* Fire Tank */}
            <div className="water-tank-card fire-tank">
              <div className="tank-visual">
                <div className="tank-container">
                  <div 
                    className="tank-level"
                    style={{
                      height: `${Number(currentData.waterTanks?.fire) || 0}%`,
                      backgroundColor: getWaterTankColor(Number(currentData.waterTanks?.fire) || 0)
                    }}
                  ></div>
                </div>
              </div>
              <div className="tank-info">
                <h4>Fire Tank</h4>
                <div className="tank-percentage">{(Number(currentData.waterTanks?.fire) || 0).toFixed(2)}%</div>
                <div className="tank-status">Emergency Reserve</div>
              </div>
            </div>

            {/* Flush Tank */}
            <div className="water-tank-card flush-tank">
              <div className="tank-visual">
                <div className="tank-container">
                  <div 
                    className="tank-level"
                    style={{
                      height: `${Number(currentData.waterTanks?.flush) || 0}%`,
                      backgroundColor: getWaterTankColor(Number(currentData.waterTanks?.flush) || 0)
                    }}
                  ></div>
                </div>
              </div>
              <div className="tank-info">
                <h4>Flush Tank</h4>
                <div className="tank-percentage">{(Number(currentData.waterTanks?.flush) || 0).toFixed(2)}%</div>
                <div className="tank-status">Sanitation System</div>
              </div>
            </div>

            {/* Water Tank */}
            <div className="water-tank-card water-tank">
              <div className="tank-visual">
                <div className="tank-container">
                  <div 
                    className="tank-level"
                    style={{
                      height: `${Number(currentData.waterTanks?.water) || 0}%`,
                      backgroundColor: getWaterTankColor(Number(currentData.waterTanks?.water) || 0)
                    }}
                  ></div>
                </div>
              </div>
              <div className="tank-info">
                <h4>Water Tank</h4>
                <div className="tank-percentage">{(Number(currentData.waterTanks?.water) || 0).toFixed(2)}%</div>
                <div className="tank-status">General Supply</div>
              </div>
            </div>

          </div>
        </section>

        {/* Pressure Systems Section */}
        <section className="iot-section pressure-systems">
          <h3 className="section-title">Pressure Monitoring</h3>
          <div className="pressure-grid">
            
            <div className="pressure-card">
              <div className="pressure-display">
                <div className="pressure-ring-container">
                  <svg className="pressure-ring" viewBox="0 0 100 100">
                    <circle
                      className="pressure-ring-bg"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--border-color)"
                      strokeWidth="8"
                    />
                    <circle
                      className="pressure-ring-progress"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getPressureColor(getPressurePercentage(currentData.pressure?.shaft1 || '0.0'))}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getPressurePercentage(currentData.pressure?.shaft1 || '0.0') / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="pressure-value-container">
                    <span className="pressure-value">{currentData.pressure?.shaft1 || '0.0'}</span>
                    <span className="pressure-unit">BAR</span>
                  </div>
                </div>
              </div>
              <div className="pressure-label">Shaft 1</div>
              <div className="pressure-percentage">{getPressurePercentage(currentData.pressure?.shaft1 || '0.0').toFixed(0)}%</div>
            </div>

            <div className="pressure-card">
              <div className="pressure-display">
                <div className="pressure-ring-container">
                  <svg className="pressure-ring" viewBox="0 0 100 100">
                    <circle
                      className="pressure-ring-bg"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--border-color)"
                      strokeWidth="8"
                    />
                    <circle
                      className="pressure-ring-progress"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getPressureColor(getPressurePercentage(currentData.pressure?.shaft2 || '0.0'))}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getPressurePercentage(currentData.pressure?.shaft2 || '0.0') / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="pressure-value-container">
                    <span className="pressure-value">{currentData.pressure?.shaft2 || '0.0'}</span>
                    <span className="pressure-unit">BAR</span>
                  </div>
                </div>
              </div>
              <div className="pressure-label">Shaft 2</div>
              <div className="pressure-percentage">{getPressurePercentage(currentData.pressure?.shaft2 || '0.0').toFixed(0)}%</div>
            </div>

            <div className="pressure-card">
              <div className="pressure-display">
                <div className="pressure-ring-container">
                  <svg className="pressure-ring" viewBox="0 0 100 100">
                    <circle
                      className="pressure-ring-bg"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--border-color)"
                      strokeWidth="8"
                    />
                    <circle
                      className="pressure-ring-progress"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getPressureColor(getPressurePercentage(currentData.pressure?.terraceBooster || '0.0'))}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getPressurePercentage(currentData.pressure?.terraceBooster || '0.0') / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="pressure-value-container">
                    <span className="pressure-value">{currentData.pressure?.terraceBooster || '0.0'}</span>
                    <span className="pressure-unit">BAR</span>
                  </div>
                </div>
              </div>
              <div className="pressure-label">Terrace Booster Pump</div>
              <div className="pressure-percentage">{getPressurePercentage(currentData.pressure?.terraceBooster || '0.0').toFixed(0)}%</div>
            </div>

          </div>
        </section>

        {/* Lift Monitoring Section */}
        <section className="iot-section lift-monitoring">
          <h3 className="section-title">Elevator System</h3>
          <div className="lifts-grid">
            
            {Object.entries(currentData.lifts || {}).map(([liftKey, liftData]) => (
              <div key={liftKey} className="lift-card">
                <div className="lift-display">
                  <div className="lift-circle">
                    <span className="lift-floor">{liftData?.floor || 0}</span>
                  </div>
                  <div className="lift-indicator">
                    <div className={`indicator-dot ${liftData?.movement?.toLowerCase() || 'idle'}`}>
                      {liftData?.movement === 'UP' ? '↑' : liftData?.movement === 'DOWN' ? '↓' : '●'}
                    </div>
                  </div>
                </div>
                <div className="lift-info">
                  <div className="lift-label">{liftKey.replace('lift', 'Lift ')}</div>
                  <div className="lift-status">
                    <span className={`door-status ${liftData?.door?.toLowerCase() || 'unknown'}`}>
                      Door: {liftData?.door || 'UNKNOWN'}
                    </span>
                    <span className={`movement-status ${liftData?.movement?.toLowerCase() || 'idle'}`}>
                      {liftData?.movement || 'IDLE'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* System Status Section */}
        <section className="iot-section system-status">
          <h3 className="section-title">Building Systems</h3>
          <div className="status-grid">
            
            {Object.entries(currentData.systems || {}).map(([system, status]) => (
              <div key={system} className="status-card">
                <div className="status-info">
                  <h4>{system.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                  <div 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getSystemStatusColor(status),
                      color: 'white'
                    }}
                  >
                    {status}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  )
}

export default Blocks
