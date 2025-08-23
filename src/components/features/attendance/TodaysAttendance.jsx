import { useState, useEffect } from 'react'
import '../../../styles/components/TodaysAttendance.css'

const TodaysAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      name: 'arun',
      department: 'permanent',
      inTime: '09:00:00am',
      outTime: '06:00:00pm',
      status: 'Present',
      workingHrs: '8Hrs',
      totalHrs: '216 Hrs',
      leave: '3 days'
    },
    {
      id: 2,
      name: 'priya',
      department: 'contract',
      inTime: '08:30:00am',
      outTime: '05:30:00pm',
      status: 'Present',
      workingHrs: '9Hrs',
      totalHrs: '198 Hrs',
      leave: '1 day'
    },
    {
      id: 3,
      name: 'raj',
      department: 'permanent',
      inTime: '09:15:00am',
      outTime: '06:15:00pm',
      status: 'Present',
      workingHrs: '8Hrs',
      totalHrs: '224 Hrs',
      leave: '2 days'
    },
    {
      id: 4,
      name: 'sara',
      department: 'contract',
      inTime: '--',
      outTime: '--',
      status: 'Absent',
      workingHrs: '0Hrs',
      totalHrs: '180 Hrs',
      leave: '5 days'
    },
    {
      id: 5,
      name: 'kumar',
      department: 'permanent',
      inTime: '08:45:00am',
      outTime: '05:45:00pm',
      status: 'Present',
      workingHrs: '9Hrs',
      totalHrs: '207 Hrs',
      leave: '1 day'
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendanceData(prev => 
        prev.map(employee => {
          if (employee.status === 'Present' && Math.random() > 0.8) {
            const currentTime = new Date()
            const hours = currentTime.getHours()
            const minutes = currentTime.getMinutes()
            const seconds = currentTime.getSeconds()
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${hours >= 12 ? 'pm' : 'am'}`
            
            return {
              ...employee,
              outTime: timeString
            }
          }
          return employee
        })
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status) => {
    const statusClass = status.toLowerCase()
    return <span className={`status-badge ${statusClass}`}>{status}</span>
  }

  return (
    <div className="todays-attendance">
      <div className="attendance-header">
        <h2>Attendance</h2>
        <div className="attendance-stats">
          <div className="stat-item">
            <span className="stat-value present">{attendanceData.filter(emp => emp.status === 'Present').length}</span>
            <span className="stat-label">Present</span>
          </div>
          <div className="stat-item">
            <span className="stat-value absent">{attendanceData.filter(emp => emp.status === 'Absent').length}</span>
            <span className="stat-label">Absent</span>
          </div>
          <div className="stat-item">
            <span className="stat-value total">{attendanceData.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>InTime</th>
              <th>OutTime</th>
              <th>Status</th>
              <th>Working Hrs</th>
              <th>Total Hrs</th>
              <th>Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((employee) => (
              <tr key={employee.id} className={`table-row ${employee.status.toLowerCase()}`}>
                <td>{employee.id}</td>
                <td className="name-cell">{employee.name}</td>
                <td>
                  <span className={`department-badge ${employee.department}`}>
                    {employee.department}
                  </span>
                </td>
                <td className="time-cell">{employee.inTime}</td>
                <td className="time-cell">{employee.outTime}</td>
                <td>{getStatusBadge(employee.status)}</td>
                <td className="hours-cell">{employee.workingHrs}</td>
                <td className="hours-cell">{employee.totalHrs}</td>
                <td className="leave-cell">{employee.leave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodaysAttendance
