import { useState } from 'react'
import '../../styles/pages/Blocks.css'
import '../../styles/components/PumpRunningHours.css'

const borewellData = [
  { label: 'Subsoil Pump 1', time: '0:1:0', cycles: 0, highlight: true },
  { label: 'Subsoil Pump 2', time: '0:0:0', cycles: 0, highlight: false },
  { label: 'Subsoil Pump 3', time: '0:0:0', cycles: 0, highlight: false },
  { label: 'Subsoil Pump 4', time: '0:0:0', cycles: 0, highlight: true },

]

const BorewellPumpBox = ({ time, cycles, label, highlight }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: '#18191c',
        color: '#fff',
        borderRadius: 18,
        minWidth: 300,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: highlight
          ? hovered
            ? '0 0 32px 4px #ff9800, 0 0 0 3px #18191c'
            : '0 0 18px 2px #ff9800, 0 0 0 3px #18191c'
          : hovered
            ? '0 0 24px 2px #2196f3'
            : '0 0 18px 0 #000a',
        border: highlight
          ? '3px solid #ff9800'
          : '2px solid #bbb',
        transition: 'box-shadow 0.3s, border 0.3s, transform 0.2s',
        transform: hovered ? 'translateY(-6px) scale(1.03)' : 'none',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          marginTop: 8
        }}
      >
        <span
          style={{
            background: highlight ? '#fff0e0' : '#232323',
            borderRadius: 8,
            padding: '0.5rem 1.2rem',
            fontWeight: 700,
            color: highlight ? '#ff5722' : '#fff',
            fontSize: '1.2rem',
            border: highlight
              ? '3px solid #ff5722'
              : '2px solid #bbb',
            boxShadow: highlight
              ? '0 0 0 2px #fff0e0'
              : 'none',
            marginRight: 16,
            minWidth: 70,
            textAlign: 'center',
            transition: 'background 0.2s, color 0.2s, border 0.2s'
          }}
        >
          {time}
        </span>
        <span
          style={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.15rem'
          }}
        >
          Cycles : {cycles}
        </span>
      </div>
      <div style={{
        fontWeight: 700,
        fontSize: '1.2rem',
        color: '#fff',
        marginTop: 8,
        textAlign: 'center'
      }}>{label}</div>
    </div>
  )
}

const Subsoil = () => (
  <div className="blocks-container" style={{paddingBottom: 32}}>
    <h1 style={{
      color: '#ff9800',
      fontWeight: 700,
      fontSize: '2rem',
      margin: '0 0 1.5rem 0'
    }}>
      Subsoil System
    </h1>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        justifyItems: 'center'
      }}
    >
      {borewellData.map((pump) => (
        <BorewellPumpBox key={pump.label} {...pump} />
      ))}
    </div>
  </div>
)

export default Subsoil