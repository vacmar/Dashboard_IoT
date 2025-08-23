import '../../styles/components/MetricCard.css'

const MetricCard = ({ value, label, color = 'cyan', large = false, icon }) => {
  const formatValue = (val) => {
    if (typeof val === 'string') return val
    if (typeof val === 'number') {
      if (val % 1 === 0) return Math.round(val).toString()
      return val.toFixed(2)
    }
    return val
  }

  return (
    <div className={`metric-card ${large ? 'large' : ''} ${color}`}>
      {icon && <div className="metric-icon">{icon}</div>}
      <div className={`metric-value ${color}`}>
        {formatValue(value)}
      </div>
      <div className="metric-label">
        {label}
      </div>
    </div>
  )
}

export default MetricCard
