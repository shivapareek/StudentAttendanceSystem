const mongoose = require('mongoose');

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student reference is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  status: {
    type: String,
    required: [true, 'Attendance status is required'],
    enum: ['Present', 'Absent'],
    default: 'Present'
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [200, 'Remarks cannot be more than 200 characters']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Create compound index to prevent duplicate attendance for same student on same date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

// Export the Attendance model
module.exports = mongoose.model('Attendance', attendanceSchema);
