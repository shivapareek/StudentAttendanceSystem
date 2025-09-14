const express = require('express');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const router = express.Router();

// @route   GET /api/attendance
// @desc    Get all attendance records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { studentId, date, status } = req.query;
    
    // Build filter object
    const filter = {};
    if (studentId) filter.student = studentId;
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const attendance = await Attendance.find(filter)
      .populate('student', 'name rollNo class')
      .sort({ date: -1, createdAt: -1 });

    res.json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance records',
      error: error.message
    });
  }
});

// @route   GET /api/attendance/:id
// @desc    Get single attendance record by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('student', 'name rollNo class');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance record',
      error: error.message
    });
  }
});

// @route   POST /api/attendance
// @desc    Create a new attendance record
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { studentId, date, status, remarks } = req.body;

    // Validation
    if (!studentId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide studentId and status'
      });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Validate status
    if (!['Present', 'Absent'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either Present or Absent'
      });
    }

    // Check if attendance already exists for this student on this date
    const attendanceDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(attendanceDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
      student: studentId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this student on this date'
      });
    }

    const attendance = new Attendance({
      student: studentId,
      date: attendanceDate,
      status,
      remarks
    });

    const savedAttendance = await attendance.save();
    await savedAttendance.populate('student', 'name rollNo class');

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: savedAttendance
    });
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attendance',
      error: error.message
    });
  }
});

// @route   PUT /api/attendance/:id
// @desc    Update an attendance record
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { status, remarks } = req.body;

    // Validation
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    // Validate status
    if (!['Present', 'Absent'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either Present or Absent'
      });
    }

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    ).populate('student', 'name rollNo class');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: attendance
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance',
      error: error.message
    });
  }
});

// @route   DELETE /api/attendance/:id
// @desc    Delete an attendance record
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
      data: attendance
    });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting attendance record',
      error: error.message
    });
  }
});

// @route   GET /api/attendance/student/:studentId
// @desc    Get attendance records for a specific student
// @access  Public
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    // Build date filter
    const dateFilter = {};
    if (startDate) {
      dateFilter.$gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.$lte = new Date(endDate);
    }

    const filter = { student: studentId };
    if (Object.keys(dateFilter).length > 0) {
      filter.date = dateFilter;
    }

    const attendance = await Attendance.find(filter)
      .populate('student', 'name rollNo class')
      .sort({ date: -1 });

    res.json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student attendance records',
      error: error.message
    });
  }
});

module.exports = router;
