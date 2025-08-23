import { useState, useEffect } from 'react'
import '../../styles/pages/Blocks.css'
import '../../styles/components/PumpRunningHours.css'

// --- Tank Block Data ---
const initialTanks = [
  { id: 'RawWaterTank1', label: 'RawWaterTank1', level: 60, status: 'Raw Water' },
  { id: 'RawWaterTank2', label: 'RawWaterTank2', level: 100, status: 'Raw Water' },
  { id: 'FireTank', label: 'FireTank', level: 50, status: 'Fire Reserve' },
  { id: 'Treatedwater1', label: 'Treatedwater1', level: 60, status: 'Treated Water' },
  { id: 'Treatedwater2', label: 'Treatedwater2', level: 80, status: 'Treated Water' }
]

const getTankColor = (level) => {
  if (level >= 90) return '#4CAF50'
  if (level >= 70) return '#2196F3'
  if (level >= 40) return '#FF9800'
  return '#F44336'
}

// --- Pressure Ring Component ---
const getPressureColor = (percentage) => {
  if (percentage >= 80) return '#F44336'
  if (percentage >= 60) return '#FF9800'
  if (percentage >= 40) return '#4CAF50'
  if (percentage >= 20) return '#2196F3'
  return '#9E9E9E'
}

const PressureRing = ({ label, value, unit = 'BAR', color }) => {
  const percentage = Math.min(100, Math.max(0, value.percentage ?? value))
  const barValue = value.bar ?? value
  const strokeColor = color || getPressureColor(percentage)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percentage / 100)

  return (
    <div className="pressure-card">
      <div className="pressure-display">
        <div className="pressure-ring-container">
          <svg className="pressure-ring" viewBox="0 0 100 100">
            <circle
              className="pressure-ring-bg"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--border-color)"
              strokeWidth="8"
            />
            <circle
              className="pressure-ring-progress"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="pressure-value-container">
            <span className="pressure-value">{barValue}</span>
            <span className="pressure-unit">{unit}</span>
          </div>
        </div>
      </div>
      <div className="pressure-label">{label}</div>
      <div className="pressure-percentage">{percentage}%</div>
    </div>
  )
}

// --- Speedometer Arc Component ---
const SpeedometerArc = ({ label, value, max = 100, color = '#FF6B35', unit = '' }) => {
  const radius = 45
  const cx = 60
  const cy = 60
  const startAngle = 135
  const endAngle = 45
  const angle = (value / max) * 270 + startAngle
  const polarToCartesian = (cx, cy, r, angle) => {
    const a = (angle - 90) * Math.PI / 180.0
    return {
      x: cx + (r * Math.cos(a)),
      y: cy + (r * Math.sin(a))
    }
  }
  const start = polarToCartesian(cx, cy, radius, startAngle)
  const end = polarToCartesian(cx, cy, radius, endAngle)
  const arcEnd = polarToCartesian(cx, cy, radius, angle)
  const largeArcFlag = value > max / 2 ? 1 : 0

  return (
    <div className="pressure-card" style={{alignItems: 'center', minWidth: 220}}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        {/* Background arc */}
        <path
          d={`
            M ${start.x} ${start.y}
            A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}
          `}
          fill="none"
          stroke="#222"
          strokeWidth="6"
        />
        {/* Value arc */}
        <path
          d={`
            M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}
          `}
          fill="none"
          stroke={color}
          strokeWidth="6"
        />
        {/* Value in center */}
        <text x={cx} y={cy+8} textAnchor="middle" fontSize="1.5em" fontWeight="bold" fill={color}>{value}{unit}</text>
      </svg>
      <div className="pressure-label" style={{marginTop: 8}}>{label}</div>
      <div className="pressure-percentage">Flow Meter</div>
    </div>
  )
}

