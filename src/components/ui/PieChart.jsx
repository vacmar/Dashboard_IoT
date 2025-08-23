import '../../styles/components/PieChart.css'
import { useEffect, useState } from 'react'

const PieChart = ({ data }) => {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, animatedValue: 0 })))

  useEffect(() => {
    // Animate the pie chart on mount
    const timer = setTimeout(() => {
      setAnimatedData(data.map(item => ({ ...item, animatedValue: item.value })))
    }, 300)

    return () => clearTimeout(timer)
  }, [data])

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const createArcPath = (percentage, startPercentage) => {
    const startAngle = startPercentage * 2 * Math.PI
    const endAngle = (startPercentage + percentage) * 2 * Math.PI
    
    const largeArcFlag = percentage > 0.5 ? 1 : 0
    
    const x1 = 50 + 40 * Math.cos(startAngle)
    const y1 = 50 + 40 * Math.sin(startAngle)
    const x2 = 50 + 40 * Math.cos(endAngle)
    const y2 = 50 + 40 * Math.sin(endAngle)
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="pie-chart-container">
      <svg width="200" height="200" viewBox="0 0 100 100" className="pie-chart">
        {animatedData.map((item, index) => {
          const percentage = item.animatedValue / total
          const startPercentage = cumulativePercentage
          cumulativePercentage += percentage
          
          if (percentage === 0) return null
          
          return (
            <path
              key={index}
              d={createArcPath(percentage, startPercentage)}
              fill={item.color}
              className="pie-slice"
              style={{
                transition: 'all 0.8s ease-in-out',
                transformOrigin: '50% 50%'
              }}
            />
          )
        })}
      </svg>
      
      <div className="pie-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="legend-label">{item.label}</span>
            <span className="legend-percentage">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChart
