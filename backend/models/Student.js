const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Roll number cannot be more than 20 characters']
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true,
    maxlength: [20, 'Class cannot be more than 20 characters']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Export the Student model
module.exports = mongoose.model('Student', studentSchema);
