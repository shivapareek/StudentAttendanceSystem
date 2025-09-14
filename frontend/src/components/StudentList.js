import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';

const StudentList = ({ onEditStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getAllStudents();
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const handleDelete = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      return;
    }

    try {
      setDeleteLoading(studentId);
      const response = await studentAPI.deleteStudent(studentId);
      if (response.data.success) {
        setStudents(prev => prev.filter(student => student._id !== studentId));
        alert('Student deleted successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-16">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-danger flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
          <button 
            className="btn-primary btn-sm" 
            onClick={fetchStudents}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600/20 rounded-lg">
              <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div>
              <h3 className="card-title">Students Directory</h3>
              <p className="text-gray-400 text-sm">
                Manage and view all registered students
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-primary-600/10 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-primary-400 font-semibold">{students.length} Students</span>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-700/50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Students Found</h3>
          <p className="text-gray-400 mb-6">Get started by adding your first student to the system</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Student Name</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Roll Number</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.482 0zM7 12.324v.2a9 9 0 008.6 8.6 1 1 0 001-1V8.604L7.979 3.368a3 3 0 00-2.94 0L7 3.368v8.956z" />
                    </svg>
                    <span>Class</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Created</span>
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} className="group">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{student.name}</div>
                        <div className="text-sm text-gray-400">Student #{index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600/20 text-primary-400 border border-primary-600/30">
                      {student.rollNo}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-200 font-medium">{student.class}</span>
                  </td>
                  <td>
                    <div className="text-sm text-gray-400">
                      {formatDate(student.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center space-x-2">
                      <button
                        className="btn-warning btn-sm flex items-center space-x-1"
                        onClick={() => onEditStudent(student)}
                        title="Edit Student"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        className="btn-danger btn-sm flex items-center space-x-1"
                        onClick={() => handleDelete(student._id, student.name)}
                        disabled={deleteLoading === student._id}
                        title="Delete Student"
                      >
                        {deleteLoading === student._id ? (
                          <>
                            <div className="spinner w-4 h-4"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
