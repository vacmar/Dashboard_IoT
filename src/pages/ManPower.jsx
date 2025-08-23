import { useState } from 'react'
import TodaysAttendance from '../components/features/attendance/TodaysAttendance'
import EmployeeList from '../components/features/employee/EmployeeList'
import EmployeeDetails from '../components/features/employee/EmployeeDetails'
import '../styles/pages/ManPower.css'

const ManPower = () => {
  const [activeSubCategory, setActiveSubCategory] = useState('todays-attendance')

  const subCategories = [
    { id: 'todays-attendance', label: "Today's Attendance", icon: '📅' },
    { id: 'employee-list', label: 'Employee List', icon: '👥' },
    { id: 'employee-details', label: 'Employee Details', icon: '👤' }
  ]

  const renderSubCategoryContent = () => {
    switch (activeSubCategory) {
      case 'todays-attendance':
        return <TodaysAttendance />
      case 'employee-list':
        return <EmployeeList />
      case 'employee-details':
        return <EmployeeDetails />
      default:
        return <TodaysAttendance />
    }
  }

  return (
    <div className="manpower">
      <header className="manpower-header">
        <h1>Man Power</h1>
        <div className="sub-nav">
          {subCategories.map(subCat => (
            <button
              key={subCat.id}
              className={`sub-nav-item ${activeSubCategory === subCat.id ? 'active' : ''}`}
              onClick={() => setActiveSubCategory(subCat.id)}
            >
              <span className="sub-nav-icon">{subCat.icon}</span>
              <span className="sub-nav-label">{subCat.label}</span>
            </button>
          ))}
        </div>
      </header>
      
      <div className="manpower-content">
        {renderSubCategoryContent()}
      </div>
    </div>
  )
}

export default ManPower
