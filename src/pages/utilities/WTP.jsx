import { useState, useEffect } from 'react'
import '../../styles/pages/Blocks.css'
import '../../styles/components/PumpRunningHours.css'

const initialTanks = [
  { id: 'RawWaterTank1', label: 'RawWaterTank1', level: 60 },
  { id: 'RawWaterTank2', label: 'RawWaterTank2', level: 100 },
  { id: 'FireTank', label: 'FireTank', level: 50 },
  { id: 'Treatedwater1', label: 'Treatedwater1', level: 60 },
  { id: 'Treatedwater2', label: 'Treatedwater2', level: 80 }
]

const getTankColor = (level) => {
  if (level >= 90) return '#4CAF50'
  if (level >= 70) return '#2196F3'
  if (level >= 40) return '#FF9800'
  return '#F44336'
}

const PressureRing = ({ label, value, unit = '%', color = '#90caf9' }) => {
  const percentage = Math.min(100, Math.max(0, value))
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percentage / 100)
  return (
    <div className="pressure-card" style={{minWidth: 120}}>
      <div className="pressure-display">
        <div className="pressure-ring-container">
          <svg className="pressure-ring" viewBox="0 0 100 100">
            <circle
              className="pressure-ring-bg"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#222"
              strokeWidth="8"
            />
            <circle
              className="pressure-ring-progress"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="pressure-value-container">
            <span className="pressure-value">{percentage}</span>
            <span className="pressure-unit">{unit}</span>
          </div>
        </div>
      </div>
      <div className="pressure-label">{label}</div>
    </div>
  )
}

const SpeedometerArc = ({ value, max = 100, color = '#FFB347' }) => {
  const radius = 36
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
    <div className="pressure-card" style={{minWidth: 120, background: '#18191c'}}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        <path
          d={`
            M ${start.x} ${start.y}
            A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}
          `}
          fill="none"
          stroke="#222"
          strokeWidth="6"
        />
        <path
          d={`
            M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}
          `}
          fill="none"
          stroke={color}
          strokeWidth="6"
        />
        <text x={cx} y={cy+8} textAnchor="middle" fontSize="1.5em" fontWeight="bold" fill={color}>{value}</text>
      </svg>
      <div className="pressure-label" style={{marginTop: 8}}>Flow Meter</div>
    </div>
  )
}

const PumpBox = ({ time, cycles, label, highlight }) => (
  <div className="pump-card" style={{
    border: highlight ? '2px solid #ff5722' : '2px solid #bbb',
    background: '#18191c',
    color: '#fff',
    borderRadius: 12,
    minWidth: 140,
    margin: '0 auto 0.5rem auto',
    boxShadow: highlight ? '0 0 10px #ff5722' : undefined
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 8
    }}>
      <span style={{
        background: highlight ? '#fff0e0' : '#232323',
        borderRadius: 6,
        padding: '0.3rem 0.7rem',
        fontWeight: 700,
        color: highlight ? '#ff5722' : '#fff',
        border: highlight ? '2px solid #ff5722' : '2px solid #bbb'
      }}>{time}</span>
      <span style={{fontWeight: 500}}>Cycles : {cycles}</span>
    </div>
    <div className="pump-title" style={{color: '#fff'}}>{label}</div>
  </div>
)

const PressureBox = ({ value }) => (
  <div className="pressure-card" style={{
    background: '#18191c',
    color: '#fff',
    minWidth: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      fontWeight: 700,
      fontSize: '2rem',
      color: '#1976d2',
      marginBottom: 4
    }}>{value} BAR</div>
    <div className="pressure-label" style={{color: '#888'}}>PRESSURE</div>
  </div>
)

const WTP = () => {
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

  // Dummy data for animated demo
  const [ffp, setFfp] = useState([
    { time: '2:21:44', cycles: 118, label: 'FFP Pump 1', highlight: true },
    { time: '0:0:0', cycles: 0, label: 'FFP Pump 2', highlight: false }
  ])
  const [filterMedia, setFilterMedia] = useState([
    { label: 'PSF-Inlet Pressure', value: 6 },
    { label: 'ACF-Inlet Pressure', value: 6 },
    { label: 'ACF-Outlet Pressure', value: 6 },
    { label: 'Flow Meter', value: 40, isFlow: true }
  ])
  const [hns, setHns] = useState([
    { time: '0:0:0', cycles: 999999, label: 'Hns Pump 1', highlight: true },
    { time: '0:0:0', cycles: 0, label: 'Hns Pump 2', highlight: false },
    { time: '0:0:0', cycles: 2, label: 'Hns Pump 3', highlight: false },
    { time: '0:0:0', cycles: 0, label: 'Hns Pump 4', highlight: true }
  ])
  const [hnsPressure, setHnsPressure] = useState(6)
  const [drainPumpOn, setDrainPumpOn] = useState(true)

  return (
    <div className="blocks-container">
      {/* Heading */}
      <h1 style={{
        color: '#ff9800',
        fontWeight: 700,
        fontSize: '2rem',
        margin: '0 0 1rem 0'
      }}>
        WTP<span style={{fontWeight: 400, fontSize: '1.2rem', color: '#ff9800'}}> (Water Treatment Plant)</span>
      </h1>
      {/* Tanks */}
      <div className="water-tanks-grid" style={{marginBottom: 24}}>
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
            </div>
          </div>
        ))}
      </div>
      {/* Filter Feed Pump Running Hours & Filter Media */}
      <div style={{
        display: 'flex',
        gap: 24,
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        {/* Filter Feed Pump Running Hours */}
        <div style={{
          background: '#18191c',
          borderRadius: 16,
          padding: 16,
          flex: 1,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: '#fff'}}>Filter Feed Pump Running Hours</div>
          <div style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            {ffp.map(p => (
              <div key={p.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <PumpBox {...p} />
                <div style={{marginTop: 4, fontWeight: 500, color: '#fff'}}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Filter Media */}
        <div style={{
          background: '#18191c',
          borderRadius: 16,
          padding: 16,
          flex: 1,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: '#fff'}}>Filter Media</div>
          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            {filterMedia.map((m, i) =>
              m.isFlow
                ? <SpeedometerArc key={m.label} value={m.value} />
                : <PressureRing key={m.label} label={m.label} value={m.value} />
            )}
          </div>
        </div>
      </div>
      {/* Hns System Running Hours */}
      <div style={{
        background: '#18191c',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: '#fff'}}>Hns System Running Hours</div>
        <div style={{
          display: 'flex',
          gap: 24,
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {hns.map(p => (
            <div key={p.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <PumpBox {...p} />
              <div style={{marginTop: 4, fontWeight: 500, color: '#fff'}}>{p.label}</div>
            </div>
          ))}
          <PressureBox value={hnsPressure} />
        </div>
      </div>
      {/* Drain Pump */}
      <div style={{
        background: '#18191c',
        borderRadius: 16,
        padding: 24,
        width: 260,
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <button
          style={{
            background: drainPumpOn ? '#fff' : '#eee',
            color: drainPumpOn ? '#388e3c' : '#888',
            border: `2px solid ${drainPumpOn ? '#388e3c' : '#bbb'}`,
            borderRadius: 24,
            fontWeight: 700,
            fontSize: '1.2rem',
            padding: '0.5rem 2.5rem',
            marginBottom: 8,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => setDrainPumpOn(on => !on)}
        >
          {drainPumpOn ? 'ON' : 'OFF'}
        </button>
        <div style={{fontWeight: 500, color: '#fff'}}>Drain Pump</div>
      </div>
    </div>
  )}

  export default WTP