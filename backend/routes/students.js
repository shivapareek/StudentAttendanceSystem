const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// @route   GET /api/students/:id
// @desc    Get single student by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
});

// @route   POST /api/students
// @desc    Create a new student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, rollNo, class: studentClass } = req.body;

    // Validation
    if (!name || !rollNo || !studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, rollNo, and class'
      });
    }

    // Check if student with same roll number already exists
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this roll number already exists'
      });
    }

    const student = new Student({
      name,
      rollNo,
      class: studentClass
    });

    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: savedStudent
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, rollNo, class: studentClass } = req.body;

    // Validation
    if (!name || !rollNo || !studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, rollNo, and class'
      });
    }

    // Check if another student with same roll number exists
    const existingStudent = await Student.findOne({ 
      rollNo, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Another student with this roll number already exists'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNo, class: studentClass },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

module.exports = router;