// --- Pump Running Hours Data ---
const pumpSections = [
  {
    title: 'Garden Pump Running Hours',
    color: 'green',
    pumps: [
      { name: 'Garden Pump 1', time: '0:0:0', cycles: 0, percent: 0 },
      { name: 'Garden Pump 2', time: '0:0:0', cycles: 0, percent: 0 }
    ]
  },
  {
    title: 'HNS System Running Hours',
    color: 'blue',
    pumps: [
      { name: 'HNS System 1', time: '1:50:0', cycles: 1, percent: 80 },
      { name: 'HNS System 2', time: '0:0:0', cycles: 0, percent: 0 },
      { name: 'HNS System 3', time: '0:0:0', cycles: 0, percent: 0 }
    ]
  },
  {
    title: 'Drain Pump Running Hours',
    color: 'red',
    pumps: [
      { name: 'Drain Pump 1', time: '0:0:0', cycles: 0, percent: 0 },
      { name: 'Drain Pump 2', time: '0:0:0', cycles: 0, percent: 0 }
    ]
  }
]

// --- Pump Progress Ring Component ---
const PumpProgressRing = ({ percent, time, cycles, name, color }) => {
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const progress = (percent / 100) * circumference
  return (
    <div className={`pump-card ${color}`}>
      <div className="progress-ring">
        <svg viewBox="0 0 36 36">
          <path
            className="bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="progress"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{
              strokeDasharray: `${circumference}, ${circumference}`,
              strokeDashoffset: `${circumference - progress}`
            }}
          />
        </svg>
        <div className="pump-time">{time}</div>
      </div>
      <div className="pump-cycles">Cycles: {cycles}</div>
      <div className="pump-title">{name}</div>
    </div>
  )
}

