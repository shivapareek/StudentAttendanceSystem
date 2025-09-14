import React, { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../services/api';

const AttendanceForm = ({ attendance, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: attendance?.student?._id || '',
    date: attendance?.date ? new Date(attendance.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    status: attendance?.status || 'Present',
    remarks: attendance?.remarks || ''
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAllStudents();
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch students');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.studentId || !formData.status) {
        throw new Error('Student and status are required');
      }

      // Prepare data for API
      const attendanceData = {
        studentId: formData.studentId,
        date: formData.date,
        status: formData.status,
        remarks: formData.remarks.trim() || undefined
      };

      let response;
      if (attendance) {
        // Update existing attendance
        response = await attendanceAPI.updateAttendance(attendance._id, {
          status: attendanceData.status,
          remarks: attendanceData.remarks
        });
      } else {
        // Create new attendance
        response = await attendanceAPI.createAttendance(attendanceData);
      }

      if (response.data.success) {
        // Reset form if creating new attendance
        if (!attendance) {
          setFormData({
            studentId: '',
            date: new Date().toISOString().split('T')[0],
            status: 'Present',
            remarks: ''
          });
        }
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="card-header">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-600/20 rounded-lg">
            <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="card-title">
              {attendance ? 'Edit Attendance Record' : 'Mark Student Attendance'}
            </h3>
            <p className="text-gray-400 text-sm">
              {attendance ? 'Update attendance details below' : 'Select student and mark their attendance status'}
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="alert alert-danger flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="studentId" className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Select Student *</span>
            </label>
            <select
              id="studentId"
              name="studentId"
              className="form-select"
              value={formData.studentId}
              onChange={handleChange}
              required
              disabled={!!attendance}
            >
              <option value="">Choose a student...</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.rollNo}) - {student.class}
                </option>
              ))}
            </select>
            {attendance && (
              <p className="text-sm text-gray-400 mt-1 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Student cannot be changed when editing attendance</span>
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Date *</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={!!attendance}
            />
            {attendance && (
              <p className="text-sm text-gray-400 mt-1 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Date cannot be changed when editing attendance</span>
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label flex items-center space-x-2">
            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Attendance Status *</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.status === 'Present' 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-dark-600 hover:border-green-500/50'
            }`}>
              <input
                type="radio"
                name="status"
                value="Present"
                checked={formData.status === 'Present'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.status === 'Present' 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-400'
                }`}>
                  {formData.status === 'Present' && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">Present</div>
                  <div className="text-sm text-gray-400">Student attended</div>
                </div>
              </div>
            </label>
            
            <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.status === 'Absent' 
                ? 'border-red-500 bg-red-500/10' 
                : 'border-dark-600 hover:border-red-500/50'
            }`}>
              <input
                type="radio"
                name="status"
                value="Absent"
                checked={formData.status === 'Absent'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.status === 'Absent' 
                    ? 'border-red-500 bg-red-500' 
                    : 'border-gray-400'
                }`}>
                  {formData.status === 'Absent' && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">Absent</div>
                  <div className="text-sm text-gray-400">Student not present</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="remarks" className="form-label flex items-center space-x-2">
            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Remarks (Optional)</span>
          </label>
          <textarea
            id="remarks"
            name="remarks"
            className="form-textarea"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter any remarks or notes about the attendance..."
            rows="3"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-dark-700">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center space-x-2 flex-1"
            disabled={loading || students.length === 0}
          >
            {loading ? (
              <>
                <div className="spinner w-4 h-4"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{attendance ? 'Update Attendance' : 'Mark Attendance'}</span>
              </>
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              className="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none"
              onClick={onCancel}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Cancel</span>
            </button>
          )}
        </div>

        {students.length === 0 && (
          <div className="alert alert-info flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>No students found. Please add students first before marking attendance.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default AttendanceForm;
