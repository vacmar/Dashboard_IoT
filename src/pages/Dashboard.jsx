import { useState, useEffect } from 'react'
import MetricCard from '../components/ui/MetricCard'
import PieChart from '../components/ui/PieChart'
import '../styles/pages/Dashboard.css'

const Dashboard = () => {
  // Enhanced mock data with more realistic IoT metrics
  const [dashboardData, setDashboardData] = useState({
    // Employee Metrics
    totalEmployees: 47,
    presentToday: 42,
    onLeave: 3,
    lateArrivals: 2,
    // Shift Distribution  
    dayShift: 28,
    nightShift: 14,
    eveningShift: 5,
    // Time Tracking
    avgWorkingHours: 8.5,
    totalHoursToday: 357,
    weeklyHours: 1890,
    monthlyHours: 8460,
    // Department Stats
    departments: {
      engineering: 18,
      operations: 12,
      management: 8,
      support: 9
    },
    // Performance Metrics
    productivity: 94.5,
    attendance: 89.4,
    efficiency: 91.8,
    // Real-time Status
    activeUsers: 38,
    systemLoad: 67,
    serverStatus: 'online',
    lastUpdate: new Date().toLocaleTimeString()
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        presentToday: 42 + Math.floor(Math.random() * 6) - 3,
        activeUsers: 35 + Math.floor(Math.random() * 8),
        systemLoad: 60 + Math.floor(Math.random() * 25),
        productivity: (92 + Math.random() * 6).toFixed(1),
        attendance: (87 + Math.random() * 5).toFixed(1),
        efficiency: (89 + Math.random() * 6).toFixed(1),
        totalHoursToday: 350 + Math.floor(Math.random() * 20),
        lastUpdate: new Date().toLocaleTimeString()
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>IoT Dashboard Overview</h1>
            <p className="header-subtitle">Real-time Employee Management & Analytics</p>
          </div>
          <div className="header-right" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.7rem', minWidth: '160px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
              <div className="status-dot online"></div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.1}}>
                <span style={{whiteSpace: 'nowrap'}}>System</span>
                <span style={{whiteSpace: 'nowrap'}}>Online</span>
              </div>
            </div>
            <div className="last-update" style={{textAlign: 'right', fontFamily: 'Courier New, monospace', fontSize: '1rem', marginTop: '0.1rem', whiteSpace: 'nowrap'}}>
              Last Update: {dashboardData.lastUpdate}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Top KPI Section */}
        <section className="kpi-section">
          <h2 className="section-title">Key Performance Indicators</h2>
          <div className="kpi-cards">
            <div className="kpi-card primary">
              <div className="kpi-icon">👥</div>
              <div className="kpi-content">
                <div className="kpi-value">{dashboardData.totalEmployees}</div>
                <div className="kpi-label">Total Employees</div>
                <div className="kpi-change positive">+2 this week</div>
              </div>
            </div>
            
            <div className="kpi-card success">
              <div className="kpi-icon">✅</div>
              <div className="kpi-content">
                <div className="kpi-value">{dashboardData.presentToday}</div>
                <div className="kpi-label">Present Today</div>
                <div className="kpi-change positive">{((dashboardData.presentToday / dashboardData.totalEmployees) * 100).toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="kpi-card warning">
              <div className="kpi-icon">📊</div>
              <div className="kpi-content">
                <div className="kpi-value">{dashboardData.productivity}%</div>
                <div className="kpi-label">Productivity</div>
                <div className="kpi-change positive">+2.3% vs yesterday</div>
              </div>
            </div>
            
            <div className="kpi-card info">
              <div className="kpi-icon">⏰</div>
              <div className="kpi-content">
                <div className="kpi-value">{dashboardData.totalHoursToday}</div>
                <div className="kpi-label">Hours Today</div>
                <div className="kpi-change neutral">{dashboardData.avgWorkingHours} avg/person</div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts & Analytics Section */}
        <section className="analytics-section">
          <div className="analytics-grid">
            
            {/* Shift Distribution Chart */}
            <div className="chart-container">
              <div className="chart-header">
                <h3>Shift Distribution</h3>
                <div className="chart-subtitle">Current workforce allocation</div>
              </div>
              <div className="chart-content">
                <PieChart 
                  data={[
                    { label: 'Day Shift', value: dashboardData.dayShift, color: '#FF6B35' },
                    { label: 'Night Shift', value: dashboardData.nightShift, color: '#4ECDC4' },
                    { label: 'Evening', value: dashboardData.eveningShift, color: '#45B7D1' }
                  ]}
                />
              </div>
            </div>

            {/* Department Statistics */}
            <div className="chart-container">
              <div className="chart-header">
                <h3>Department Breakdown</h3>
                <div className="chart-subtitle">Employee distribution by department</div>
              </div>
              <div className="chart-content">
                <PieChart 
                  data={[
                    { label: 'Engineering', value: dashboardData.departments.engineering, color: '#96CEB4' },
                    { label: 'Operations', value: dashboardData.departments.operations, color: '#FFEAA7' },
                    { label: 'Management', value: dashboardData.departments.management, color: '#DDA0DD' },
                    { label: 'Support', value: dashboardData.departments.support, color: '#98D8C8' }
                  ]}
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="metrics-container">
              <div className="chart-header">
                <h3>Performance Metrics</h3>
                <div className="chart-subtitle">Real-time performance indicators</div>
              </div>
              <div className="performance-metrics">
                <div className="performance-item">
                  <div className="performance-label">Attendance Rate</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{width: `${dashboardData.attendance}%`}}></div>
                  </div>
                  <div className="performance-value">{dashboardData.attendance}%</div>
                </div>
                
                <div className="performance-item">
                  <div className="performance-label">System Load</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{width: `${dashboardData.systemLoad}%`}}></div>
                  </div>
                  <div className="performance-value">{dashboardData.systemLoad}%</div>
                </div>
                
                <div className="performance-item">
                  <div className="performance-label">Efficiency</div>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{width: `${dashboardData.efficiency}%`}}></div>
                  </div>
                  <div className="performance-value">{dashboardData.efficiency}%</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="quick-stats-section">
          <h2 className="section-title">Quick Statistics</h2>
          <div className="quick-stats-grid">
            <MetricCard 
              value={dashboardData.onLeave} 
              label="On Leave" 
              color="warning"
              icon="🏖️"
            />
            <MetricCard 
              value={dashboardData.lateArrivals} 
              label="Late Arrivals" 
              color="error"
              icon="⏰"
            />
            <MetricCard 
              value={dashboardData.activeUsers} 
              label="Active Users" 
              color="success"
              icon="🟢"
            />
            <MetricCard 
              value={`${dashboardData.weeklyHours} hrs`}
              label="Weekly Hours" 
              color="info"
              icon="📈"
            />
            <MetricCard 
              value={`${dashboardData.monthlyHours} hrs`}
              label="Monthly Hours" 
              color="info"
              icon="📊"
            />
            <MetricCard 
              value="Online"
              label="Server Status" 
              color="success"
              icon="🟢"
            />
          </div>
        </section>

        {/* Alert & Notification Section */}
        <section className="alerts-section">
          <div className="alerts-container">
            <div className="alerts-header">
              <h3>System Alerts</h3>
              <div className="alerts-count">3 Active</div>
            </div>
            <div className="alerts-list">
              <div className="alert-item info">
                <div className="alert-icon">ℹ️</div>
                <div className="alert-content">
                  <div className="alert-title">Shift Change Reminder</div>
                  <div className="alert-time">Night shift starts in 2 hours</div>
                </div>
              </div>
              <div className="alert-item warning">
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <div className="alert-title">Attendance Below Target</div>
                  <div className="alert-time">Current: {dashboardData.attendance}% (Target: 95%)</div>
                </div>
              </div>
              <div className="alert-item success">
                <div className="alert-icon">✅</div>
                <div className="alert-content">
                  <div className="alert-title">Monthly Target Achieved</div>
                  <div className="alert-time">Productivity above 90% for 3rd consecutive month</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Dashboard
