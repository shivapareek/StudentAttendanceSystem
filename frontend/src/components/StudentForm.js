import React, { useState } from 'react';
import { studentAPI } from '../services/api';

const StudentForm = ({ student, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    rollNo: student?.rollNo || '',
    class: student?.class || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      if (!formData.name.trim() || !formData.rollNo.trim() || !formData.class.trim()) {
        throw new Error('All fields are required');
      }

      let response;
      if (student) {
        // Update existing student
        response = await studentAPI.updateStudent(student._id, formData);
      } else {
        // Create new student
        response = await studentAPI.createStudent(formData);
      }

      if (response.data.success) {
        // Reset form if creating new student
        if (!student) {
          setFormData({ name: '', rollNo: '', class: '' });
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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="card-title">
              {student ? 'Edit Student Information' : 'Add New Student'}
            </h3>
            <p className="text-gray-400 text-sm">
              {student ? 'Update student details below' : 'Fill in the student information to add them to the system'}
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
            <label htmlFor="name" className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Student Name *</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full student name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNo" className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Roll Number *</span>
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              className="form-input"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Enter unique roll number"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="class" className="form-label flex items-center space-x-2">
            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.482 0zM7 12.324v.2a9 9 0 008.6 8.6 1 1 0 001-1V8.604L7.979 3.368a3 3 0 00-2.94 0L7 3.368v8.956z" />
            </svg>
            <span>Class *</span>
          </label>
          <input
            type="text"
            id="class"
            name="class"
            className="form-input"
            value={formData.class}
            onChange={handleChange}
            placeholder="Enter class (e.g., 10th, 12th, B.Tech, MCA)"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-dark-700">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center space-x-2 flex-1"
            disabled={loading}
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
                <span>{student ? 'Update Student' : 'Add Student'}</span>
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
      </form>
    </div>
  );
};

export default StudentForm;