const WTP = () => {
  // --- Tank Block Animation ---
  const [tanks, setTanks] = useState(initialTanks)
  useEffect(() => {
    const interval = setInterval(() => {
      setTanks(prev =>
        prev.map(tank => {
          let delta = (Math.random() - 0.5) * 4
          let newLevel = Math.max(0, Math.min(100, tank.level + delta))
          return { ...tank, level: Math.round(newLevel) }
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // --- Animated Data for Pressure/Speedometer ---
  const [airBlowers, setAirBlowers] = useState([
    { label: 'Air blower 1', bar: 2.1, percentage: 35 },
    { label: 'Air blower 2', bar: 3.5, percentage: 58 },
    { label: 'Air blower 3', bar: 6.2, percentage: 100 }
  ])
  const [filterFeed, setFilterFeed] = useState([
    { label: 'Filter Feed Pump 1', value: 90 },
    { label: 'Filter Feed Pump 2', value: 90 }
  ])
  const [filterMedia, setFilterMedia] = useState([
    { label: 'PSF-Inlet Pressure', bar: 2.1, percentage: 35 },
    { label: 'ACF-Inlet Pressure', bar: 3.5, percentage: 58 },
    { label: 'ACF-Outlet Pressure', bar: 3.5, percentage: 58 },
    { label: 'Flow Meter', value: 90, isFlow: true }
  ])
  const [ufPumps, setUfPumps] = useState([
    { label: 'UF Pump 1', value: 50 },
    { label: 'UF Pump 2', value: 50 }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAirBlowers(prev => prev.map(b => ({
        ...b,
        bar: Math.max(0, Math.min(6.2, b.bar + (Math.random() - 0.5) * 0.2)),
        percentage: Math.round(Math.max(0, Math.min(100, (b.bar / 6.2) * 100)))
      })))
      setFilterFeed(prev => prev.map(f => ({
        ...f,
        value: Math.max(0, Math.min(100, f.value + (Math.random() - 0.5) * 4))
      })))
      setFilterMedia(prev => prev.map(f =>
        f.isFlow
          ? { ...f, value: Math.max(0, Math.min(100, f.value + (Math.random() - 0.5) * 4)) }
          : {
              ...f,
              bar: Math.max(0, Math.min(6.2, (f.bar ?? 3.5) + (Math.random() - 0.5) * 0.2)),
              percentage: Math.round(Math.max(0, Math.min(100, ((f.bar ?? 3.5) / 6.2) * 100)))
            }
      ))
      setUfPumps(prev => prev.map(u => ({
        ...u,
        value: Math.max(0, Math.min(100, u.value + (Math.random() - 0.5) * 3))
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="blocks-container">
      {/* WTP Tank Blocks */}
      <div className="blocks-header">
        <div className="header-content">
          <h1>WTP Tank Levels</h1>
          <p className="header-subtitle">Live Water Treatment Plant Tank Monitoring</p>
        </div>
      </div>
      <div className="iot-dashboard-grid">
        <section className="iot-section water-tanks">
          <h3 className="section-title">WTP Tanks</h3>
          <div className="water-tanks-grid">
            {tanks.map(tank => (
              <div className="water-tank-card" key={tank.id}>
                <div className="tank-visual">
                  <div className="tank-container">
                    <div
                      className="tank-level"
                      style={{
                        height: `${tank.level}%`,
                        backgroundColor: getTankColor(tank.level)
                      }}
                    ></div>
                  </div>
                </div>
                <div className="tank-info">
                  <h4>{tank.label}</h4>
                  <div className="tank-percentage">{tank.level}%</div>
                  <div className="tank-status">{tank.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Air Blower Pressure */}
      <section className="iot-section" style={{marginTop: 32}}>
        <h2 className="section-title" style={{textAlign: 'center'}}>Air Blower Pressure</h2>
        <div className="pressure-grid" style={{justifyContent: 'center'}}>
          {airBlowers.map((blower, idx) => (
            <PressureRing
              key={blower.label}
              label={blower.label}
              value={blower}
              color={idx === 0 ? '#2196F3' : idx === 1 ? '#4CAF50' : '#F44336'}
            />
          ))}
        </div>
      </section>

      {/* Filter Feed Pumps */}
      <section className="iot-section" style={{marginTop: 24}}>
        <div className="pressure-grid" style={{justifyContent: 'center'}}>
          {filterFeed.map(feed => (
            <SpeedometerArc
              key={feed.label}
              label={feed.label}
              value={Math.round(feed.value)}
              color="#FF6B35"
              unit=""
            />
          ))}
        </div>
      </section>

      {/* Filter Media */}
      <section className="iot-section" style={{marginTop: 24}}>
        <h2 className="section-title" style={{textAlign: 'center'}}>Filter Media</h2>
        <div className="pressure-grid" style={{justifyContent: 'center'}}>
          {filterMedia.map((media, idx) =>
            media.isFlow
              ? (
                <SpeedometerArc
                  key={media.label}
                  label={media.label}
                  value={Math.round(media.value)}
                  color="#FF6B35"
                  unit=""
                />
              )
              : (
                <PressureRing
                  key={media.label}
                  label={media.label}
                  value={media}
                />
              )
          )}
        </div>
      </section>

      {/* UF Pumps */}
      <section className="iot-section" style={{marginTop: 24}}>
        <div className="pressure-grid" style={{justifyContent: 'center'}}>
          {ufPumps.map(pump => (
            <SpeedometerArc
              key={pump.label}
              label={pump.label}
              value={Math.round(pump.value)}
              color="#FFB347"
              unit=""
            />
          ))}
        </div>
      </section>

      {/* --- Pump Running Hours Section --- */}
      <div className="pump-running-hours-container">
        {pumpSections.map(section => (
          <div key={section.title}>
            <h2 className="section-title">{section.title}</h2>
            <div className="card-grid">
              {section.pumps.map((pump, idx) => (
                <PumpProgressRing
                  key={pump.name}
                  percent={pump.percent}
                  time={pump.time}
                  cycles={pump.cycles}
                  name={pump.name}
                  color={section.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WTP