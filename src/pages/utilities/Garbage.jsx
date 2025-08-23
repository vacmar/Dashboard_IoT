import { useState } from 'react'
import '../../styles/pages/Blocks.css'
import '../../styles/components/PumpRunningHours.css'

const garbageData = [
  {
    floor: 1,
    bins: [
      { id: 101, status: 'Active' },
      { id: 102, status: 'Inactive' },
      { id: 103, status: 'Active' },
      { id: 104, status: 'Active' }
    ]
  },
  {
    floor: 2,
    bins: [
      { id: 101, status: 'JAWAHAR' },
      { id: 202, status: 'Active' },
      { id: 203, status: 'Active' },
      { id: 204, status: 'Active' }
    ]
  },
  {
    floor: 3,
    bins: [
      { id: 101, status: 'ACTIVE' },
      { id: 302, status: 'Active' },
      { id: 303, status: 'Active' },
      { id: 304, status: 'Active' }
    ]
  }
]

const getStatusColor = (status) => {
  if (status === 'Inactive') return '#43a047'
  if (status === 'JAWAHAR') return '#43a047'
  if (status.toUpperCase() === 'ACTIVE') return '#43a047'
  if (status === 'Active') return '#d32f2f'
  return '#222'
}

const GarbageBinCard = ({ id, status }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: '#18191c',
        border: '2px solid #bbb',
        borderRadius: 16,
        minWidth: 180,
        minHeight: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '16px 0',
        boxShadow: hovered
          ? '0 0 24px 2px #2196f3'
          : '0 0 16px 0 #000a',
        padding: '12px 0',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px) scale(1.04)' : 'none',
        transition: 'box-shadow 0.25s, transform 0.18s'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        fontWeight: 700,
        color: getStatusColor(status),
        fontSize: '1.15rem',
        marginBottom: 2,
        textTransform: status === 'Inactive' ? 'capitalize' : 'uppercase'
      }}>
        {status}
      </span>
      <span style={{
        fontWeight: 700,
        color: '#fff',
        fontSize: '1.15rem'
      }}>
        {id}
      </span>
    </div>
  )
}

const GarbageFloor = ({ floor, bins }) => (
  <div
    style={{
      background: '#232427',
      borderRadius: 18,
      margin: '32px 0 0 0',
      padding: '32px 0 24px 0',
      width: '100%',
      maxWidth: '98vw',
      boxShadow: '0 0 24px 0 #000a'
    }}
  >
    <div style={{
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '2rem',
      color: '#fff',
      marginBottom: 12
    }}>
      Floor - {floor}
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '24px'
    }}>
      {bins.map(bin => (
        <GarbageBinCard key={bin.id} {...bin} />
      ))}
    </div>
  </div>
)

const Garbage = () => (
  <div className="blocks-container" style={{paddingBottom: 32}}>
    <h1 style={{
      color: '#ff9800',
      fontWeight: 700,
      fontSize: '2rem',
      margin: '0 0 1.5rem 0'
    }}>
      Garbage System
    </h1>
    <div style={{width: '100%', maxWidth: 1800, margin: '0 auto'}}>
      {garbageData.map(floor => (
        <GarbageFloor key={floor.floor} {...floor} />
      ))}
    </div>
  </div>
)

export default Garbage