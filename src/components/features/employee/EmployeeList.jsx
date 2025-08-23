import React, { useState } from "react";
import AddEmployee from "./AddEmployee";
import "../../../styles/components/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'arun',
      shift: 'day',
      workingHrs: 8,
      dept: 'permanent'
    },
    {
      id: 2,
      name: 'test',
      shift: 'night',
      workingHrs: 8,
      dept: 'contractor'
    },
    {
      id: 3,
      name: 'defgh',
      shift: 'night',
      workingHrs: 8,
      dept: 'contractor'
    }
  ])

  const [showAddEmployee, setShowAddEmployee] = useState(false)

  const [attendanceStats] = useState({
    present: 18,
    absent: 6,
    permission: 2
  })

  const [monthlyStats] = useState({
    workingDays: 18,
    holidays: 6,
    dayShift: 2,
    nightShift: 2
  })

  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  
  // Calendar generation
  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = currentDate.getDate()
    
    const calendar = []
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      calendar.push({
        day: prevMonth - i,
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({
        day,
        isCurrentMonth: true,
        isToday: day === today
      })
    }
    
    // Next month's leading days
    const remainingDays = 42 - calendar.length
    for (let day = 1; day <= remainingDays; day++) {
      calendar.push({
        day,
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    return calendar
  }

  const handleAddEmployee = () => {
    setShowAddEmployee(true)
  }

  const handleCloseAddEmployee = () => {
    setShowAddEmployee(false)
  }

  const handleSaveEmployee = (newEmployee) => {
    const nextId = Math.max(...employees.map(emp => emp.id)) + 1
    const employeeToAdd = {
      id: nextId,
      name: newEmployee.name.toLowerCase(),
      shift: newEmployee.shift.toLowerCase(),
      workingHrs: 8, // Default working hours
      dept: newEmployee.status.toLowerCase()
    }
    
    setEmployees(prev => [...prev, employeeToAdd])
    setShowAddEmployee(false)
  }

  const handleEditEmployee = (id) => {
    alert(`Edit employee with ID: ${id}`)
  }

  const handleViewEmployee = (id) => {
    alert(`View employee details for ID: ${id}`)
  }

  return (
    <div className="employee-list">
      <div className="admin-panel-header">
        <h2>Admin Panel</h2>
      </div>

      <div className="admin-content">
        <div className="left-section">
          {/* Employee Table */}
          <div className="employee-table-section">
            <div className="section-header">
              <h3>Employees List</h3>
              <div className="action-buttons">
                <button className="action-btn edit-btn" onClick={() => handleEditEmployee('all')}>
                  ✏️
                </button>
                <button className="action-btn view-btn" onClick={() => handleViewEmployee('all')}>
                  👁️
                </button>
              </div>
            </div>
            
            <div className="employee-table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Working Hrs</th>
                    <th>Dept</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td className="name-cell">{employee.name}</td>
                      <td>
                        <span className={`shift-badge ${employee.shift}`}>
                          {employee.shift}
                        </span>
                      </td>
                      <td className="hours-cell">{employee.workingHrs}</td>
                      <td>
                        <span className={`dept-badge ${employee.dept}`}>
                          {employee.dept}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="add-employee-btn" onClick={handleAddEmployee}>
              Add Employee
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="stats-section">
            <div className="stat-card attendance-card">
              <h4>Attendance List</h4>
              <div className="stat-items">
                <div className="stat-item">
                  <span className="stat-label">Present</span>
                  <span className="stat-value present">{attendanceStats.present}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Absent</span>
                  <span className="stat-value absent">{attendanceStats.absent}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Permission</span>
                  <span className="stat-value permission">{attendanceStats.permission}</span>
                </div>
              </div>
            </div>

            <div className="stat-card monthly-card">
              <h4>Month</h4>
              <div className="stat-items">
                <div className="stat-item">
                  <span className="stat-label">Working days</span>
                  <span className="stat-value">{monthlyStats.workingDays}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Holidays</span>
                  <span className="stat-value">{monthlyStats.holidays}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">day shift</span>
                  <span className="stat-value">{monthlyStats.dayShift}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">night shift</span>
                  <span className="stat-value">{monthlyStats.nightShift}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="right-section">
          <div className="calendar-widget">
            <div className="calendar-header">
              <button className="nav-btn">❮</button>
              <h4>{currentMonth}</h4>
              <button className="nav-btn">❯</button>
            </div>
            
            <div className="calendar-grid">
              <div className="weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              
              <div className="calendar-days">
                {generateCalendar().map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!date.isCurrentMonth ? 'other-month' : ''} ${date.isToday ? 'today' : ''}`}
                  >
                    {date.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <AddEmployee 
          onClose={handleCloseAddEmployee}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  )
}

export default EmployeeList
