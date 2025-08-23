import { useState, useEffect } from 'react'
import '../../../styles/components/AddEmployee.css'

const AddEmployee = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    status: '',
    inTime: '',
    outTime: '',
    shift: '',
    email: '',
    phone: '',
    gender: ''
  })

  const [errors, setErrors] = useState({})

  // Disable body scroll when modal is open
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY
    
    // Disable scroll
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    // Handle Escape key to close modal
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    // Cleanup function to restore scroll
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollY)
      
      // Remove event listener
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.status.trim()) newErrors.status = 'Status is required'
    if (!formData.inTime) newErrors.inTime = 'In Time is required'
    if (!formData.outTime) newErrors.outTime = 'Out Time is required'
    if (!formData.shift.trim()) newErrors.shift = 'Shift is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits'
    if (!formData.gender) newErrors.gender = 'Gender is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave && onSave(formData)
      // Reset form
      setFormData({
        employeeId: '',
        name: '',
        department: '',
        status: '',
        inTime: '',
        outTime: '',
        shift: '',
        email: '',
        phone: '',
        gender: ''
      })
      alert('Employee added successfully!')
    }
  }

  const handleReset = () => {
    setFormData({
      employeeId: '',
      name: '',
      department: '',
      status: '',
      inTime: '',
      outTime: '',
      shift: '',
      email: '',
      phone: '',
      gender: ''
    })
    setErrors({})
  }

  const generateEmployeeId = () => {
    const id = 'EMP' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    setFormData(prev => ({
      ...prev,
      employeeId: id
    }))
  }

  const handleOverlayClick = (e) => {
    // Close modal when clicking on overlay (not on modal content)
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="add-employee-overlay" onClick={handleOverlayClick}>
      <div className="add-employee-modal">
        <div className="modal-header">
          <h2>Add Employee</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="fingerprint-notice">
          <p>*Please Register the Fingerprint and Generate ID Before filling the form*</p>
          <button className="generate-id-btn" onClick={generateEmployeeId}>
            Generate Employee ID
          </button>
        </div>

        <form className="add-employee-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employeeId">Employee Id</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Auto-generated or enter manually"
                className={errors.employeeId ? 'error' : ''}
                readOnly
              />
              {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter here"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter here"
                className={errors.department ? 'error' : ''}
              />
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={errors.status ? 'error' : ''}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
              {errors.status && <span className="error-message">{errors.status}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="inTime">InTime</label>
              <input
                type="time"
                id="inTime"
                name="inTime"
                value={formData.inTime}
                onChange={handleInputChange}
                className={errors.inTime ? 'error' : ''}
              />
              {errors.inTime && <span className="error-message">{errors.inTime}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="outTime">OutTime</label>
              <input
                type="time"
                id="outTime"
                name="outTime"
                value={formData.outTime}
                onChange={handleInputChange}
                className={errors.outTime ? 'error' : ''}
              />
              {errors.outTime && <span className="error-message">{errors.outTime}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shift">Shift</label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleInputChange}
                className={errors.shift ? 'error' : ''}
              >
                <option value="">Select Shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Evening">Evening</option>
                <option value="Morning">Morning</option>
              </select>
              {errors.shift && <span className="error-message">{errors.shift}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter here"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Ph.no</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter here"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="submit-btn">
              Add Employee
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee
