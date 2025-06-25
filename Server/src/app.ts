//using ecma script
import express from 'express'
const app = express();

//json parsing
app.use(express.json())


import authRoute from './routes/global/auth.route'
import instituteRoute from './routes/institute/institute.route'
import courseRoute from './routes/institute/course/course.route'
import studentRoute from './routes/student/student.route'
import categoryRoute from './routes/institute/category/category.route'
import teacherInstituteRoute from './routes/institute/teacher/teacher.route'
import teacherRoute from './routes/teacher/teacher.route'

//importing routes

// global routes
app.use("/api",authRoute);

// institute routes
app.use("/api/institute",instituteRoute);
app.use("/api/institute/course",courseRoute);
app.use("/api/student",studentRoute);
app.use("/api/institute/category", categoryRoute);
app.use('/api/institute/teacher', teacherInstituteRoute);

// teacher routes
app.use("/api/teacher",teacherRoute);

export default app