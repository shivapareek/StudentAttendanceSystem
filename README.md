# Student Attendance System

A complete MERN Stack application for managing student attendance records. This system allows you to add students, mark their attendance, and view attendance reports.

## Features

- ✅ Add, edit, and delete students
- ✅ Mark attendance (Present/Absent) with date
- ✅ View attendance records with filtering options
- ✅ Update attendance status
- ✅ Delete attendance records
- ✅ Responsive design for mobile and desktop
- ✅ Real-time data validation
- ✅ Error handling and user feedback

## Tech Stack

- **Frontend**: React.js, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **API**: RESTful API design

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation & Setup

### Step 1: Clone or Download the Project

Download the project files to your local machine.

### Step 2: Install Backend Dependencies

1. Open terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd StudentAttendanceSystem/backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Step 3: Install Frontend Dependencies

1. Open a new terminal/command prompt
2. Navigate to the frontend directory:
   ```bash
   cd StudentAttendanceSystem/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Step 4: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**macOS:**
```bash
# Using Homebrew:
brew services start mongodb-community
# Or manually:
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
# Start MongoDB service:
sudo systemctl start mongod
# Or manually:
mongod
```

### Step 5: Configure Environment Variables (Optional)

The application will work with default settings, but you can customize them:

1. In the `backend` folder, create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student_attendance
   ```

2. In the `frontend` folder, create a `.env` file (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Step 6: Start the Application

#### Start Backend Server

1. In the backend terminal:
   ```bash
   cd StudentAttendanceSystem/backend
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

   The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

1. In the frontend terminal:
   ```bash
   cd StudentAttendanceSystem/frontend
   npm start
   ```

   The frontend will start on `http://localhost:3000`

### Step 7: Access the Application

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. You should see the Student Attendance System interface

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get attendance by ID
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance
- `GET /api/attendance/student/:studentId` - Get attendance for specific student

## Usage Guide

### Adding Students

1. Click on the "Students" tab
2. Click "Add New Student" button
3. Fill in the required information:
   - Student Name
   - Roll Number (must be unique)
   - Class
4. Click "Add Student"

### Marking Attendance

1. Click on the "Attendance" tab
2. Click "Mark Attendance" button
3. Select a student from the dropdown
4. Choose the date (defaults to today)
5. Select Present or Absent
6. Add optional remarks
7. Click "Mark Attendance"

### Viewing Attendance Records

1. Go to the "Attendance" tab
2. Use the filters to:
   - Filter by student
   - Filter by date
   - Filter by status (Present/Absent)
3. Click "Apply" to filter or "Clear" to reset

### Editing Records

- **Edit Student**: Click the "Edit" button next to any student in the Students list
- **Edit Attendance**: Click the "Edit" button next to any attendance record

### Deleting Records

- **Delete Student**: Click the "Delete" button next to any student
- **Delete Attendance**: Click the "Delete" button next to any attendance record
- Confirm the deletion when prompted

## Database Schema

### Student Collection
```javascript
{
  name: String (required, max 50 chars),
  rollNo: String (required, unique, max 20 chars),
  class: String (required, max 20 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Collection
```javascript
{
  student: ObjectId (reference to Student),
  date: Date (required),
  status: String (required, enum: ['Present', 'Absent']),
  remarks: String (optional, max 200 chars),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check if the connection string is correct
   - Verify MongoDB is accessible on the default port (27017)

2. **Port Already in Use**
   - Backend: Change PORT in .env file or kill the process using port 5000
   - Frontend: React will automatically suggest using a different port

3. **CORS Issues**
   - The backend is configured to allow CORS from localhost:3000
   - If you change the frontend port, update the CORS configuration

4. **API Connection Issues**
   - Ensure the backend server is running
   - Check the API URL in the frontend configuration
   - Verify there are no firewall issues

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are installed correctly
3. Verify MongoDB is running and accessible
4. Check that both frontend and backend servers are running

## Development

### Project Structure

```
StudentAttendanceSystem/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Student.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── students.js
│   │   └── attendance.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js
│   │   │   ├── StudentList.js
│   │   │   ├── AttendanceForm.js
│   │   │   └── AttendanceList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute to this project by:
1. Reporting bugs
2. Suggesting new features
3. Submitting pull requests
4. Improving documentation

---

**Happy Coding! 🚀**
