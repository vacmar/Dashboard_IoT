import { useState, useEffect } from 'react'
import '../../../styles/components/EmployeeDetails.css'

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState([])

  // Generate comprehensive employee data
  useEffect(() => {
    const generateEmployees = () => {
      const firstNames = ['Arun', 'Naveen', 'Priya', 'Rahul', 'Sneha', 'Karthik', 'Divya', 'Suresh', 'Meera', 'Vijay', 'Anita', 'Rajesh', 'Kavya', 'Manoj', 'Deepika', 'Sanjay', 'Pooja', 'Amit', 'Rashmi', 'Vinod', 'Shilpa', 'Ravi', 'Nisha', 'Prakash', 'Swathi']
      const departments = ['FullTime', 'Contractor', 'Intern', 'Consultant', 'Manager', 'Developer', 'Designer', 'Analyst']
      const shifts = ['Day', 'Night', 'Evening', 'Morning']
      const genders = ['Male', 'Female']
      
      return Array.from({ length: 47 }, (_, index) => ({
        id: index + 1,
        name: firstNames[index % firstNames.length],
        department: departments[index % departments.length],
        shift: shifts[index % shifts.length],
        email: `${firstNames[index % firstNames.length].toLowerCase()}@gmail.com`,
        phone: `${1234567890 + index}`,
        gender: genders[index % genders.length]
      }))
    }

    setEmployees(generateEmployees())
  }, [])

  // Filter employees based on search term
  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.shift.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEmployees(filtered)
    setCurrentPage(1) // Reset to first page when searching
  }, [employees, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const showAll = () => {
    setEntriesPerPage(filteredEmployees.length)
    setCurrentPage(1)
  }

  return (
    <div className="employee-details">
      <div className="employee-details-header">
        <h2>Employee Details</h2>
      </div>

      <div className="employee-details-container">
        {/* Controls */}
        <div className="table-controls">
          <div className="entries-control">
            <label htmlFor="entries-select">Show</label>
            <select 
              id="entries-select"
              value={entriesPerPage === filteredEmployees.length ? 'all' : entriesPerPage}
              onChange={(e) => {
                const value = e.target.value
                if (value === 'all') {
                  showAll()
                } else {
                  setEntriesPerPage(parseInt(value))
                  setCurrentPage(1)
                }
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="all">All</option>
            </select>
            <span>entries</span>
          </div>

          <div className="search-control">
            <label htmlFor="search-input">Search:</label>
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
            />
          </div>

          <button className="show-all-btn" onClick={showAll}>
            Show All
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="employee-details-table">
            <thead>
              <tr>
                <th>ID <span className="sort-icon">▲</span></th>
                <th>Name <span className="sort-icon">▲</span></th>
                <th>Department <span className="sort-icon">▲</span></th>
                <th>Shift <span className="sort-icon">▲</span></th>
                <th>Email <span className="sort-icon">▲</span></th>
                <th>Phone <span className="sort-icon">▲</span></th>
                <th>Gender <span className="sort-icon">▲</span></th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td className="name-cell">{employee.name}</td>
                  <td>
                    <span className="dept-badge">{employee.department}</span>
                  </td>
                  <td>
                    <span className="shift-badge">{employee.shift}</span>
                  </td>
                  <td className="email-cell">{employee.email}</td>
                  <td className="phone-cell">{employee.phone}</td>
                  <td className="gender-cell">{employee.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} entries
          </div>

          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="page-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button 
              className="pagination-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
